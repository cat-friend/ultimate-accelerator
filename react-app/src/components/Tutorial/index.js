import * as tutorialInfo from "./TutorialInfo"
import example from "./challenge-ss-example.png"
import "./Tutorial.css"

function Tutorial() {
    return (
        <>
            <div className="header-parent">
                <div className="left-corner-b"></div>
                <div className="header-child-b"><h2>How to Use Ultimate Accelerator</h2></div>
                <div className="right-corner-b"></div>
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
                    <h3>Battle Pass Challenges Overview</h3>
                    <p>Battle Pass Challenges can be found on the top right of the lobby screen in <i>Apex Legends</i>:</p>
                    <img alt="example of battle pass challenges displayed on the lobby screen" src={example} />
                    <h3>Examples of Battle Pass Challenges</h3>
                    <ul>
                        {tutorialInfo.challengeExamplesArray.map((ele, index) => {
                            return <li key={index}>{ele}</li>
                        })}
                    </ul>
                </div>
                <div className="content">
                    <h3>Types of Challenges</h3>
                    <p><i>Apex Legends</i> Battle Pass Challenges have 12 basic types:</p>
                    <ul>
                        {tutorialInfo.challegeTypes.map((ele, index) => {
                            return <li key={index}>{ele}</li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Tutorial;
