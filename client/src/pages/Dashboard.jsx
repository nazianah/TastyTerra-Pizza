import React, { useContext } from 'react';
import userContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            const response = await axios.post("/logout", null, {
                withCredentials: true,
            });

            if (response.status === 200) {
                setUser(null);
                // Optionally display a success toast
            } else {
                console.error("Failed to log out:", response.statusText);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleSignIn = () => {
        navigate("/login");
    };

    const handleSignUp = () => {
        navigate("/register");
    };

    return (
        <div>
            {user ? (
                <h1>Welcome, {user.name}!</h1>
            ) : (
                <>
                    <button onClick={handleSignUp} style={buttonStyle}>Sign Up</button>
                    <button onClick={handleSignIn} style={buttonStyle}>Sign In</button>
                </>
            )}

            {user && (
                <button onClick={handleSignOut} style={{ ...buttonStyle, backgroundColor: 'red' }}>Sign Out</button>
            )}
        </div>
    );
}

const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
};

export default Dashboard;
