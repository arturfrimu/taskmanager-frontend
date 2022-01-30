import React, {Fragment, useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import {store} from './component/redux/Store';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import setAuthorizationToken from './service/AuthorizationTokenService';
import {Provider} from 'react-redux';
import Tasks from './component/task/TasksList';
import Users from './component/user/UsersList';
import Teams from "./component/team/TeamsList";
import Footer from './component/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavigation from "./component/navbar/MainNavigation";
import AuthContext from "./context/auth-context";
import MyTeams from "./component/team/MyTeams";
import MyTasks from "./component/task/MyTasks";
import {getUserDetailsByUsername} from "./component/redux/action/User";
import Auth from "./component/auth/Auth";

const App = () => {
    const authCtx = useContext(AuthContext);
    const isAdmin = authCtx.role === "ADMIN";
    const isLoggedIn = authCtx.isLoggedIn;
    const username = authCtx.username;
    setAuthorizationToken.setAuthorizationToken(localStorage.jwtToken);
    useEffect(()=>{
        getUserDetailsByUsername(username);
    },[username])
    return (
        <Provider store={store}>
            <Router>
                <MainNavigation/>
                <Container>
                    <Switch>
                        <Route path="/tasks">
                            {isLoggedIn && <Tasks/>}
                            {!isLoggedIn && <Redirect to='/auth'/>}
                        </Route>
                        <Route path="/users">
                            {isLoggedIn && isAdmin && <Users/>}
                            {isLoggedIn && !isAdmin && <Redirect to='/myTasks'/>}
                            {!isLoggedIn && <Redirect to='/auth'/>}
                        </Route>
                        <Route path="/teams">
                            {isLoggedIn && isAdmin && <Teams/>}
                            {isLoggedIn && !isAdmin && <MyTeams/>}
                            {!isLoggedIn && <Redirect to='/auth'/>}
                        </Route>
                        <Route path="/myTeams">
                            {isLoggedIn && <MyTeams/>}
                            {!isLoggedIn && <Redirect to='/auth'/>}
                        </Route>
                        <Route path="/myTasks">
                            {isLoggedIn && <MyTasks/>}
                            {!isLoggedIn && <Redirect to='/auth'/>}
                        </Route>
                        <Route path="/auth">
                            {isLoggedIn && <MyTasks/>}
                            {!isLoggedIn && <Auth/>}
                        </Route>
                        <Route path="/">
                            {isLoggedIn && <MyTasks/>}
                            {!isLoggedIn && <Redirect to='/auth'/>}
                        </Route>
                        <Route path="*">
                            {isLoggedIn && <MyTasks/>}
                            {!isLoggedIn && <Redirect to='/auth'/>}
                        </Route>
                    </Switch>
                </Container>
                <Footer/>
            </Router>
        </Provider>
    );

}

export default App;
