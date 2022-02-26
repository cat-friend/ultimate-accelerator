import { accelerate } from "../../store/accelerate";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { useEffect } from "react";

function UltimateAccelerator() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    useEffect(() => {
        dispatch(accelerate(userId));
    }, [userId, dispatch])
    const user = useSelector((state) => state.session.user);
    const accelData = useSelector((state) => state.session.accelerate);
    const isUser = user.id === +userId;

    return (<h1>Hello!</h1>)
}

export default UltimateAccelerator
