import { useSelector } from "react-redux"
import EditChallenge from "../ChallengesForms/EditChallenges"
import DeleteChallengeModal from "../DeleteChallengeModal"


function OneChallenge({challenge, index}) {
    const currUserId = useSelector(state => state.session.user.id)
    return (<><div className={`challenge-label-${index % 2}`} key={`challenge-label-${index}`}>
        {challenge?.challenge_label}
    </div>
        {
            challenge?.user_id === currUserId ? <EditChallenge challengeId={challenge.id} key={`edit-status-${index}`} /> : <div className={`status-${index % 2}`} key={`status-${index}`}>
                {challenge?.status}
            </div>
        }
        <div className={`value-${index % 2}`} key={`value-${index}`}>
            {challenge?.value}
        </div>
        <div className={`trash-index-${index % 2}`} key={`trash-index-${index}`}>
            {challenge?.user_id === currUserId && <DeleteChallengeModal challenge={challenge} />}
        </div></>)

}
export default OneChallenge
