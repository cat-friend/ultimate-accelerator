import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as challengeActions from "../../store/challenge";

function DeleteChallengeForm({ setShowModal, challenge, showModal }) {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const currUserId = useSelector(state => state.session.user.id);
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState([]);

    // useEffect(() => {
    //     if (success === "") return;
    //     const timer = setTimeout(() => setShowModal(false), 1000);
    //     return () => clearTimeout(timer)
    // }, [showModal])

    const submitDelete = () => {
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
                    else {
                        setSuccess("Success!");
                        setTimeout(() => {
                            setShowModal(false);
                            dispatch(challengeActions.deleteOneChallenge(challenge))
                        }, 1000);


                        return;
                    }
                    // setTimeout(() => showModal = reference.current, 1000);
                }
            );
    };

    return (
        <div className="delete">
            <h2>{success}</h2>
            <h3>Are you sure you want to delete this challenge?</h3>
            This cannot be undone.
            <ul className="error-list">
                {errors.map((error, idx) => (
                    <li key={idx} className="errors">{error}</li>
                ))}
            </ul>
            <button type="button" onClick={() => submitDelete()} className="">Yes</button>
            <button type="button" onClick={(e) => setShowModal(false)} className="">No</button>
        </div >)
}

export default DeleteChallengeForm;
