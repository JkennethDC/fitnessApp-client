import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Container } from 'react-bootstrap';
import { useState } from 'react';

import React from 'react'

// Components
import AppNavbar from './components/AppNavbar';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Workout from './pages/Workout';

const App = () => {

    const [user, setUser] = useState({
        id: null,
        isAdmin: false
      })

    function unsetUser() {
        localStorage.clear()
    }

  return (
    <>
    <UserProvider value={{user, setUser, unsetUser }}>
        <Router>
            <AppNavbar />
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/workouts" element={<Workout />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Container>
        </Router>
    </UserProvider>
    </>
  )
}

export default App