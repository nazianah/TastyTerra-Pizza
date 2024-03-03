import React, { useContext } from 'react';
import userContext, { UserContextProvider } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Dashboard = () => {
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            // Make a request to the server to clear the token
            const response = await axios.post("/logout", null, {
                withCredentials: true, // Include credentials (cookies) in the request
            });

            // Handle the response as needed (redirect, update UI, etc.)
            if (response.status === 200) {
                // Handle successful logout
                setUser(null);
                // navigate('/login');
                // window.location.reload();
                toast.success("Logout successful");
            } else {
                // Handle logout failure
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
                    <button onClick={handleSignUp} style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign Up</button>
                    <button onClick={handleSignIn} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign In</button>
                </>
            )}
            {/* Render other components based on the user's authentication status */}
            {user && (
                <button onClick={handleSignOut} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign Out</button>
            )}
        </div>

    );
}
export default Dashboard;
