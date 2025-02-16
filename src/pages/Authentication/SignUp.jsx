import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { objectDeepClone } from '../../service/helpers';
import { throwErrorMessage, throwSuccessMessage } from '../../components/Toast';
import { useNavigate } from 'react-router';
import { baseAPI } from '../../api';

const SignUp = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const handleOnChange = (key, value) => {
        const temp = objectDeepClone(userData);
        temp[key] = value;
        setUserData(temp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await baseAPI.post('/v1/user/register', userData);
            throwSuccessMessage("Registration successful")
            navigate("/sign-in")

        } catch (error) {
            console.error(error);
            throwErrorMessage(error)
        }
    };

    return (
        <div className="h-100 w-100 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column" style={{ width: '500px', height: '5000px', gap: "8px" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={userData.username} onChange={(e) => handleOnChange("username", e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={userData.email} onChange={(e) => handleOnChange("email", e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={userData.password} onChange={(e) => handleOnChange("password", e.target.value)} required />
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Sign Up
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;
