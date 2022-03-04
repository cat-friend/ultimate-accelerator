import { accelerate } from "../../store/accelerate";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import {legendsDict} from "../ChallengesForms/dictionaries"

function UltimateAccelerator() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    useEffect(() => {
        dispatch(accelerate(userId));
    }, [userId, dispatch])
    const user = useSelector((state) => state.session.user);
    const accelData = useSelector((state) => state.accelerate);
    const isUser = user.id === +userId;
    console.log("accelData,", accelData)
    let legendsMode1;
    if (accelData.legendMode1Max?.length) {
        const legendsArray = []
        accelData.legendMode1Max.forEach((ele) => {
            console.log(ele.legend_id)
            legendsArray.push(legendsDict[ele.legend_id])
        });
        console.log(legendsArray);
        legendsMode1 = (
            <div className="bp-container">
                <div className="content">
                    {accelData && accelData.legendMode1Max?.length && (<h3>Legends, max possible stars: {accelData?.legendMode1Max[0].sum}</h3>)}
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

        </>
    )
};

export default UltimateAccelerator
