import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import * as challengeActions from "../../store/challenge"
import EditChallenge from "../ChallengesForms/EditChallenges";
import DeleteChallengeModal from "../DeleteChallengeModal"
import OneChallenge from "../OneChallenge";
import './ChallengesBrowser.css'

function ChallengesBrowser() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const currUser = useSelector(state => state?.session?.user)
    useEffect(() => {
        dispatch(challengeActions.loadChallenges(userId))
    }, [dispatch, userId])
    const challenges = useSelector(state => {
        return Object.values(state.challenges)
    });
    return (<>
        <div className="header-parent">
            <div className="left-corner-b"></div>
            <div className="header-child-b"><h2>{+userId === currUser.id ? "Your Battlepass Challenges" : `not ${currUser.username}'s challenges`}</h2></div>
            <div className="right-corner-b"></div>
        </div>
        <div className="content-container">
            <div className="content">
                <div className="challenges">
                    <div className="challenges-header">Challenge</div>
                    <div className="challenges-header">Status</div>
                    <div className="challenges-header">Stars</div>
                    <div className="challenges-header"></div>
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
