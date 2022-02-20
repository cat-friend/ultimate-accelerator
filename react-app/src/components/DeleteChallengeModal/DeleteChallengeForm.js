import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as challengeActions from "../../store/challenge";

function DeleteChallengeForm({ setShowModal, challenge }) {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const currUserId = useSelector(state => state.session.user.id);
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState([]);
    let timer = setTimeout(() => {
        setShowModal(false);
    }, 1500);

    useEffect(() => {
        let timer = setTimeout(() => {
            setShowModal(false);
        }, 1500);

        return () => clearTimeout(timer)
    }, [dispatch, success])

    const submitDelete = (e) => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            user_challenge_id: challenge.id,
            challenge_user_id: userId,
            curr_user_id: currUserId
        }
        return dispatch(challengeActions.deleteChallenge(payload))
            .then(
                (response) => {
                    if (response.errors) {
                        setErrors(response.errors)
                        return
                    }
                    setSuccess("Success!");
                }
            );
    };

    return (
        <div className="delete">
            <h3>Are you sure you want to delete this challenge?</h3>
            This cannot be undone.
            <ul className="error-list">
                {errors.map((error, idx) => (
                    <li key={idx} className="errors">{error}</li>
                ))}
            </ul>
            <form onSubmit={submitDelete}>
                <button type="submit" className="">Yes</button>
                <button type="button" onClick={(e) => setShowModal(false)} className="">No</button>
            </form>
            <h2>{success}</h2>
        </div>)
}

export default DeleteChallengeForm;
