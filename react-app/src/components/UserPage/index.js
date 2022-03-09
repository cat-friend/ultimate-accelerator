import { useEffect } from "react"
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../store/user";
import { getOneClan } from "../../store/clan";
import ChallengesBrowser from "../ChallengesBrowser";

function UserPage() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user);
    const isUser = Boolean(sessionUser.id === +userId)
    const userBio = user ? user.bio : null;
    const hasClan = Boolean(user.clan_id)
    useEffect(() => {
        dispatch(getOneUser(userId));
        if (user?.clan_id) dispatch(getOneClan(user.clan_id));
    }, [dispatch, userId, user.clan_id]);
    return (
        <>
            <div className="header-parent">
                <div className="left-corner-b"></div>
                <div className="header-child-b"><h2>{user?.username}</h2></div>
                <div className="right-corner-b"></div>
            </div>
            <div className="content-container">
                <div className="content">
                    <h3>Bio:</h3>
                    <p>{userBio ? userBio : isUser ? "You haven't entered anything for your bio... yet! Please tell people how incredible you are :]" : `${user.username} hasn't entered anything for their bio... yet! But they're probably an incredible person :]`}</p>
                    {isUser && <div className="button-div"><button>hello</button></div>}
                    <h3>Clan:</h3>
                    <p>
                        {hasClan ?
                            <NavLink to={`/clans/${user.clan_id}`} /> :
                            isUser ?
                                `Hey, you're not in a clan yet! Check out the ${<NavLink to="/clans" className="clan-1">clans page</NavLink>}  to find a clan to join` :
                                `${user.username} hasn't joined a clan yet.`
                        }
                    </p>
                </div>
                {/* <div className="content">
                    <h3>STATS</h3>
                </div> */}
            </div>
            <ChallengesBrowser />
        </>
    )
}

export default UserPage;
