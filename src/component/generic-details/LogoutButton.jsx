import React from 'react';
import {Button} from 'react-bootstrap';
import AuthService from '../../service/AuthService';
import {useHistory} from "react-router-dom";

const LogoutButton = () => {
    const history = useHistory();

    const logoutHandler = () => {
        AuthService.logout();
        history.push('/login')
    }

    return (
        <Button variant='outline-light' onClick={logoutHandler}><i className="fas fa-sign-out-alt">Logout</i></Button>
    );
}

export default LogoutButton;