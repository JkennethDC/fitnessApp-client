import { Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Notyf } from 'notyf';

import 'notyf/notyf.min.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if ((email !== "" &&  password !== "") && (email !== null && password !== null)) { 
        setIsActive(true)
    } else  {
        setIsActive(false)
    }
  })

  const registerUser = (e) => {
    e.preventDefault();

    const notyf = new Notyf({
        duration: 3000, 
        position: {
            x: 'right', 
            y: 'top'    
        }});

    axios.post(`https://fitnessapp-api-ln8u.onrender.com/users/register`, {
        email: email,
        password: password
    })
    .then((res) => {
        const data = res.data;
        console.log(data);

        if (data.message === "Registered Successfully") {
            setEmail('');
            setPassword('');
            notyf.success("Registration Successful");

        } else if (data.message === 'User email already registered') {
            console.error('User email already registered');
  
          } else if (data.message === 'Password must be at least 8 characters') {
            console.error('Password must be at least 8 characters');
          }
        })
        .catch((err) => {
          console.error('Registration error:', err.res?.data || err.message);
    })
  }

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundImage: 'url()', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                <Row className="w-100 justify-content-center">
                    <Col className='col-lg-8'>
                        <Card className="p-4 shadow-lg bg-dark" style={{ color: 'white', borderRadius: '10px' }}>
                            <Card.Body>
                                <h1 className="text-center mb-4">Sign Up</h1>
                                <Form onSubmit={registerUser}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    {isActive 
                                    ? 
                                    (
                                        <Button variant="primary" type="submit" className="w-100">
                                            Sign Up
                                        </Button>
                                    ) 
                                    : 
                                    (
                                        <Button variant="danger" type="submit" className="w-100" disabled>
                                            Sign Up
                                        </Button>
                                    )}
                                </Form>
                                <p className="text-center mt-3">Already have an account? <Link to="/login" style={{ color: '#0d6efd' }}>Sign in</Link> here</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
  );
}