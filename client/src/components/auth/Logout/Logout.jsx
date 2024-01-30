import React from "react";
import { useDispatch } from "react-redux";
import { logout } from '../../../redux/user/userSlice';

const Logout = () => {
    const dispatch = useDispatch();
    const onLogout = async (e) => {
        dispatch(logout());
    };

    return (
        <div onClick={onLogout} className="btn-font-lt">
            Logout
        </div>
    );
};

export default Logout;
