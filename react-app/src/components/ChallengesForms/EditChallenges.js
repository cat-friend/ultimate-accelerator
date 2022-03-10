import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ChallengesForms.css"
import * as challengeActions from "../../store/challenge"

function EditChallenge({ challengeId }) {
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();
    const status = useSelector(state => state.challenges[challengeId]?.status)
    const [newStatus, setNewStatus] = useState(status);
    const [showSuccess, setShowSuccess] = useState(false);
    const curr_user_id = useSelector(state => state.session.user.id)
    const challenge_user_id = useSelector(state => state.challenges[challengeId]?.user_id)
    const handleUpdate = (e) => {
        setErrors([]);
        const payload = {
            user_challenge_id: challengeId,
            curr_user_id,
            challenge_user_id,
            status: e.target.value
        }
        return dispatch(challengeActions.editChallenge(payload))
            .then(
                (response) => {
                    if (response.errors) {
                        setErrors(response.errors);
                        setTimeout(() => {
                            setErrors([]);
                        }, 2000);
                        return
                    }
                    setShowSuccess(true);
                    setTimeout(() => {
                        dispatch(challengeActions.loadChallenges(curr_user_id));
                        setNewStatus(status);
                        setShowSuccess(false);
                    }, 500);
                }
            );
    }


    return (<> {errors.map((ele, i) => {
        return <p key={i} className="">{ele}</p>
    })
    }
        {showSuccess ? "UPDATED!" :
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
