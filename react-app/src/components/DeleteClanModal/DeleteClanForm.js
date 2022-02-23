import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as clanActions from "../../store/clan";
import "./DeleteClanForm.css"

function DeleteClanForm({ setShowModal, clan }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { clanId } = useParams();
    const currUserId = useSelector(state => state.session.user.id);
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState([]);


    const submitDelete = () => {
        setErrors([]);
        const payload = {
            owner_user_id: clan.owner_user_id,
            curr_user_id: currUserId,
            clanId: clanId
        }
        return dispatch(clanActions.deleteClan(payload))
            .then(
                (response) => {
                    if (response.errors) {
                        setErrors(response.errors)
                        return
                    }
                    else {
                        setSuccess("Success!");
                        setTimeout(() => {
                            setShowModal(false);
                            dispatch(clanActions.deleteOneClan(clan))
                            history.push('/clans')
                        }, 1000);
                        return;
                    }
                }
            );
    };

    return (
        <>
            <div className="header-parent">
                <div className="left-corner"></div>
                <div className="header-child"><h2>Delete Clan?!</h2></div>
                <div className="right-corner"></div>
            </div>
            <div className="content-container">
                <div className="content">
                    <h2 className="success">{success}</h2>
                    <h3>Are you sure you want to delete this clan and all of its messages?</h3>
                    This cannot be undone.
                    <ul className="error-list">
                        {errors.map((error, idx) => (
                            <p key={idx} className="errors">{error}</p>
                        ))}
                    </ul>
                    <div className="button-div">
                        <button type="button" onClick={() => submitDelete()} className="">Yes, nuke it!</button>
                        <button type="button" onClick={() => setShowModal(false)} className="">Not today</button>
                    </div>
                </div>
            </div>
        </>)
}

export default DeleteClanForm;
