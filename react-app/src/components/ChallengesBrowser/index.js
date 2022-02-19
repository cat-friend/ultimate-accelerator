import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import * as challengeActions from "../../store/challenge"
import EditChallenge from "../ChallengesForms/EditChallenges";

function ChallengesBrowser() {
    console.log("henlo?")
    const { userId } = useParams();
    const dispatch = useDispatch();
    const currUserId = useSelector(state => state.session?.user.id)
    useEffect(() => {
        dispatch(challengeActions.loadChallenges(userId))
    }, [dispatch, userId])
    const challenges = useSelector(state => {
        return Object.values(state.challenges)
    });
    return (<>
        <div className="header-parent"><h2>This dude's challenges</h2></div>
        <div className="content">
            <div className="challenges">
                <div className="challenges-header">Challenge</div>
                <div className="challenges-header">Status</div>
                <div className="challenges-header">Stars</div>
                {challenges.map((challenge, index) => {
                    return (
                        <>
                            <div className={`challenge-label-${index % 2}`} key={`challenge-label-${index}`}>
                                {challenge?.challenge_label}
                            </div>
                            {challenge?.user_id === currUserId ? <EditChallenge challengeId={challenge.id} />: <div className={`status-${index % 2}`} key={`status-${index}`}>
                                {challenge?.status}
                            </div>}
                            <div className={`value-${index % 2}`} key={`value-${index}`}>
                                {challenge?.value}
                            </div>
                            <div className={`trans-index-${index % 2}` }>{challenge?.user_id === currUserId && <i class="fa-solid fa-trash"></i>}</div>
                        </>
                    )
                })}
            </div>
        </div>
    </>
    )
}

export default ChallengesBrowser
