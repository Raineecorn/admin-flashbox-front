import React, { useState } from 'react';
import axios from '../../utils/handleAxios'; // For API requests
import { useNavigate } from 'react-router-dom'; // To navigate after login
import 'bootstrap/dist/css/bootstrap.min.css';
import BackgroundBG from '../../components/background/login.bg/adminPageBg.svg';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Use login function from context

    // Function to handle form submission and prevent default reload behavior
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted'); // Debug log
        try {
            const response = await axios.post('/account/login', credentials);
            console.log('Login successful:', response.data); // Debug log
            login(response.data.token); // Save token and fetch user data
            console.log('Redirecting to /admin/add-customer'); // Debug log
            navigate('/add-customer'); // Redirect to the target route
        } catch (err) {
            console.error('Login error:', err); // Debug log
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div 
            className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: `url(${BackgroundBG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="col-md-6">
                <h1 className="text-center text-white mb-4">Admin Login</h1>
                <form onSubmit={handleSubmit} className="login-form border p-4 bg-light shadow rounded">
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                {error && (
                    <div className="alert alert-danger mt-3 text-center">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
