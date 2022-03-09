import { useState } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as clanActions from "../../store/clan"

function AddMessageForm() {
    const { clanId } = useParams()
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false)
    const [message, setMessage] = useState("");
    const userId = useSelector(state => state.session.user.id)
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setErrors([]);
        const payload = {
            user_id: userId,
            clan_id: clanId,
            message
        }
        return (dispatch(clanActions.postMessage(payload)).then(
            (response) => {
                if (response.errors) {
                    setErrors(response.errors);
                    return
                }
                setShowSuccess(true);
                setMessage("");
                setTimeout(() => {
                    setShowSuccess(false);
                }, 750);
            }))
    }

    return (
        <>
            <div className="content">
                <h2>Post a message!</h2>
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
                            value={message}
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
                                setMessage("");
                                setErrors([]);
                            }}
                            className="">
                            RESET
                        </button>
                    </div>
                </form>
            </div>
        </>)
}

export default AddMessageForm;
