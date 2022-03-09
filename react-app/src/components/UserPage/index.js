import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../store/user";

function UserPage(){
    const {userId} = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user);
    useEffect(() => {
        dispatch(getOneUser(userId));
    }, [dispatch, userId]);
}

export default UserPage;
