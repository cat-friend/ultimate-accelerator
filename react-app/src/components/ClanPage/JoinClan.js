import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as clanActions from "../../store/clan"
import * as sessionActions from "../../store/session"

function JoinClan() {
    // get clan Id, user Id
    const dispatch = useDispatch();
    const { clanId } = useParams();
    const userId = useSelector(state => state.session.user.id);
    const [errors, setErrors] = useState([]);

    const handleSubmit = () => {
        setErrors([]);
        const payload = {
            clan_id: clanId,
            user_id: userId
        }
        dispatch(clanActions.addClanMember(payload)).then(
            (response) => {
                if (response.errors) {
                    setErrors(response.errors);
                    return
                }
                dispatch(clanActions.getOneClan(clanId));
                dispatch(sessionActions.authenticate());
            }
        );
    }

    return (<>
        <div>
            {errors && errors.map((error, idx) => (
                <p key={idx} className="errors">{error}</p>
            ))}
        </div>
        <button
            type="button"
            onClick={() => handleSubmit()}>
            JOIN
        </button>
    </>)
    // send payload that has that
    // in backend, check if user has joined a clan previously, if so --> send error -- DONE
    // dispatch joinClan or add member or something
    // return errors
}

export default JoinClan;
