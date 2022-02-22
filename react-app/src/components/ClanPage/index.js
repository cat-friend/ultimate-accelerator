import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as clanActions from "../../store/clan"
import EditClanModal from "../EditClanModal";

function ClanPage() {
    const { clanId } = useParams();
    const userId = useSelector(state => state.session.user.id);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clanActions.getOneClan(+clanId));
    }, [dispatch])
    const clan = useSelector(state => state.clans[+clanId])
    const members = useSelector(state => {
        if (clan) return Object.values(state.clans[clanId].members)
    });
    return (<>
        <div className="header-parent">
            <div className="left-corner"></div>
            <div className="header-child"><h2>{clan?.name}</h2></div>
            <div className="right-corner"></div>
        </div>
        <div className="content-container">
            <div className="content">
                <h3>Description:  {clan?.description}</h3>
                {clan?.owner_user_id === userId && <EditClanModal clan={clan} />}
            </div>
            <div className="content">
                <h3>Members:</h3>
                {members && members.map((ele, i) => {
                    return <div key={i} className={`member-${i % 2}`}>{ele.username}{ele.user_id === clan?.owner_user_id && (<> - Admin</>)}</div>
                })}
            </div>
        </div>
    </>
    )
}

export default ClanPage;
