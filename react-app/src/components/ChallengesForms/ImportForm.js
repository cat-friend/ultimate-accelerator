import { useState } from "react";
import { importSeasonChallenges } from "../../store/challenge";
import { useDispatch } from "react-redux";

function ImportForm({ userId }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [buttonText, setButtonText] = useState("IMPORT");
    const [isDisabled, setIsDisabled] = useState(false);
    const handleSubmit = () => {
        setButtonText("LOADING");
        setIsDisabled(true)
        const payload = {
            user_id: userId
        }
        return dispatch(importSeasonChallenges(payload))
            .then(
                (response) => {
                    if (response.errors) {
                        setErrors(response.errors);
                        setIsDisabled(false);
                        return;
                    }
                    return;
                }
            );
    };



    return (
        <>You don't have logged any Battle Pass Challenges yet! You can enter some above or click the buttton below to import all the weekly challenges to date for the current season.
            {errors.map((error, idx) => (
                <p key={idx} className="errors">{error}</p>
            ))}
            <div className="button-div">
                <button
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isDisabled}
                >
                    {buttonText}
                </button>
            </div>
        </>
    )
}

export default ImportForm;
