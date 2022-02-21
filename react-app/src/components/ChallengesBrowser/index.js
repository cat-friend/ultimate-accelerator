import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import * as challengeActions from "../../store/challenge"
import EditChallenge from "../ChallengesForms/EditChallenges";
import DeleteChallengeModal from "../DeleteChallengeModal"
import OneChallenge from "../OneChallenge";
function ChallengesBrowser() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const currUserId = useSelector(state => state?.session?.user.id)
    useEffect(() => {
        dispatch(challengeActions.loadChallenges(userId))
    }, [dispatch, userId])
    const challenges = useSelector(state => {
        return Object.values(state.challenges)
    });
    return (<>
        <div className="header-parent">
            <div className="left-corner-b"></div>
            <div className="header-child-b"><h2>{+userId === currUserId ? "Your Challenges" : "This dude's challenges"}</h2></div>
            <div className="right-corner-b"></div>
        </div>
        <div className="content-container">
            <div className="content">
                <div className="challenges">
                    <div className="challenges-header">Challenge</div>
                    <div className="challenges-header">Status</div>
                    <div className="challenges-header">Stars</div>
                    {challenges.map((challenge, index) => {
                        return (
                            <div key={index} className="challenge-data">
                                <OneChallenge challenge={challenge} index={index}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </>
    )
}

export default ChallengesBrowser
