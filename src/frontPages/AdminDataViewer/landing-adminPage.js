import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BackgroundBG from '../../components/background/login.bg/adminPageBg.svg'; 

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();

        // Environment variables for admin username and password
        const defaultEmail = process.env.REACT_APP_BASE_ADMIN_DATABASE_UN;
        const defaultPassword = process.env.REACT_APP_BASE_ADMIN_DATABASE_PW;

        if (email === defaultEmail && password === defaultPassword) {
            setMessage('Login successful!');
            setIsSuccess(true);
            const host = process.env.REACT_APP_HOST;
            // Redirect the user to the admin private dataViewer page
            window.location.href = `${host}/admin/private/dataViewer`;
        } else {
            setMessage('Invalid credentials. Please try again.');
            setIsSuccess(false);
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
                <form onSubmit={handleLogin} className="login-form border p-4 bg-light shadow rounded">
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                {message && (
                    <div className={`mt-3 text-center ${isSuccess ? 'alert alert-success' : 'alert alert-danger'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
