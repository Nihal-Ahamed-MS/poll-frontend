import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { throwErrorMessage } from '../../components/Toast';
import Loader from '../../components/Loader';
import { baseAPI } from '../../api';
import Header from '../../components/Header';
import PollComponent from '../../components/PollComponent';

const PollList = () => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPolls = async () => {
        try {
            const response = await baseAPI.get('/v1/poll');
            setPolls(response.data);
        } catch (err) {
            throwErrorMessage(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPolls();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <Container>
            <Header />
            <div className="d-flex flex-column h-100 align-items-center mt-2">
                <div className="d-flex flex-column" style={{ width: '500px', gap: '4px' }}>
                    {polls.map((poll, ind) => (
                        <PollComponent poll={poll} key={ind} handleParentCallback={fetchPolls} />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default PollList;
