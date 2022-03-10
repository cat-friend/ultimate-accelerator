import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import * as messageActions from "../../store/challenge";
import EditMessageModal from "../MessagesCRUD/EditMessageModal";
import DeleteMessageModal from "../MessagesCRUD/DeleteMessageModal";
import './Messages.css';
import AddMessageForm from "../MessagesCRUD/AddMessageForm";
import * as clanActions from "../../store/clan"

function MessagesBrowser() {
    const dispatch = useDispatch();
    const { clanId } = useParams();
    const messages = useSelector(state => state.clans.messages ? Object.values(state.clans.messages) : null);
    useEffect(() => {
        dispatch(clanActions.getOneClan(clanId));
    }, [dispatch, clanId, messages?.length])

    const user = useSelector(state => state.session.user);
    const userId = user?.id
    const isMember = user.clan_id === +clanId;
    return (<>
        <div className="header-parent">
            <div className="left-corner-b"></div>
            <div className="header-child-b"><h2>Messages</h2></div>
            <div className="right-corner-b"></div>
        </div>
        <div className="bp-container">
            {isMember && <AddMessageForm />}
            <div className="content clan">
                {messages?.length ? messages.map((ele, i) => {
                    return (
                        <div key={i} className="message">
                            {ele.message}
                            <div className="message-info line-break">
                                <div>{ele.username}</div>
                                {userId === ele.user_id && (
                                    <>
                                        <div className={`clan-${i % 2}`}>
                                            <EditMessageModal clanId={clanId} message={ele} />
                                        </div>
                                        <div className={`clan-${i % 2}`}>
                                            <DeleteMessageModal clanId={clanId} message={ele} />
                                        </div>
                                    </>
                                )}
                                <div> {(ele.updated_at && `Updated: ${ele.updated_at}`) || (ele.created_at && `Posted: ${ele.created_at}`)}</div>
                            </div>
                        </div>
                    )
                })
                    : "No messages posted!"}
            </div>
        </div>
    </>
    )

}

export default MessagesBrowser;
