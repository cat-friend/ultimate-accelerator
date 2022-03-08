import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as clanActions from "../../store/clan"

function EditMessageForm({ setShowModal, clan }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false)
    const [message, setMessage] = useState(clan.message);
    const userId = useSelector(state => state.session.user.id)

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setErrors([]);
        const payload = {
            message_id: clan.message.id,
            user_id: userId,
            clan_id: clan.id,
            message
        }
        return (dispatch(clanActions.editClan(payload)).then(
            (response) => {
                if (response.errors) {
                    setErrors(response.errors);
                    return
                }
                setShowSuccess(true);
                dispatch(clanActions.getOneClan(clan.id));
                setTimeout(() => {
                    setShowModal(false);
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
                    <h2>Preview:</h2>
                    <h3>Message:</h3>
                    <div> {message}</div>
                    <h2 className="success">{showSuccess && "GREAT SUCCESS!"}</h2>
                    <ul className="error-list">
                        {errors.map((error, idx) => (
                            <li key={idx} className="errors">{error}</li>
                        ))}
                    </ul>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <textarea
                                data-lpignore="true"
                                value={description}
                                onChange={(e) => setMessage(e.target.value)}
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
                                    setMessage(clan.message);
                                }}
                                className="">
                                RESET
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setMessage(clan.message);
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

export default EditMessageForm
