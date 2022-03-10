import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weaponsDict, legendsDict, challengeTypeDict } from "./dictionaries"
import { challengeTypeRegex, abilitiesRegex, legendsRegex, weaponsRegex } from "./regexes"
import "./ChallengesForms.css"
import * as challengeActions from "../../store/challenge"
import { useHistory } from "react-router-dom";

function AddChallengeForm() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("")
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [checked, setChecked] = useState(new Array(3).fill(false));
    const [stars, setStars] = useState("");
    const user = useSelector(state => state.session.user);
    const history = useHistory();


    const modeNames = ["Battle Royale", "Arena", "LTM"]
    const modes = [1, 2, 3]
    let checkedModes
    const handleCheckboxOnChange = (index) => {
        const updatedCheckedState = checked.map((ele, i) => index === i ? !ele : ele)
        setChecked(updatedCheckedState)
        checkedModes = modes.filter((ele, i) => {
            if (updatedCheckedState[i]) {
                return true
            };
            return false;
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        checkedModes = modes.filter((ele, i) => {
            if (checked[i]) {
                return true;
            }
            return false;
        })
        const payload = {
            challenge_label: input,
            user_id: user.id,
            value: +stars,
            mode_id: checkedModes,
            legend_id: []
        }
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
                        return
                    }
                    setShowSuccess(true);
                    setInput("")
                    setStars("")
                    setChecked(new Array(3).fill(false))
                    setTimeout(() => {
                        setShowSuccess(false);
                    }, 750);
                }
            );
    };

    return (
        <>
            <div className="header-parent">
                <div className="left-corner"></div>
                <div className="header-child"><h2>Add a Challenge</h2></div>
                <div className="right-corner"></div>
            </div>
            <div className="bp-container">
                <div className="content">
                    <h3>How to Enter Battle Pass Data</h3>
                    <p>For an entry to be considered valid, the Battle Pass challenges that the user inputs must follow the structure of the example Battle Pass challenges: </p>
                    <ul>
                        <li>The challenge must have some diction that indicate the challenge type. For example, "deal <i>damage</i>," "<i>play</i> as Gibletta";</li>
                        <li>Weapons or weapon classes and legend(s) are OPTIONAL but, in order to register correctly must exist in <i>Apex Legends</i></li>
                        <li>Play mode (Battle Royale, Arena, or LTM) must be indicated;</li>
                        <li>Value, or number of stars that the challenge is worth, must also be indicated.</li>
                    </ul>
                </div>
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
                            <div className="button-div">
                            <button
                                type="button"
                                onClick={() => {
                                    history.push("/tutorial")
                                }}
                            >TUTORIAL</button>
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
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddChallengeForm;
