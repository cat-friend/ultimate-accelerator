import { useEffect, useState } from "react"
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../store/user";
import { getOneClan } from "../../store/clan";
import ChallengesBrowser from "../ChallengesBrowser";
import EditBio from "./EditBio";

function UserPage() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user);
    const isUser = Boolean(sessionUser.id === +userId)
    const userBio = user ? user.bio : null;
    const hasClan = Boolean(user.clan_id)
    const clan = useSelector(state => state.clans)
    const [showEditForm, setShowEditForm] = useState(false);
    const [showEditButton, setShowEditButton] = useState(true);

    useEffect(() => {
        dispatch(getOneUser(userId));
        if (user?.clan_id) dispatch(getOneClan(user.clan_id));
    }, [dispatch, userId, user.clan_id]);






    return (
        <>
            <div className="header-parent">
                <div className="left-corner"></div>
                <div className="header-child">
                    <h2>{user?.username}</h2>
                </div>
                <div className="right-corner"></div>
            </div>
            <div className="content-container">
                <div className="content">
                    <h3>Bio:</h3>
                    <p>{userBio ? userBio : isUser ? "You haven't entered anything for your bio... yet! Please tell people how incredible you are :]" : `${user.username} hasn't entered anything for their bio... yet! But they're probably an incredible person :]`}</p>
                    {isUser && showEditButton && <div className="button-div">
                        <button onClick={() => {
                            setShowEditForm(true);
                            setShowEditButton(false)
                        }}>EDIT
                        </button>
                    </div>}
                    {showEditForm && <EditBio user={user} setShowEditForm={setShowEditForm} setShowEditButton={setShowEditButton} />}
                </div>
                <div className="content">
                    <h3>Clan:</h3>
                    <p>
                        {hasClan ?
                            <NavLink to={`/clans/${user.clan_id}`} className={`a-${userId % 2}`}>{`${clan?.name}`}</NavLink> :
                            isUser ?
                                <>Hey, you're not in a clan yet! Check out the <NavLink to="/clans" className={`a-${userId % 2}`}>clans page</NavLink>  to find a clan to join</> :
                                `${user.username} hasn't joined a clan yet.`
                        }
                    </p>
                </div>
            </div>
            <ChallengesBrowser />
        </>
    )
}

export default UserPage;
