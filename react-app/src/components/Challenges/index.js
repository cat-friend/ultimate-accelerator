import ChallengesBrowser from "../ChallengesBrowser";
import AddChallengeForm from "../ChallengesForms/AddChallengeForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"

function Challenges() {
    const currUser = useSelector(state => state.session.user)
    const { userId } = useParams();

    return (
        <>
            {currUser.id === +userId && <AddChallengeForm />}
            <ChallengesBrowser />
        </>)
}

export default Challenges;
