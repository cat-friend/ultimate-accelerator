import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as challengeActions from "../../store/challenge";
import "./DeleteChallengeForm.css"
import { useLocation } from "react-router-dom";
import { accelerate } from "../../store/accelerate";

function DeleteChallengeForm({ setShowModal, challenge }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const currUserId = useSelector(state => state.session.user.id);
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState([]);


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
                            if (location.pathname.includes("accelerate")) dispatch(accelerate(userId));
                            return;
                        }, 750);


                        return;
                    }
                }
            );
    };

    return (
        <>
            <div className="header-parent">
                <div className="left-corner"></div>
                <div className="header-child"><h2>Delete Challenge?!</h2></div>
                <div className="right-corner"></div>
            </div>
            <div className="content-container">
                <div className="content">
                    <h2 className="success">{success}</h2>
                    <h3>Are you sure you want to delete this challenge?</h3>
                    This cannot be undone.
                    <ul className="error-list">
                        {errors.map((error, idx) => (
                            <li key={idx} className="errors">{error}</li>
                        ))}
                    </ul>
                    <div className="button-div">
                        <button type="button" onClick={() => submitDelete()} className="">Yes</button>
                        <button type="button" onClick={() => setShowModal(false)} className="">No</button>
                    </div>
                </div>
            </div>
        </>)
}

export default DeleteChallengeForm;
