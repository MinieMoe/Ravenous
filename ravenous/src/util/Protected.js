/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
    // user from redux store
    const { user, loaded } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        //if the app is done loading but the user email can not be found, direct to login page
        if (loaded && !user.email) {
            navigate('/login', {replace:true})
        }

    }, [loaded, user])

    return children;
};

export default Protected;