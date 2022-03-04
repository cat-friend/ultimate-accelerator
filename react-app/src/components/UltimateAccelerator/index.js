import { accelerate } from "../../store/accelerate";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import { getAllLegends } from "../../store/legend";
import { getAllWeapons } from "../../store/weapon";
import { legendsString, weaponsString } from "./aux_functions"

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
    if (accelData.legendMode1Max?.length && legendsDict && weaponsDict) {
        let flavorText;
        const stringArray = legendsString(accelData.legendMode1Max, legendsDict)
        if (stringArray[0] > 1) flavorText = "Play as any of these characters: " + stringArray[1];
        else flavorText = "Play as " + stringArray[1];
        battleRoyale.push(
            <div className="bp-container">
                <div className="content">
                    {accelData && accelData.legendMode1Max?.length && (
                        <>
                            <h3>
                                <p>{flavorText}</p> to earn {accelData?.legendMode1Max[0].sum} max possible stars.
                            </h3>

                        </>
                    )}
                </div>
            </div>
        )
    }
    if (accelData.legendMode2Max?.length) {
        let flavorText;
        const stringArray = legendsString(accelData.legendMode2Max, legendsDict)
        if (stringArray[0] > 1) flavorText = "Play as any of these characters: " + stringArray[1];
        else flavorText = "Play as " + stringArray[1];
        arena.push(
            <div className="bp-container">
                <div className="content">
                    {accelData && accelData.legendMode2Max?.length && (
                        <>
                            <h3>
                                <p>{flavorText}</p> to earn {accelData?.legendMode2Max[0].sum} max possible stars.
                            </h3>

                        </>
                    )}
                </div>
            </div>
        )
    }

    if (accelData.legendMode3Max?.length) {
        let flavorText;
        const stringArray = legendsString(accelData.legendMode3Max, legendsDict)
        if (stringArray[0] > 1) flavorText = "Play as any of these characters: " + stringArray[1];
        else flavorText = "Play as " + stringArray[1];
        LTM.push(
            <div className="bp-container">
                <div className="content">
                    {accelData && accelData.legendMode3Max?.length && (
                        <>
                            <h3>
                                <p>{flavorText}</p> to earn {accelData?.legendMode3Max[0].sum} max possible stars.
                            </h3>

                        </>
                    )}
                </div>
            </div>
        )
    }
    if (accelData.weaponMode1Max?.length) {
        let flavorText;
        const stringArray = weaponsString(accelData.weaponMode1Max, weaponsDict)
        if (stringArray[0] > 1) flavorText = "Use any of these weapons: " + stringArray[1];
        else flavorText = "Play as " + stringArray[1];
        battleRoyale.push(
            <div className="bp-container">
                <div className="content">
                    {accelData && accelData.weaponMode1Max?.length && (
                        <>
                            <h3>
                                <p>{flavorText}</p> to earn {accelData?.weaponMode1Max[0].sum} max possible stars.
                            </h3>

                        </>
                    )}
                </div>
            </div>
        )
    }
    if (accelData.weaponMode2Max?.length) {
        let flavorText;
        const stringArray = weaponsString(accelData.weaponMode2Max, weaponsDict)
        if (stringArray[0] > 1) flavorText = "Use any of these weapons: " + stringArray[1];
        else flavorText = "Play as " + stringArray[1];
        arena.push(
            <div className="bp-container">
                <div className="content">
                    {accelData && accelData.weaponMode2Max?.length && (
                        <>
                            <h3>
                                <p>{flavorText}</p> to earn {accelData?.weaponMode2Max[0].sum} max possible stars.
                            </h3>

                        </>
                    )}
                </div>
            </div>
        )
    }
    if (accelData.weaponMode3Max?.length) {
        let flavorText;
        const stringArray = legendsString(accelData.legendMode3Max, legendsDict)
        if (stringArray[0] > 1) flavorText = "Use any of these weapons: " + stringArray[1];
        else flavorText = "Play as " + stringArray[1];
        LTM.push(
            <div className="bp-container">
                <div className="content">
                    {accelData && accelData.legendMode3Max?.length && (
                        <>
                            <h3>
                                <p>{flavorText}</p> to earn {accelData?.legendMode3Max[0].sum} max possible stars.
                            </h3>

                        </>
                    )}
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="header-parent">
                <div className="left-corner"></div>
                <div className="header-child"><h2>Battle Royale</h2></div>
                <div className="right-corner"></div>
            </div>
            <div>BR: {battleRoyale}</div>
            <div>Arenas: {arena}</div>
            <div>LTM: {LTM}</div>

        </>
    )
};

export default UltimateAccelerator
