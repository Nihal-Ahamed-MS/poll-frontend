/* eslint-disable react/prop-types */
import { useState } from 'react';
import { throwErrorMessage, throwSuccessMessage } from '../Toast';
import Loader from '../Loader';
import { baseAPI } from '../../api';
import { Link } from 'react-router';

const PollComponent = (props) => {
    const { poll, handleParentCallback } = props;
    const [loading, setLoading] = useState(false);

    const handleAddVote = async (poll, selectedChoice) => {
        setLoading(true);
        try {
            await baseAPI.post(`/v1/poll/${poll._id}/vote`, { choiceId: selectedChoice._id });
            throwSuccessMessage('Vote added successfully');
            setLoading(false);
            handleParentCallback();
        } catch (err) {
            throwErrorMessage(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div key={poll._id} className="rounded border py-2 px-3">
            <div className="d-flex align-items-center justify-content-between">
                <p className="fs-3 text-black">{poll.name}</p>
                {loading ? (
                    <Loader />
                ) : (
                    <Link to={`/poll/${poll._id}`} style={{ fontSize: '12px', textDecoration: 'none' }} className="text-primary-emphasis">
                        View Result
                    </Link>
                )}
            </div>
            <p className="fs-5 text-secondary">{poll.description || '-'}</p>

            <div className="overflow-scroll" style={{ minHeight: 'fit-content', maxHeight: '300px' }}>
                {poll.choices &&
                    poll.choices.length > 0 &&
                    poll.choices.map((choice) => (
                        <div key={choice._id} className="form-check" onClick={() => handleAddVote(poll, choice)}>
                            <input className="form-check-input" type="radio" name={choice._id} id={choice._id} />
                            <label className="form-check-label" htmlFor={choice._id}>
                                {choice.choiceName}
                            </label>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PollComponent;
