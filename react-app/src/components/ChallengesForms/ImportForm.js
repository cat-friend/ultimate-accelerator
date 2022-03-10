import { useState } from "react";
import { importSeasonChallenges } from "../../store/challenge";
import { useDispatch } from "react-redux";

function ImportForm({ userId }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const handleSubmit = () => {
        const payload = {
            user_id: userId
        }
        return dispatch(importSeasonChallenges(payload))
            .then(
                (response) => {
                    if (response.errors) {
                        setErrors(response.errors);
                        return;
                    }
                    return;
                }
            );
    };



    return (
        <>{errors.map((error, idx) => (
            <p key={idx} className="errors">{error}</p>
        ))}
            <div className="button-div">
                <button
                    type="button"
                    onClick={() => handleSubmit()}
                >
                    IMPORT
                </button>
            </div>
        </>
    )
}

export default ImportForm;
