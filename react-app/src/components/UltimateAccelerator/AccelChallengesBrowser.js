import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as challengeActions from "../../store/challenge";
import * as userActions from "../../store/user";
import EditChallenge from "../ChallengesForms/EditChallenges";
import DeleteChallengeModal from "../DeleteChallengeModal";
import '../ChallengesBrowser/ChallengesBrowser.css';

function AccelChallengesBrowser({ challenges }) {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(challengeActions.loadChallenges(userId));
        dispatch(userActions.getOneUser(userId));
    }, [dispatch, userId])
    const currUser = useSelector(state => state?.session?.user)
    const isUser = Boolean(userId == currUser.id)
    return (<>
        <div className="challenges">
            <div className="challenges-header">Associated Battle Pass Challenge(s)</div>
            <div className="challenges-header">Status</div>
            <div className="challenges-header">Stars</div>
            <div className="challenges-header"></div>
            {challenges.map((challenge, index) => {
                return (<>
                    <div className={`challenge-label-${index % 2}`} key={`challenge-label-${index}`}>
                        {challenge.challenge_label}
                    </div>
                    <div className={`status-label-${index % 2}`} key={`status-${index}`}>{
                        isUser ? <div><EditChallenge challengeId={challenge.id} key={`edit-status-${index}`} /></div> :
                            challenge.status}
                    </div>
                    <div className={`value-label-${index % 2}`} key={`value-${index}`}>
                        {challenge.sum}
                    </div>
                    <div className={`trash-label-${index % 2}`} key={`trash-index-${index}`}>
                        {isUser ? <DeleteChallengeModal challenge={challenge} /> : null }
                    </div>
                </>)
            })}
        </div >
    </>
    )
}

export default AccelChallengesBrowser;
