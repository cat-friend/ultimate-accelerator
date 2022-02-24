import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as clanActions from "../../store/clan";
import { NavLink } from 'react-router-dom';
import CreateClan from "../ClanForms/CreateClan";

function Clans() {
    const dispatch = useDispatch();
    const clans = useSelector(state => { return Object.values(state.clans) });
    const user = useSelector(state => state.session.user)
    const hasClan = user.clan_id;
    useEffect(() => {
        dispatch(clanActions.loadClans());
    }, [dispatch])
    return (
        <>
            {!hasClan && <CreateClan />}
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
