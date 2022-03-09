import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as challengeActions from "../../store/challenge";
import * as userActions from "../../store/user";
import EditChallenge from "../ChallengesForms/EditChallenges";
import DeleteChallengeModal from "../DeleteChallengeModal";
import './ChallengesBrowser.css';

function ChallengesBrowser() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const history = useHistory();
    useEffect(() => {
        dispatch(challengeActions.loadChallenges(userId));
        dispatch(userActions.getOneUser(userId));
    }, [dispatch, userId])
    const allChallenges = useSelector(state => {
        return Object.values(state.challenges)
    });
    const thisUser = useSelector(state => state?.user)
    const currUser = useSelector(state => state?.session?.user)
    const isUser = Boolean(+userId === currUser.id)
    const incompleteChallenges = allChallenges.filter((ele) => ele.status !== 'completed');
    const hasChallenges = Boolean(incompleteChallenges.length);

    const completeChallenges = allChallenges.filter((ele) => ele.status === 'completed');

    return (<>
        <div className="header-parent">
            <div className="left-corner-b"></div>
            <div className="header-child-b"><h2>{isUser ? "Your Battle Pass Challenges" : `${thisUser?.username}'s Battle Pass Challenges`}</h2></div>
            <div className="right-corner-b"></div>
        </div>
        <div className="bp-container">
            {isUser && hasChallenges && <div className="content"><button className="button-div" onClick={() => history.push(`/accelerate/${userId}`)}>
                ACCELERATE
            </button><br />
                Click this to calculate the combination of game modes, legends, and weapons that will yield the most Battle Pass stars based on your outstanding Battle Pass Challenges.
            </div>}
            <div className="content">
                <div className="challenges">
                    {hasChallenges ? (
                        <>
                            <div className="challenges-header">Battlepass Challenge</div>
                            <div className="challenges-header">Status</div>
                            <div className="challenges-header">Stars</div>
                            <div className="challenges-header"></div>
                            {incompleteChallenges.map((challenge, index) => {
                                return (<>
                                    <div className={`challenge-label-${index % 2}`} key={`challenge-label-${index}`}>
                                        {challenge.challenge_label}
                                    </div>
                                    <div className={`status-label-${index % 2}`} key={`status-${index}`}>{
                                        isUser ? <div><EditChallenge challengeId={challenge.id} key={`edit-status-${index}`} /></div> :
                                            challenge.status}
                                    </div>
                                    <div className={`value-label-${index % 2}`} key={`value-${index}`}>
                                        {challenge.value}
                                    </div>
                                    <div className={`trash-label-${index % 2}`} key={`trash-index-${index}`}>
                                        {isUser && <DeleteChallengeModal challenge={challenge} />}
                                    </div>
                                </>)
                            })}
                        </>) :
                        isUser ? "You don't have logged any Battle Pass Challenges yet! Please enter some so you can see the most efficient way to level up your Battle Pass while playing Apex :]" :
                            `${thisUser?.username} hasn't entered any Battle Pass Challenges yet!`}
                </div>
            </div>
        </div>
        {completeChallenges?.length > 0 && (
            <>
                <div className="header-parent">
                    <div className="left-corner-b"></div>
                    <div className="header-child-b"><h2>{isUser ? "Your Completed Battle Pass Challenges" : `${thisUser?.username}'s Completed Battle Pass Challenges`}</h2></div>
                    <div className="right-corner-b"></div>
                </div>
                <div className="bp-container">
                    <div className="content">
                        <div className="challenges">
                            {completeChallenges.map((challenge, index) => {
                                return (<>
                                    <div className={`challenge-label-${index % 2}`} key={`challenge-label-${index}`}>
                                        {challenge.challenge_label}
                                    </div>
                                    <div className={`status-label-${index % 2}`} key={`status-${index}`}>{
                                        isUser ? <div><EditChallenge challengeId={challenge.id} key={`edit-status-${index}`} /></div> :
                                            challenge.status}
                                    </div>
                                    <div className={`value-label-${index % 2}`} key={`value-${index}`}>
                                        {challenge.value}
                                    </div>
                                    <div className={`trash-label-${index % 2}`} key={`trash-index-${index}`}>
                                        {isUser && <DeleteChallengeModal challenge={challenge} />}
                                    </div>
                                </>)
                            })}
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
    )
}

export default ChallengesBrowser
