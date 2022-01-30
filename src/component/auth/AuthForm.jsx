import React, {useContext} from "react";
import {useState} from 'react';
import classes from './Auth.module.css';
import useInput from "../../hooks/use-input";
import {inputValidation} from "../../validation/InputValidator";
import {useHistory} from "react-router-dom";
import {auth, LOGIN_URL, REGISTRATION_URL} from "../redux/action/User";
import {Form, Spinner} from "react-bootstrap";
import AuthContext from "../../context/auth-context";

const AuthForm = () => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const {
        value: enteredFirstName,
        valueChangeHandler: firstNameChangedHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstNameInput
    } = useInput('', inputValidation);

    const {
        value: enteredLastName,
        valueChangeHandler: lastNameChangedHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastNameInput
    } = useInput('', inputValidation);

    const {
        value: enteredUserName,
        valueChangeHandler: userNameChangedHandler,
        inputBlurHandler: userNameBlurHandler,
        reset: resetUserNameInput
    } = useInput('', inputValidation);

    const {
        value: enteredPassword,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
    } = useInput('', inputValidation);

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const logUser = {
            username: enteredUserName,
            password: enteredPassword
        }
        const regUser = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            userName: enteredUserName,
            password: enteredPassword,
            role: {id: 1, name: 'USER'},
            status: {id: 1, name: 'ACTIVE'}
        };
        setIsLoading(true);

        if (isLogin) {
            await auth(logUser, LOGIN_URL, authCtx, history)
            setIsLoading(false)
        } else {
            await auth(regUser, REGISTRATION_URL, authCtx, history)

            setIsLoading(false);
            setIsLogin(true)
        }

        resetFirstNameInput();
        resetLastNameInput();
        resetUserNameInput();
        resetPasswordInput();
    }

    return (
        <div className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <Form onSubmit={submitHandler} autoComplete='off'>
                {!isLogin &&
                <div>
                    <Form.Group>
                        <label className={classes.control_label}
                               htmlFor='firstName'>Your first name</label>
                        <input
                            className="form-control"
                            value={enteredFirstName}
                            onChange={firstNameChangedHandler}
                            onBlur={firstNameBlurHandler}
                            name='firstName'
                            type='text'
                            id='firstName'
                            minLength='3'
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <label className={classes.control_label}
                               htmlFor='lastName'>Your last name</label>
                        <input
                            className="form-control"
                            value={enteredLastName}
                            onChange={lastNameChangedHandler}
                            onBlur={lastNameBlurHandler}
                            name='lastName'
                            type='text'
                            id='lastName'
                            minLength='3'
                            required
                        />
                    </Form.Group>

                </div>
                }

                <Form.Group>
                    <label className={classes.control_label}
                           htmlFor='userName'>Your username</label>
                    <input
                        className="form-control"
                        value={enteredUserName}
                        onChange={userNameChangedHandler}
                        onBlur={userNameBlurHandler}
                        name='userName'
                        type='text'
                        id='userName'
                        minLength='3'
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <label className={classes.control_label}
                           htmlFor='password'>Your password</label>
                    <input
                        className="form-control"
                        value={enteredPassword}
                        onChange={passwordChangedHandler}
                        onBlur={passwordBlurHandler}
                        name='password'
                        type='password'
                        id='password'
                        minLength='3'
                        required
                    />
                </Form.Group>

                <div className={classes.actions}>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading &&
                    <Spinner animation="border" role="status" style={{color: '#38015C'}}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </Form>
        </div>
    );
};


export default AuthForm;