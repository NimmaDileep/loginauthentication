require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/Users');
const cors = require('cors');
const session = require('express-session'); // add this

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // specify the client origin to be allowed by CORS
    methods: ['GET', 'POST'], // allowed methods
    credentials: true // cookies can be sent along with the requests
}));

app.use(express.json());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(passport.initialize());
app.use(passport.session()); // this middleware is required to make passport use sessions


passport.use(new LocalStrategy((username, password, done) => {
    console.log('LocalStrategy called with:', { username, password });

    User.findOne({ username: username })
        .then(user => {
            console.log('User.findOne returned:', user);

            if (!user) return done(null, false);
            if (password === user.password) {
                return done(null, user);
            } else {
                return done(null, false);
            }
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
    (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile);
    }));

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
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


app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/dashboard');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(5001, () => console.log('Server Started on port 5001'));
