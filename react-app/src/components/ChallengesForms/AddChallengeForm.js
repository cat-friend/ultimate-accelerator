import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function AddChallengeForm() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("")
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [checked, setChecked] = useState(new Array(3).fill(true))
    const modeNames = ["Battle Royale", "Arena", "LTM"]
    const modes = [1, 2, 3]
    const modeValues = (input) => {
    }
    let checkedModes

    const handleCheckboxOnChange = (index) => {
        const updatedCheckedState = checked.map((ele, i) => index === i ? !ele : ele)
        setChecked(updatedCheckedState)
        checkedModes = modes.filter((ele, i) => {
            if (updatedCheckedState[i]) return ele
        })
        console.log(checkedModes)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        // return dispatch(cardActions.createCard(payload))
        //     .then(
        //         (response) => {
        //             if (response.errors) {
        //                 setErrors(response.errors)
        //                 return
        //             }
        //             setSuccess("Success!");
        //             setTimeout(() => {
        //                 setShowModal(false);
        //             }, 1500);
        //         }
        //     );
    };

    return (<><div className="header-parent"><h2>Add a Challenge</h2></div>
        <div className="content">
            <ul className="error-list">
                {errors.map((error, idx) => (
                    <li key={idx} className="errors">{error}</li>
                ))}
            </ul>
            <form>
                <input
                    type="text"
                    placeholder="Ex: Deal 5000 as Bangalore, Seer, or Rampart"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    name="user-challenge-input"
                    id="user-challenge-input"
                    required
                    minlength="10"
                    size="50"
                    data-lpignore="true"
                />
                {modeNames.map((ele, index) => {
                    return (<>
                        <div className="modes">
                            <div className="label-top" key={index}>
                                <label htmlFor={`mode-checkbox-${index}`}>
                                    {ele}
                                </label>
                            </div>
                            <div className="checkbox-bottom" key={`box-${index}`}>
                                <input
                                    type="checkbox"
                                    id={`mode-checkbox-${index}`}
                                    name={ele}
                                    checked={checked[index]}
                                    onChange={() => handleCheckboxOnChange(index)}
                                />
                            </div>
                        </div>
                    </>)
                })}


                {/*
                < input
                    type="checkbox"
                    id="br"
                    name="mode"
                    value={1}
                    onClick={modeValues(e.target)} />
                <label for="br">Battle Royale</label>
                <input type="checkbox" id="arena" name="mode" value={2} />
                <label for="arena">Arena</label>
                <input type="checkbox" id="ltm" name="mode" value={3} />
                <label for="ltm">LTM</label> */}

            </form>
        </div>
    </>

    );
}

export default AddChallengeForm;
