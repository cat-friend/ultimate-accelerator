import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import * as messageActions from "../../store/challenge";
import EditMessageModal from "../MessagesCRUD/EditMessageModal";
import DeleteMessageModal from "../MessagesCRUD/DeleteMessageModal";
import './Messages.css';

function MessagesBrowser() {
    const { clanId } = useParams()
    const messages = useSelector(state => state.clans.messages ? Object.values(state.clans.messages) : null);
    const clans = useSelector(state => Object.values(state.clans))
    const userId = useSelector(state => state.session.user.id);
    return (<>
        <div className="header-parent">
            <div className="left-corner-b"></div>
            <div className="header-child-b"><h2>Messages</h2></div>
            <div className="right-corner-b"></div>
        </div>
        <div className="bp-container">
            <div className="content clan">
                {messages?.length ? messages.map((ele, i) => {
                    return (
                        <div key={i} className="message">
                            {ele.message}
                            <div className="message-info">
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
