import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { weaponsDict, legendsDict, challengeTypeDict } from "./dictionaries"
import { challengeTypeRegex, abilitiesRegex, legendsRegex, weaponsRegex } from "./regexes"
import "./ChallengesForms.css"

function AddChallengeForm() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("")
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [checked, setChecked] = useState(new Array(3).fill(true))
    const [stars, setStars] = useState("")


    const modeNames = ["Battle Royale", "Arena", "LTM"]
    const modes = [1, 2, 3]
    let checkedModes = [1, 2, 3]
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
        const payload = {
            challenge_label: input,
            user_id: 1,
            value: +stars,
            mode_id: checkedModes,
            legend_id: [],
            challenge_type_id: [null]
        }
        setErrors([]);
        const challengeArray = input.toLowerCase().match(challengeTypeRegex)
        const abilitiesArray = input.toLowerCase().match(abilitiesRegex)
        const legendsArray = input.toLowerCase().match(legendsRegex)
        const weaponsArray = input.toLowerCase().match(weaponsRegex)
        console.log("challArray", challengeArray, Array.isArray(challengeArray))
        console.log("abilArray", abilitiesArray)
        console.log("legArray", legendsArray)
        console.log("weaponsRegex", weaponsArray)
        console.log(challengeArray[0])

        payload.challenge_type_id = (challengeArray ? challengeTypeDict[challengeArray[0]] : [1]);
        payload.weapon_id = weaponsArray ? weaponsDict[weaponsArray[0]] : [null];
        legendsArray ? legendsArray.forEach((ele) => {
            payload.legend_id.push(...legendsDict[ele])
        }) : payload.legend_id.push(null);
        console.log("payload", payload)
    };

    return (<>
        <div className="header-parent"><h2>Add a Challenge</h2></div>
        <div className="content">
            <ul className="error-list">
                {errors.map((error, idx) => (
                    <li key={idx} className="errors">{error}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
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
                {modeNames.map((ele, index) => {
                    return (<>
                        <div className="modes" key={`div-${index}`}>
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
                    </>)
                })}
                <div className="modes">
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
                        placeholder={5}
                        id="stars"
                        size="4"
                        required />
                </div>
                <button
                    type="submit"
                    disabled={showSuccess}>{showSuccess && "Success!"}SUBMIT</button>
            </form>
        </div>
    </>);
}

export default AddChallengeForm;
