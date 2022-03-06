import { accelerate } from "../../store/accelerate";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import { getAllLegends } from "../../store/legend";
import { getAllWeapons } from "../../store/weapon";
import { legendsString, weaponsString } from "./aux_functions"
import AccelChallengesBrowser from "./AccelChallengesBrowser";

function UltimateAccelerator() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(accelerate(userId));
        dispatch(getAllLegends());
        dispatch(getAllWeapons());
    }, [userId, dispatch])
    const user = useSelector((state) => state.session.user);
    const accelData = useSelector((state) => state.accelerate);
    const isUser = user.id === +userId;
    const legendsDict = useSelector((state) => state.legends);
    const weaponsDict = useSelector((state) => state.weapons);
    const battleRoyale = [];
    const arena = [];
    const LTM = [];
    if (!isUser) return (
        <div className="bp-container">
            <div className="content">
                <h1>HEY, you're not allowed here!</h1>
            </div>
        </div>
    )
    let mode1Sum = 0;
    let mode2Sum = 0;
    let mode3Sum = 0;
    if (accelData.mode_1?.legends?.max?.length && legendsDict && weaponsDict) {
        let maxCalcText
        const stringArray = legendsString(accelData.mode_1.legends.max, legendsDict)
        if (stringArray[0] > 1) maxCalcText = `Play as any of these characters to earn ${accelData.mode_1.legends.max[0].sum} stars: ` + stringArray[1];
        else maxCalcText = `Play as any of this character to earn ${accelData.mode_1.legends.max[0].sum} stars: ` + stringArray[1];
        battleRoyale.push(
            <div className="content" key="mode1leg">
                {accelData && (
                    <>
                        <h3>
                            {maxCalcText}
                        </h3>
                        <AccelChallengesBrowser challenges={accelData.mode_1?.legends?.challenges} />
                    </>
                )}
            </div>
        )
        mode1Sum += accelData.mode_1.legends.max[0].sum;
    }

    if (accelData.mode_1?.weapons?.max?.length && legendsDict && weaponsDict) {
        let maxCalcText;
        const stringArray = weaponsString(accelData.mode_1.weapons.max, weaponsDict)

        if (accelData.mode_1.legends.max.length)
            if (accelData.mode_1.misc.challenges.length > 1) {
                maxCalcText = `... and use any of these weapons to earn ${accelData.mode_1.weapons.max[0].sum} stars: ` + stringArray[1];
            }
            else {
                maxCalcText = `... and use this weapon to earn ${accelData.mode_1.weapons.max[0].sum} stars: ` + stringArray[1];
            }
        else {
            if (accelData.mode_1.misc.challenge.length > 1) {
                maxCalcText = `Use any of these weapons to earn ${accelData.mode_1.weapons.max[0].sum} stars: ` + stringArray[1];
            }
            else maxCalcText = `Use this weapon to earn ${accelData.mode_1.weapons.max[0].sum} stars: ` + stringArray[1];
        }
        battleRoyale.push(
            <div className="content" key="mode1weap">
                {accelData && (
                    <>
                        <h3>
                            {maxCalcText} to earn {accelData?.mode_1.weapons.max[0].sum} stars.
                        </h3>
                        <AccelChallengesBrowser challenges={accelData.mode_1.weapons.challenges} />
                    </>
                )}
            </div>
        )
        mode1Sum += accelData.mode_1.weapons.max[0].sum;
    }

    if (accelData.mode_1?.misc?.challenges?.length) {
        let miscSum = 0;
        let maxCalcText;
        if (accelData.mode_1.weapons.max.length || accelData.mode_1.legends.max.length)
            if (accelData.mode_1.misc.challenges.length > 1) {
                maxCalcText = "... and complete these"
            }
            else {
                maxCalcText = "... and complete this"
            }
        else {
            if (accelData.mode_1.misc.challenge.length > 1) {
                maxCalcText = "Complete these"
            }
            else maxCalcText = "Complete this"
        }
        accelData.mode_1.misc.challenges.forEach((ele) => miscSum += ele.sum);
        battleRoyale.push(
            <div className="content" key="mode1misc">
                {accelData && (
                    <>
                        <h3>
                            {maxCalcText} to earn {miscSum} stars.
                        </h3>
                        <AccelChallengesBrowser challenges={accelData.mode_1.misc.challenges} />
                    </>
                )}
            </div>
        )
        mode1Sum += miscSum
    }
    if (accelData.mode_2?.legends?.max?.length && legendsDict && weaponsDict) {
        let maxCalcText
        const stringArray = legendsString(accelData.mode_2.legends.max, legendsDict)
        if (stringArray[0] > 1) maxCalcText = "Play as any of these characters: " + stringArray[1];
        else maxCalcText = "Play as " + stringArray[1];
        arena.push(
            <div className="content" key="mode2leg">
                {accelData && (
                    <>
                        <h3>
                            {maxCalcText} to earn {accelData?.mode_2.legends.max[0].sum} stars.
                        </h3>
                        <AccelChallengesBrowser challenges={accelData.mode_2?.legends?.challenges} />
                    </>
                )}
            </div>
        )
        mode2Sum += accelData.mode_2.legends.max[0].sum;
    }

    if (accelData.mode_2?.weapons?.max?.length && legendsDict && weaponsDict) {
        let maxCalcText;
        const stringArray = weaponsString(accelData.mode_2.weapons.max, weaponsDict)
        if (accelData.mode_2.legends.max.length)
            if (accelData.mode_2.misc.challenges.length > 1) {
                maxCalcText = `... and use any of these weapons to earn ${accelData.mode_2.weapons.max[0].sum} stars: ` + stringArray[1];
            }
            else {
                maxCalcText = `... and use this weapon to earn ${accelData.mode_2.weapons.max[0].sum} stars: ` + stringArray[1];
            }
        else {
            if (accelData.mode_2.misc.challenge.length > 1) {
                maxCalcText = `Use any of these weapons to earn ${accelData.mode_2.weapons.max[0].sum} stars: ` + stringArray[1];
            }
            else maxCalcText = `Use this weapon to earn ${accelData.mode_2.weapons.max[0].sum} stars: ` + stringArray[1];
        }
        arena.push(
            <div className="content" key="mode2weap">
                {accelData && (
                    <>
                        <h3>
                            {maxCalcText} to earn {accelData?.mode_2.weapons.max[0].sum} stars.
                        </h3>
                        <AccelChallengesBrowser challenges={accelData.mode_2?.weapons?.challenges} />
                    </>
                )}
            </div>
        )
        mode2Sum += accelData.mode_2.weapons.max[0].sum;
    }

    if (accelData.mode_2?.misc?.challenges?.length) {
        let miscSum = 0;
        let maxCalcText;
        if (accelData.mode_2.weapons.max.length || accelData.mode_2.legends.max.length)
            if (accelData.mode_2.misc.challenges.length > 1) {
                maxCalcText = "... and complete these"
            }
            else {
                maxCalcText = "... and complete this"
            }
        else {
            if (accelData.mode_2.misc.challenge.length > 1) {
                maxCalcText = "Complete these"
            }
            else maxCalcText = "Complete this"
        }
        accelData.mode_2.misc.challenges.forEach((ele) => miscSum += ele.sum);
        arena.push(
            <div className="content" key="mode1misc">
                {accelData && (
                    <>
                        <h3>
                            {maxCalcText} to earn {miscSum} stars.
                        </h3>
                        <AccelChallengesBrowser challenges={accelData.mode_2.misc.challenges} />
                    </>
                )}
            </div>
        )
        mode2Sum += miscSum
    }

    if (accelData.mode_3?.legends?.max?.length && legendsDict && weaponsDict) {
        let maxCalcText
        const stringArray = legendsString(accelData.mode_3.legends.max, legendsDict)
        if (stringArray[0] > 1) maxCalcText = "Play as any of these characters: " + stringArray[1];
        else maxCalcText = "Play as " + stringArray[1];
        LTM.push(
            <div className="content" key="mode3leg">
                {accelData && (
                    <>
                        <h3>
                            {maxCalcText} to earn {accelData?.mode_3.legends.max[0].sum} stars.
                        </h3>
                        <AccelChallengesBrowser challenges={accelData.mode_3?.legends?.challenges} />
                    </>
                )}
            </div>
        )
        mode3Sum += accelData.mode_3.legends.max[0].sum;
    }

    if (accelData.mode_3?.weapons?.max?.length && legendsDict && weaponsDict) {
        let maxCalcText;
        const stringArray = weaponsString(accelData.mode_3.weapons.max, weaponsDict)
        if (accelData.mode_3.legends.max.length)
            if (accelData.mode_3.misc.challenges.length > 1) {
                maxCalcText = `... and use any of these weapons to earn ${accelData.mode_3.weapons.max[0].sum} stars: ` + stringArray[1];
            }
            else {
                maxCalcText = `... and use this weapon to earn ${accelData.mode_3.weapons.max[0].sum} stars: ` + stringArray[1];
            }
        else {
            if (accelData.mode_3.misc.challenge.length > 1) {
                maxCalcText = `Use any of these weapons to earn ${accelData.mode_3.weapons.max[0].sum} stars: ` + stringArray[1];
            }
            else maxCalcText = `Use this weapon to earn ${accelData.mode_3.weapons.max[0].sum} stars: ` + stringArray[1];
        }
        LTM.push(
            <div className="content" key="mode3weap">
                {accelData && (
                    <>
                        <h3>
                            {maxCalcText} to earn {accelData?.mode_3.weapons.max[0].sum} stars.
                        </h3>
                        <AccelChallengesBrowser challenges={accelData.mode_3?.weapons?.challenges} />
                    </>
                )}
            </div>
        )
        mode3Sum += accelData.mode_3.weapons.max[0].sum;
    }

    if (accelData.mode_3?.misc?.challenges?.length) {
        let miscSum = 0;
        let maxCalcText;
        if (accelData.mode_3.weapons.max.length || accelData.mode_3.legends.max.length)
            if (accelData.mode_3.misc.challenges.length > 1) {
                maxCalcText = "... and complete these"
            }
            else {
                maxCalcText = "... and complete this"
            }
        else {
            if (accelData.mode_3.misc.challenges.length > 1) {
                maxCalcText = "Complete these"
            }
            else maxCalcText = "Complete this"
        }
        accelData.mode_3.misc.challenges.forEach((ele) => miscSum += ele.sum);
        LTM.push(
            <div className="content" key="mode3misc">
                {accelData && (
                    <>
                        <h3>
                            {maxCalcText} to earn {miscSum} stars.
                        </h3>
                        <AccelChallengesBrowser challenges={accelData.mode_3.misc.challenges} />
                    </>
                )}
            </div>
        )
        mode3Sum += miscSum
    }

    return (
        <>{mode1Sum && (<>
            <div className="header-parent">
                <div className="left-corner"></div>
                <div className="header-child"><h2>Battle Royale: {mode1Sum} possible stars</h2></div>
                <div className="right-corner"></div>
            </div>
            <div className="bp-container">{battleRoyale}</div></>)}
            {mode2Sum && (
                <>
                    <div className="header-parent">
                        <div className="left-corner-b"></div>
                        <div className="header-child-b"><h2>Arena: {mode2Sum} possible stars</h2></div>
                        <div className="right-corner-b"></div>
                    </div>
                    <div className="bp-container">{arena}</div></>
            )}
            {mode3Sum && (
                <>
                    <div className="header-parent">
                        <div className="left-corner"></div>
                        <div className="header-child"><h2>LTM: {mode3Sum} possible stars</h2></div>
                        <div className="right-corner"></div>
                    </div>
                    <div className="bp-container">{LTM}</div></>
            )}


        </>
    )
};

export default UltimateAccelerator
