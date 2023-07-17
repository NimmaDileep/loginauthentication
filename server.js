require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/Users');
const cors = require('cors');
const session = require('express-session');

const app = express();
const bcrypt = require('bcrypt');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
        .then(user => {
            if (!user) return done(null, false);
            bcrypt.compare(password, user.password, function(err, result) {
                if (result) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        })
        .catch(err => {
            console.error('Error in User.findOne:', err);
            done(err)
        });
}));

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }));


app.post('/register', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }
        const newUser = new User({ username, password: hash });
        newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.send('Logged out');
});

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.post('/login', (req, res, next) => {
    console.log('login route called with:', req.body);
    passport.authenticate('local', (err, user, info) => {
        console.log('passport.authenticate callback called with:', { err, user, info });
        if (err) { return next(err); }
        if (!user) { return res.status(401).json({message: 'Login failed'}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({message: 'Login successful'});
        });
    })(req, res, next);
});


app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/dashboard');
    });


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(5001, () => console.log('Server Started on port 5001'));
