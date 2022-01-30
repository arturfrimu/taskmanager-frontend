import React, {useContext} from "react";
import {Link} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthContext from "../../context/auth-context";

const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const isAdmin = authCtx.role === "ADMIN";

    const logoutHandler = () => {
        authCtx.logout();
    }

    return (
        <header className={classes.header}>
            <Link to='/myTasks'>
                <div className={classes.logo}>Taskmanager</div>
            </Link>
            <nav>
                <ul>
                    {!isLoggedIn &&
                    <li>
                        <Link to='/auth'>Login</Link>
                    </li>
                    }
                    {isLoggedIn && isAdmin &&
                    <li>
                        <Link to='/users'>Users</Link>
                    </li>
                    }
                    {isLoggedIn && isAdmin &&
                    <li>
                        <div className="dropdown">
                            <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown">Teams</a>
                            <div className="dropdown-menu" style={{backgroundColor: '#38015C'}}>
                                <Link to='/teams' className="dropdown-item">All Teams</Link>
                                <Link to='/myTeams' className="dropdown-item">My Teams</Link>
                            </div>
                        </div>
                    </li>
                    }
                    {isLoggedIn && isAdmin &&
                    <li>
                        <div className="dropdown">
                            <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown">Tasks</a>
                            <div className="dropdown-menu" style={{backgroundColor: '#38015C'}}>
                                <Link to='/tasks' className="dropdown-item">All Tasks</Link>
                                <Link to='/myTasks' className="dropdown-item">My Tasks</Link>
                            </div>
                        </div>
                    </li>
                    }
                    {isLoggedIn && !isAdmin &&
                    <li>
                        <Link to='/tasks'>All tasks</Link>
                    </li>
                    }
                    {isLoggedIn && !isAdmin &&
                    <li>
                        <div className="dropdown">
                            <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown">Profile</a>
                            <div className="dropdown-menu" style={{backgroundColor: '#38015C'}}>
                                <Link to='/myTasks' className="dropdown-item">My Tasks</Link>
                                <Link to='/myTeams' className="dropdown-item">My Teams</Link>
                            </div>
                        </div>
                    </li>
                    }
                    {isLoggedIn &&
                    <li>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;