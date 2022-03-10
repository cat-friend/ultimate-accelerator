import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as clanActions from "../../../store/clan"

function EditMessageForm({ setShowModal, clanId, message }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false)
    const [newMessage, setNewMessage] = useState(message.message);
    const userId = useSelector(state => state.session.user.id)
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setErrors([]);
        const payload = {
            message_id: message.id,
            user_id: userId,
            clan_id: clanId,
            message: newMessage
        }
        return (dispatch(clanActions.editMessage(payload)).then(
            (response) => {
                if (response.errors) {
                    setErrors(response.errors);
                    return
                }
                setShowSuccess(true);
                setTimeout(() => {
                    setShowModal(false);
                    dispatch(clanActions.addMessage(response));
                    dispatch(clanActions.getOneClan(clanId));
                }, 750);
            }))
    }

    return (
        <>
            <div className="header-parent">
                <div className="left-corner"></div>
                <div className="header-child"><h2>Editing your message</h2></div>
                <div className="right-corner"></div>
            </div>
            <div className="content-container">
                <div className="content">
                    <h2>Message Preview:</h2>
                    <div> {newMessage}</div><br/>
                    <h2 className="success">{showSuccess && "GREAT SUCCESS!"}</h2>
                    <ul className="error-list">
                        {errors.map((error, idx) => (
                            <li key={idx} className="errors">{error}</li>
                        ))}
                    </ul>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <h2>Edit:</h2>
                            <textarea
                                data-lpignore="true"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                required
                                placeholder="Send a way cool encouraging message to your clanmates or remind them of their heal misplay in Energy Depot"
                                className="input" />
                        </div>
                        <div className="button-div">
                            <button
                                type="submit"
                                className="">
                                SUBMIT
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setNewMessage(message.message);
                                }}
                                className="">
                                RESET
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setNewMessage(message.message);
                                    setShowModal(false);
                                }}
                                className="">
                                CANCEL
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>)
}

export default EditMessageForm;
