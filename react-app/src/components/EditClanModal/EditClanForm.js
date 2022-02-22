import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as clanActions from "../../store/clan"

function EditClanForm({ setShowModal, clan }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false)
    const [description, setDescription] = useState(clan.description);
    const [name, setName] = useState(clan.name);
    const userId = useSelector(state => state.session.user.id)

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            description: description,
            owner_user_id: clan.owner_user_id,
            curr_user_id: userId,
            name
        }
        return (dispatch(clanActions.editClan(payload)).then(
            (response) => {
                if (response.errors) {
                    setErrors(response.errors);
                    return
                }
                setShowSuccess(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 750);
            }))
    }

    return (
        <>
            <div className="header-parent">
                <div className="left-corner"></div>
                <div className="header-child"><h2>Editing {clan.name}</h2></div>
                <div className="right-corner"></div>
            </div>
            <div className="content-container">
                <div className="content">
                    <h2>Preview:</h2>
                    <h3>Name: {name}</h3>
                    <h3>Description:</h3>
                    <div>{description}</div>
                    <h2 className="success">{showSuccess && "Success!"}</h2>
                    <ul className="error-list">
                        {errors.map((error, idx) => (
                            <li key={idx} className="errors">{error}</li>
                        ))}
                    </ul>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Super cool clan name"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Please describe how cool and good your clan full of aim gods is." />
                        <div className="button-div">
                            <button
                                type="submit"
                                className="">
                                Yes
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setDescription(clan.description);
                                    setName(clan.name);
                                }}
                                className="">
                                RESET
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setDescription(clan.description);
                                    setName(clan.name);
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

export default EditClanForm
