import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { baseAPI } from '../../api';
import { throwErrorMessage } from '../../components/Toast';
import { Container } from 'react-bootstrap';
import { getRandomPredefinedColor } from '../../service/helpers';

const EachPoll = () => {
    const { pollId } = useParams();
    const [loading, setLoading] = useState(true);
    const [pollData, setPollData] = useState({});

    const getPollResult = async () => {
        try {
            const response = await baseAPI.get(`/v1/poll/${pollId}/result`);
            setPollData(response.data);
        } catch (err) {
            throwErrorMessage(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            getPollResult();
        }, 5000)

        return () => {
            clearInterval(intervalId)
        }
    }, []);

    if (loading) {
        return <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}><Loader /></div>;
    }

    return (
        <Container>
            <div className="h-100 w-100">
                <Header />

                <div className="d-flex w-100 justify-content-center mt-3">
                    {pollData && Object.keys(pollData).length > 0 && (
                        <div className="rounded border py-2 px-3" style={{ width: '500px' }}>
                            <div className="d-flex align-items-center justify-content-between">
                                <p className="fs-3 text-black">{pollData.name}</p>
                                <p className="text-black">Total Votes: <span className='text-primary-emphasis'>{pollData.totalVotes}</span></p>
                            </div>
                            <p className="fs-5 text-secondary">{pollData.description || '-'}</p>

                            <div className="overflow-scroll w-100 d-flex flex-column" style={{ minHeight: 'fit-content', maxHeight: '300px', gap: "4px" }}>
                                {pollData.choices &&
                                pollData.choices.length > 0 &&
                                pollData.choices.map((choice) => (
                                    <div key={choice._id} className="rounded border position-relative w-100">
                                        <div className='d-flex align-items-center justify-content-between p-1'>
                                            <p className='text-black'>{choice.choiceName}</p>
                                            <p className="text-black ">Votes: <span className='text-primary-emphasis'>{choice.voteCount}</span></p>
                                        </div>

                                        <div className="position-absolute rounded" style={{ top: 0, left: 0, height: "34px", backgroundColor: getRandomPredefinedColor(), opacity: 0.5, width: `${choice?.voteInPercentage}%`  }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default EachPoll;
