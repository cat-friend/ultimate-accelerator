import React, { useEffect, useState } from "react";
import { Modal } from '../../context/Modal';
import ErrorBody from "./ErrorBody";
import { useDispatch, useSelector } from "react-redux";
import "./ChallengesForms.css"
import * as challengeActions from "../../store/challenge"

function EditChallenge({ challengeId }) {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const status = useSelector(state => state.challenges[challengeId].status)
    const [newStatus, setNewStatus] = useState(status);
    const [showSuccess, setShowSuccess] = useState(false);
    const curr_user_id = useSelector(state => state.session.user.id)
    const challenge_user_id = useSelector(state => state.challenges[challengeId].user_id)
    let prop;
    const handleUpdate = (e) => {
        setErrors([]);
        const payload = {
            user_challenge_id: challengeId,
            curr_user_id,
            // challenge_user_id,
            status: e.target.value
        }
        console.log("payload", payload)
        return dispatch(challengeActions.editChallenge(payload))
            .then(
                (response) => {
                    console.log("responsme.errors", response.errors)
                    if (response.errors) {
                        prop = true;
                        setErrors(response.errors)
                        setTimeout(() => {
                            setErrors([]);
                        }, 1500);
                        return
                    }
                    dispatch(challengeActions.getOneChallenge(challengeId))
                    setShowSuccess(true);
                    setTimeout(() => {
                        setShowSuccess(false);
                    }, 500);
                }
            );
    }

    return (<>
        {errors.map((ele, i) => {
            return <p key={i} className="">{ele}</p>
        })}
        {showSuccess ? "SUCCESS!" :
            <form>
                <select name="status" id="change-status" onChange={
                    (e) => {
                        setNewStatus(e.target.value)
                        handleUpdate(e)
                    }}
                    value={newStatus}
                >
                    <option value="open">open</option>
                    <option value="in progress">in progress</option>
                    <option value="completed">completed</option>
                </select>
            </form>
        }

    </>)
}

export default EditChallenge
