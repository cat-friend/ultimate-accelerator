import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as clanActions from "../../store/clan"

import DeleteClanModal from "../DeleteClanModal";
import EditClanModal from "../EditClanModal";
import MessagesBrowser from "../MessagesBrowser";
import JoinClan from "./JoinClan";
import LeaveClan from "./LeaveClan";

function ClanPage() {
    const { clanId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const clan = useSelector((state) => state.clans);
    const members = clan ? clan.members : null;
    useEffect(() => {
        dispatch(clanActions.getOneClan(clanId));
    }, [dispatch, clanId])

    const clan_members = members ? Object.values(members) : null;
    const isAdmin = clan?.owner_user_id === user.id;
    const isMember = clan?.id === user.clan_id;
    return (<>
        <div className="header-parent">
            <div className="left-corner"></div>
            <div className="header-child"><h2>{clan?.name}</h2></div>
            <div className="right-corner"></div>
        </div>
        <div className="content-container">
            <div className="content">
                <h3>Description:  {clan?.description}</h3>
                <div className="button-div">
                    {isAdmin && (
                        <>
                            <EditClanModal clan={clan} />
                            <DeleteClanModal clan={clan} />
                        </>
                    )}
                    {(isMember && !isAdmin) && <LeaveClan />}
                    {(!isMember && !isAdmin) && <JoinClan />}
                </div>
            </div>
            <div className="content">
                <h3>Members:</h3>
                {clan_members && clan_members.map((ele, i) => {
                    return <div key={i} className={`member-${i % 2}`}>{ele.username}{ele.user_id === clan?.owner_user_id && (<> - Admin</>)}</div>
                })}
            </div>
        </div>
        <MessagesBrowser />
    </>
    )
}

export default ClanPage;
