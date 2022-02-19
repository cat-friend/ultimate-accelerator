import React, { useEffect, useState } from "react";
import { Modal } from '../../context/Modal';
import ErrorBody from "./ErrorBody";
import { useDispatch, useSelector } from "react-redux";
import "./ChallengesForms.css"
import * as challengeActions from "../../store/challenge"

function EditChallenge({ challengeId }) {
    const dispatch = useDispatch();
    const status = useSelector(state => state.challenges[challengeId].status)
    const [errors, setErrors] = useState([]);
    const [newStatus, setNewStatus] = useState(status);
    const [showSuccess, setShowSuccess] = useState(false);
    const curr_user_id = useSelector(state => state.session.user.id)
    const challenge_user_id = useSelector(state => state.challenges[challengeId].user_id)
    const [showModal, setShowModal] = useState(false);


    const handleUpdate = (e) => {
        setErrors([]);
        const payload = {
            user_challenge_id: challengeId,
            curr_user_id,
            challenge_user_id,
            status: e.target.value
        }
        console.log("payload", payload)
        return dispatch(challengeActions.editChallenge(payload))
            .then(
                (response) => {
                    if (response.errors) {
                        setErrors(response.errors)
                        setShowModal(true)
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
    const errorModal = (
        <Modal onClose={() => setShowModal(false)}>
            <ErrorBody setShowModal={setShowModal} errors={errors} />
        </Modal>)

    return (<>
        {showModal && errorModal}
        {showSuccess ? "SUCCESS!" :
            <form>
                <select name="status" id="change-status" onChange={
                    (e) => {
                        setNewStatus(e.target.value)
                        handleUpdate(e)
                    }}
                    value={newStatus}>
                    <option value="open" selected={newStatus === "open"}>open</option>
                    <option value="in progress" selected={newStatus === "in progress"}>in progress</option>
                    <option value="completed" selected={newStatus === "completed"}>completed</option>
                </select>
            </form>
        }

    </>)
}

export default EditChallenge
