import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { baseAPI } from '../../api';

const AddPoll = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [choices, setChoices] = useState([{ choiceName: '' }, { choiceName: '' }]); // Initialize with two choices
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChoiceChange = (index, event) => {
        const newChoices = [...choices];
        newChoices[index].choiceName = event.target.value;
        setChoices(newChoices);
    };

    const handleAddChoice = () => {
        setChoices([...choices, { choiceName: '' }]);
    };

    const handleRemoveChoice = (index) => {
        const newChoices = [...choices];
        newChoices.splice(index, 1);
        setChoices(newChoices);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await baseAPI.post('/v1/poll', {
                name,
                description,
                choices,
            });

            setSuccess('Poll created successfully!');
            setName('');
            setDescription('');
            setChoices([{ choiceName: '' }, { choiceName: '' }]); // Reset to initial two choices
            navigate('/'); //Redirect to polls page
        } catch (error) {
            console.error('Error creating poll:', error);
            if (error.response) {
                setError(error.response.data.message || 'Error creating poll');
            } else if (error.request) {
                setError('No response from server');
            } else {
                setError('An error occurred while creating the poll.');
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2>Create Poll</h2>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Poll Name:</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Label>Choices:</Form.Label>
                        {choices.map((choice, index) => (
                            <Row key={index} className="mb-3">
                                <Col xs={9}>
                                    <Form.Control type="text" placeholder={`Choice ${index + 1}`} value={choice.choiceName} onChange={(e) => handleChoiceChange(index, e)} required />
                                </Col>
                                <Col xs={3}>
                                    <Button variant="danger" onClick={() => handleRemoveChoice(index)}>
                                        Remove
                                    </Button>
                                </Col>
                            </Row>
                        ))}

                        <Button variant="secondary" onClick={handleAddChoice} className="mb-3">
                            Add Choice
                        </Button>
                        <div className="d-flex flex-column">
                            <Button type="submit" variant="primary w-100">
                                Create Poll
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddPoll;
