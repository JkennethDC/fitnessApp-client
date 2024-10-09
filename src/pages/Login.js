import { Form as BootstrapForm, Button } from 'react-bootstrap'; 
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Notyf } from 'notyf';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'notyf/notyf.min.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);
    
    const notyf = new Notyf({
        duration: 3000, 
        position: {
            x: 'right', 
            y: 'top'    
        }
    });

    const navigate = useNavigate(); 
    const loginUser = (e) => {
        e.preventDefault();

        if (!email.includes('@')) {
            notyf.error('Invalid email format.');
            return;
        }
  
        axios.post(`https://fitnessapp-api-ln8u.onrender.com/users/login`, {
            email: email,
            password: password
        })
        .then((res) => {
            const data = res.data;
            console.log(data);
  
            if (data.access) {
                localStorage.setItem('token', data.access);
                notyf.success('Logged in successfully');
                navigate('/home'); 
            } else if (data.error) {
                notyf.error(data.error);
            } else if (data.message) {
                notyf.error(data.message);
            }
        })
        .catch((err) => {
            if (err.response) {
                notyf.error(err.response.data.error || 'An error occurred.');
            } else {
                notyf.error('Login error: ' + err.message);
            }
            console.error('Login error:', err);
        });
    };

    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <BootstrapForm 
                onSubmit={loginUser} 
                className='container p-4 shadow-lg bg-dark border-white text-light rounded'
            >
                <h1 className="my-3 text-center">Login</h1>
                <BootstrapForm.Group controlId="email">
                    <BootstrapForm.Label>Email address</BootstrapForm.Label>
                    <BootstrapForm.Control
                        type="email"
                        placeholder="Enter email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </BootstrapForm.Group>
                <BootstrapForm.Group className="mb-3" controlId="password">
                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                    <BootstrapForm.Control
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </BootstrapForm.Group>
                <Button variant={isActive ? "primary" : "danger"} type="submit" id="loginBtn" disabled={!isActive}>
                    Login
                </Button>
                <p className="text-center mt-3">No account yet? <Link to="/register" style={{ color: '#0d6efd' }}>Sign up</Link> here</p>
            </BootstrapForm>
        </div>
    );
}
