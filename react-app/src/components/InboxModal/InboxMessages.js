import qqh from "./easter_egg";
import "./InboxMessage.css"

function InboxMessages({ userId }) {
    const message = qqh[userId];

    return (
        <>
            <div className="content-container inbox">
                <div className="content">
                    {message}
                </div>
            </div>
        </>)

}

export default InboxMessages;
