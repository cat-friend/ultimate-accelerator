import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function JoinClan() {
    // get clan Id, user Id
    const dispatch = useDispatch();
    const { clanId } = useParams();
    const userId = useSelector(state => state.session.user.id);
    const [errors, setErrors] = useState([]);

    const handleSubmit = () => {
        setErrors([]);
        const payload = {
            clan_id = clanId,
            user_id = userId
        }
        // some dispatch
    }
    return (<>
        <button
            type="button"
            onClick={() => handleSubmit()}>
            JOIN
        </button>
        <div>
            {errors && errors.map((error, idx) => (
                <p key={idx} className="errors">{error}</p>
            ))}
        </div>
    </>)
    // send payload that has that
    // in backend, check if user has joined a clan previously, if so --> send error
    // dispatch joinClan or add member or something
    // return errors

}
