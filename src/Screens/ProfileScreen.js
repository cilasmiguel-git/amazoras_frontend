import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import { useNavigate } from 'react-router';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div>
            <h2>ProfileScreen</h2>
            <button onClick={handleLogout}>LogOut</button>
        </div>

    )
}

export default ProfileScreen