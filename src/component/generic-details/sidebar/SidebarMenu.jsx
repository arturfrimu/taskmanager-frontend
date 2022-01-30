import React from 'react';
import classes from './Sidebar.module.css';
import {useSelector} from "react-redux";

const SidebarMenu = () => {
    const {role} = useSelector(state => state.user.user)
    return (
        <div className={classes.menu}>
            <div className={classes.section}>
                <div className={classes.title}>Navigation</div>
                { role && role === 'ADMIN' &&
                    <div className={classes.item}>
                        <a href="/users" className={classes.link}>Users</a>
                    </div>
                }
                <div className={classes.item}>
                    <a href="/tasks" className={classes.link}>Tasks</a>
                </div>
                <div className={classes.item}>
                    <a href="/teams" className={classes.link}>Teams</a>
                </div>
            </div>
            <div className={classes.section}>
                <div className={classes.title}>Auth</div>
                <div className={classes.item}>
                    <a href="/registration" className={classes.link}>Registration</a>
                </div>
                <div className={classes.item}>
                    <a href="/login" className={classes.link}>Login</a>
                </div>
            </div>
        </div>
    );
};
export default SidebarMenu;
