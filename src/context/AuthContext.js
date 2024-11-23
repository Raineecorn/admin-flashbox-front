import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../utils/handleAxios'; // Axios instance with base URL and token handling

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To handle loading state

    // Function to handle login and store token
    const login = async (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);

        try {
            // Fetch user data after login
            const response = await axios.get('/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data); // Set user data
        } catch (error) {
            console.error('Error fetching user data after login:', error);
            logout(); // Log out if fetching user data fails
        }
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUser(null);
    };

    // Check if user is authenticated
    const isAuthenticated = !!authToken;

    // On app load, fetch user info if a token exists
    useEffect(() => {
        const fetchUserData = async () => {
            if (authToken) {
                try {
                    const response = await axios.get('/auth/me', {
                        headers: { Authorization: `Bearer ${authToken}` },
                    });
                    setUser(response.data); // Set user info
                } catch (error) {
                    console.error('Invalid token. Logging out:', error);
                    logout(); // Log out if token is invalid
                }
            }
            setLoading(false); // Set loading to false after checking
        };

        fetchUserData();
    }, [authToken]);

    // Provide context values to the children components
    return (
        <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated, user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
