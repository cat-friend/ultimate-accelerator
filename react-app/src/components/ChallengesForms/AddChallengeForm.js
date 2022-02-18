import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { weaponsDict, legendsDict, challengeTypeDict } from "./dictionaries"
import { challengeTypeRegex, abilitiesRegex, legendsRegex, weaponsRegex } from "./regexes"

function AddChallengeForm() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("")
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [checked, setChecked] = useState(new Array(3).fill(true))
    const [stars, setStars] = useState("")


    const modeNames = ["Battle Royale", "Arena", "LTM"]
    const modes = [1, 2, 3]
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
        const payload = {
            challenge_label: input,
            user_id: 1,
            value: 10,
            mode_id: checkedModes,
            legend_id: [],
        }
        setErrors([]);
        const challengeArray = input.toLowerCase().match(challengeTypeRegex)
        const abilitiesArray = input.toLowerCase().match(abilitiesRegex)
        const legendsArray = input.toLowerCase().match(legendsRegex)
        const weaponsArray = input.toLowerCase().match(weaponsRegex)
        console.log("challArray", challengeArray)
        console.log("abilArray", abilitiesArray)
        console.log("legArray", legendsArray)
        console.log("weaponsRegex", weaponsArray)
        payload.challenge_type_id = true ? [1] : challengeTypeDict.challengeArray[0];
        payload.weapon_id = weaponsArray ? weaponsDict.weaponsArray[0] : [null];
        legendsArray ? legendsArray.forEach((ele) => {
            payload.legend_id.push(...legendsDict[ele])
        }) : payload.legend_id.push(null);

    };

    return (<><div className="header-parent"><h2>Add a Challenge</h2></div>
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
                        id="stars" />
                </div>
                <button type="submit">SUBMIT</button>


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
