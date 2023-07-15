import React from 'react';

const Dashboard = () => {
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h2>Dashboard</h2> <br/>
            </div>


            <div style={{ display: 'flex', justifyContent: 'space-between', height: '80vh' }}>
                <div style={{ width: '50%', border: '1px solid black' }}>
                    <h3 style={{display: 'flex', justifyContent: 'center'}}>Dileep's Portfolio</h3>
                    <iframe src="https://main.d39qnkajca4qax.amplifyapp.com/" style={{ width: '100%', height: '100%' }} />
                </div>

                <div style={{ width: '50%', border: '1px solid black' }}>
                    <h3 style={{display: 'flex', justifyContent: 'center'}}>Haritha's Portfolio</h3>
                    <iframe src="https://main.d2b7wo8vl2v7hh.amplifyapp.com/" style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
