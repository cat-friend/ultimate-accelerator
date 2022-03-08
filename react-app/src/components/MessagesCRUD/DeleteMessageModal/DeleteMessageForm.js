import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as clanActions from "../../../store/clan"

function DeleteMessageForm({ setShowModal, clanId, message }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false)
    const userId = useSelector(state => state.session.user.id);

    const submitDelete = () => {
        setErrors([]);
        const payload = {
            user_id: userId,
            clan_id: clanId,
            message_id: message.id
        }
        return dispatch(clanActions.deleteMessage(payload))
            .then(
                (response) => {
                    if (response.errors) {
                        setErrors(response.errors)
                        return
                    }
                    else {
                        setShowSuccess(true);
                        setTimeout(() => {
                            setShowModal(false);
                            dispatch(clanActions.deleteOneMessage(message))
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
                <div className="header-child"><h2>Delete Message?!</h2></div>
                <div className="right-corner"></div>
            </div>
            <div className="content-container">
                <div className="content">
                    <h2 className="success">{showSuccess && "GREAT SUCCESS!"}</h2>
                    <h3>Are you sure you want to delete this message?</h3>
                    This cannot be undone.
                    <ul className="error-list">
                        {errors.map((error, idx) => (
                            <p key={idx} className="errors">{error}</p>
                        ))}
                    </ul>
                    <div className="button-div">
                        <button type="button" onClick={() => submitDelete()} className="">Yes!</button>
                        <button type="button" onClick={() => setShowModal(false)} className="">No!</button>
                    </div>
                </div>
            </div>
        </>)
}

export default DeleteMessageForm;
