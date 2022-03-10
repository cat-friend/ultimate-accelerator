import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { editOneUser } from "../../store/user"


function EditBio({ user, setShowEditButton, setShowEditForm }) {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const currUser = useSelector(state => state.session.user);
    const [bio, setBio] = useState(user.bio ? user.bio : "")
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            id: userId,
            bio,
            curr_user_id: currUser.id
        }
        return dispatch(editOneUser(payload)).then(
            (response) => {
                if (response.errors) {
                    setErrors(response.errors);
                    return
                }
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setShowEditButton(true);
                    setShowEditForm(false);
                }, 750);
            }
        );
    }
    return (
        <div>
            {errors.map((error, idx) => (
                <p key={idx} className="errors">{error}</p>
            ))}
            {showSuccess && (<h2>GREAT SUCCESS!</h2>)}
            <form onSubmit={(e) => handleSubmit(e)} className="clans">
                <div>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="VERY C OOL WORDS ABOUT HOW COOL YOU ARE"
                        className="input"
                    />
                </div>
                <div className="button-div">
                    <button type="submit">SUBMIT</button>
                    <button type="button"
                        onClick={() => setBio(user.bio ? user.bio : "")}>
                        RESET
                    </button>
                    <button type="button"
                        onClick={
                            () => {
                                setShowEditButton(true);
                                setShowEditForm(false);
                                setBio(user.bio ? user.bio : "")
                            }}>
                        CANCEL
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditBio;
