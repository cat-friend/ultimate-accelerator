import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as clanActions from "../../store/clan";
import * as sessionActions from "../../store/session"
import { NavLink } from 'react-router-dom';
import CreateClan from "../ClanForms/CreateClan";
import "./Clans.css"

function Clans() {
    const dispatch = useDispatch();
    const clans = useSelector(state => { return Object.values(state.clans) });
    const user = useSelector(state => state.session.user)
    const hasClan = user.clan_id;
    useEffect(() => {
        dispatch(clanActions.loadClans());
        dispatch(sessionActions.authenticate());
    }, [dispatch])
    return (
        <>
            {!hasClan && <CreateClan />}
            {hasClan && (
                <>
                    <div className="header-parent">
                        <div className="left-corner-b"></div>
                        <div className="header-child-b"><h2>Create a Clan</h2></div>
                        <div className="right-corner-b"></div>
                    </div>
                    <div className="content-container">
                        <div className="content">
                            Looks like you're currently a member of a clan. Unfortunately, you can't create a clan while you're currently a member of one.
                        </div>
                    </div>
                </>
            )}
            <div className="header-parent">
                <div className="left-corner"></div>
                <div className="header-child"><h2>Clans</h2></div>
                <div className="right-corner"></div>
            </div>
            <div className="content-container">
                <div className="content">
                    {clans && clans.map((clan, index) => {
                        return (
                            <div className={`clan-${index % 2}`} key={index}>
                                <NavLink className="" to={`/clans/${clan?.id}`}>
                                    {clan?.name}
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Clans;
