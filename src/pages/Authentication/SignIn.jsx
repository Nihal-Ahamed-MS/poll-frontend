import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { objectDeepClone } from '../../service/helpers';
import { throwErrorMessage } from '../../components/Toast';
import { useNavigate } from 'react-router';
import { SESSION_TOKEN } from '../../service/constants';
import { baseAPI } from '../../api';

const SignIn = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({  email: '', password: '' });
    const handleOnChange = (key, value) => {
        const temp = objectDeepClone(userData);
        temp[key] = value;
        setUserData(temp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await baseAPI.post('/v1/user/login', userData);
            localStorage.setItem(SESSION_TOKEN, response.data.token)
            navigate("/")
        } catch (error) {
            console.error(error);
            throwErrorMessage(error)
        }
    };
    
    const handleDummySignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await baseAPI.post('/v1/user/login', { email: "raj@gmail.com", password: "123456789" });
            localStorage.setItem(SESSION_TOKEN, response.data.token)
            navigate("/")
        } catch (error) {
            console.error(error);
            throwErrorMessage(error)
        }
    };

    return (
        <div className="h-100 w-100 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column" style={{ width: '500px', height: '5000px', gap: "8px" }}>
                <Form onSubmit={handleSubmit}>

                    <Form.Group controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={userData.email} onChange={(e) => handleOnChange("email", e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={userData.password} onChange={(e) => handleOnChange("password", e.target.value)} required />
                    </Form.Group>

                    <Button type="submit" variant="secondary" className='mt-2 w-100'>
                        Sign In
                    </Button>
                </Form>
                <Button onClick={handleDummySignIn} type="submit" variant="primary" className='mt-2'>
                    Test Sign In
                </Button>
            </div>
        </div>
    );
};

export default SignIn;
