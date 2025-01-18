import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
    // Create state variables for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login attempt with:', { email, password });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Login
                        </h2>
                        <form onSubmit={handleLogin}>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Login
                            </button>
                        </form>
                        <p className="mt-4 text-center">
                            Not a member?{' '}
                            <a href="/register" className="text-primary">
                                Register
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
