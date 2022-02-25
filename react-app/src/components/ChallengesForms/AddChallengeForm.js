import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { weaponsDict, legendsDict, challengeTypeDict } from "./dictionaries"
import { challengeTypeRegex, abilitiesRegex, legendsRegex, weaponsRegex } from "./regexes"
import "./ChallengesForms.css"
import * as challengeActions from "../../store/challenge"

function AddChallengeForm() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("")
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [checked, setChecked] = useState(new Array(3).fill(false))
    const [stars, setStars] = useState("")


    const modeNames = ["Battle Royale", "Arena", "LTM"]
    const modes = [1, 2, 3]
    let checkedModes
    const handleCheckboxOnChange = (index) => {
        const updatedCheckedState = checked.map((ele, i) => index === i ? !ele : ele)
        console.log("updatedCheckedState", updatedCheckedState)
        setChecked(updatedCheckedState)
        checkedModes = modes.filter((ele, i) => {
            if (updatedCheckedState[i]) return true;
            return false;
        })
        console.log("checkedModes", checkedModes);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            challenge_label: input,
            user_id: 1,
            value: +stars,
            mode_id: checkedModes,
            legend_id: []
        }
        console.log("payload", payload)
        setErrors([]);
        const challengeArray = input.toLowerCase().match(challengeTypeRegex)
        const abilitiesArray = input.toLowerCase().match(abilitiesRegex)
        const legendsArray = input.toLowerCase().match(legendsRegex)
        const weaponsArray = input.toLowerCase().match(weaponsRegex)

        payload.challenge_type_id = (challengeArray ? challengeTypeDict[challengeArray[0]] : abilitiesArray ? 1 :
            0
        );
        payload.weapon_id = weaponsArray ? weaponsDict[weaponsArray[0]] : [null];
        legendsArray ? legendsArray.forEach((ele) => {
            payload.legend_id.push(...legendsDict[ele])
        }) : payload.legend_id.push(null);
        return dispatch(challengeActions.createChallenge(payload))
            .then(
                (response) => {
                    if (response.errors) {
                        setErrors(response.errors)
                        setInput("");
                        return
                    }
                    setShowSuccess(true);
                    setInput("");
                    setStars("");
                    setTimeout(() => {
                        setShowSuccess(false);
                    }, 1000);
                }
            );
    };

    return (<>
        <div className="header-parent">
            <div className="left-corner"></div>
            <div className="header-child"><h2>Add a Challenge</h2></div>
            <div className="right-corner"></div>
        </div>
        <div className="content-container">
            <div className="content">
                {errors.map((error, idx) => (
                    <p key={idx} className="errors">{error}</p>
                ))}
                <form onSubmit={handleSubmit}>
                    <div className="add-challenge-container">
                        <div>
                            <label htmlFor="user_challenge-input">Battlepass Challenge</label>
                            <input
                                type="text"
                                placeholder="Ex: Deal 5000 damage as Bangalore, Seer, or Rampart"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                name="user-challenge-input"
                                id="user-challenge-input"
                                required
                                minLength="10"
                                data-lpignore="true"
                            />
                        </div>
                        <div className="modes">
                            {modeNames.map((ele, index) => {
                                return (
                                    <div key={index}>
                                        <div className="label-top" key={index}>
                                            <label htmlFor={`mode-checkbox-${index}`} key={`label-${index}`}>
                                                {ele}
                                            </label>
                                        </div>
                                        <div className="checkbox-bottom" key={`box-${index}`}>
                                            <input
                                                type="checkbox"
                                                id={`mode-checkbox-${index}`}
                                                key={`mode-checkbox-${index}`}
                                                name={ele}
                                                checked={checked[index]}
                                                onChange={() => handleCheckboxOnChange(index)}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="stars">
                            <div className="label-top">
                                <label htmlFor="stars">
                                    Stars
                                </label>
                            </div>
                            <input
                                type="number"
                                min={1}
                                max={10}
                                onChange={(e) => setStars(e.target.value)}
                                placeholder="5"
                                id="stars"
                                size="4"
                                required
                                value={stars} />
                        </div>
                    </div>
                    <div className="button-div">
                        <button
                            type="submit"
                            disabled={showSuccess}>
                            {showSuccess ? "SUCCESS!" : "SUBMIT"}</button>
                        <button
                            type="button"
                            onClick={() => {
                                setInput("");
                                setChecked(new Array(3).fill(true));
                                setStars("")
                            }}>
                                RESET
                            </button>

                    </div>
                </form>
            </div>
        </div>
    </>);
}

export default AddChallengeForm;
