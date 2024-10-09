import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { Notyf } from 'notyf';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'notyf/notyf.min.css';

export default function Workout() {
    const [workouts, setWorkouts] = useState([]);
    const [showCreateWorkout, setShowCreateWorkout] = useState(false);
    const [workoutName, setWorkoutName] = useState('');
    const [workoutDuration, setWorkoutDuration] = useState('');
    const notyf = new Notyf({
        duration: 3000,
        position: {
            x: 'right',
            y: 'top'
        }
    });

    const fetchWorkouts = () => {
        axios.get('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            setWorkouts(res.data.workouts || []);
        })
        .catch(err => {
            console.error(err);
            notyf.error('Failed to fetch workouts.');
            setWorkouts([]);
        });
    };

    const handleCreateWorkout = (e) => {
        e.preventDefault();
        axios.post('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout', {
            name: workoutName,
            duration: workoutDuration
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            notyf.success('Workout added successfully');
            setShowCreateWorkout(false);
            fetchWorkouts();
        })
        .catch(err => {
            console.error(err);
            notyf.error('Failed to create workout.');
        });
    };

    const handleUpdateWorkout = (id) => {
        const updatedName = prompt("Enter new workout name:");
        const updatedDuration = prompt("Enter new workout duration:");

        if (updatedName && updatedDuration) {
            axios.patch(`https://fitnessapp-api-ln8u.onrender.com/workouts/updateWorkout/${id}`, {
                name: updatedName,
                duration: updatedDuration
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                notyf.success('Workout updated successfully');
                fetchWorkouts();
            })
            .catch(err => {
                console.error(err);
                notyf.error('Failed to update workout.');
            });
        }
    };

    const handleDeleteWorkout = (id) => {
        axios.delete(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            notyf.success('Workout deleted successfully');
            fetchWorkouts();
        })
        .catch(err => {
            console.error(err);
            notyf.error('Failed to delete workout.');
        });
    };

    const handleCompleteWorkout = (id) => {
        axios.patch(`https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            notyf.success('Workout status updated to completed');
            fetchWorkouts();
        })
        .catch(err => {
            console.error(err);
            notyf.error('Failed to update workout status.');
        });
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center mb-4">
                <Button onClick={() => setShowCreateWorkout(!showCreateWorkout)} className="mx-2" variant="success">
                    {showCreateWorkout ? 'Cancel' : 'Create Workout'}
                </Button>
                <Button onClick={fetchWorkouts} variant="dark">
                    View Workouts
                </Button>
            </div>

            {showCreateWorkout && (
                <Card className="mb-4">
                    <Card.Body>
                        <h5>Create a new workout</h5>
                        <Form onSubmit={handleCreateWorkout}>
                            <Form.Group controlId="workoutName">
                                <Form.Label>Workout Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={workoutName}
                                    onChange={(e) => setWorkoutName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="workoutDuration">
                                <Form.Label>Duration (minutes)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={workoutDuration}
                                    onChange={(e) => setWorkoutDuration(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Add Workout
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}

            <div className="workouts-container">
                {workouts.map((workout) => (
                    <Card key={workout._id} className="mb-3">
                        <Card.Body>
                            <Card.Title>{workout.name}</Card.Title>
                            <Card.Text>
                                Duration: {workout.duration} minutes
                            </Card.Text>
                            <Card.Text>
                                Status: {workout.status}
                            </Card.Text>
                            <Button variant="warning" onClick={() => handleUpdateWorkout(workout._id)}>
                                Update
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteWorkout(workout._id)} className="mx-2">
                                Delete
                            </Button>
                            <Button variant="success" onClick={() => handleCompleteWorkout(workout._id)}>
                                Complete
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}
