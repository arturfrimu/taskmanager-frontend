import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import useInput from "../../../hooks/use-input";
import {Button, Form} from "react-bootstrap";
import {createUser} from "../../redux/action/User";
import {useDispatch} from "react-redux";
import {inputValidation} from "../../../validation/InputValidator";

const AddUserForm = (props) => {
    const dispatch = useDispatch();
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        valueChangeHandler: firstNameChangedHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstNameInput
    } = useInput('', inputValidation);

    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid,
        hasError: lastNameInputHasError,
        valueChangeHandler: lastNameChangedHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastNameInput
    } = useInput('', inputValidation);

    const {
        value: enteredUserName,
        isValid: enteredUserNameIsValid,
        hasError: userNameInputHasError,
        valueChangeHandler: userNameChangedHandler,
        inputBlurHandler: userNameBlurHandler,
        reset: resetUserNameInput
    } = useInput('', inputValidation);

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
    } = useInput('', inputValidation);

    let formIsValid = false;

    if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredUserNameIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        let user = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            userName: enteredUserName,
            password: enteredPassword,
            role: {id: 1, name: 'USER'},
            status: {id: 1, name: 'ACTIVE'}
        };

        dispatch(createUser(user));

        resetFirstNameInput();
        resetLastNameInput();
        resetUserNameInput();
        resetPasswordInput();
    }
    return (

            <Form onSubmit={formSubmissionHandler} autoComplete='off'>
                <input type="hidden" autoComplete='false'/>
                <Form.Group controlId='formBasicFirstName' className='my-2'>
                    <input
                        placeholder="First name"
                        autoComplete="false"
                        name="firstName"
                        className="form-control"
                        value={enteredFirstName}
                        onChange={firstNameChangedHandler}
                        onBlur={firstNameBlurHandler}
                    />
                </Form.Group>

                {firstNameInputHasError && (
                    <p className='text-danger'>First name must not be empty. (Min 3 symbols)</p>
                )}

                <Form.Group controlId='formBasicLastName' className='my-2'>
                    <input
                        placeholder="Last name"
                        autoComplete="false"
                        name="lastName"
                        className="form-control"
                        value={enteredLastName}
                        onChange={lastNameChangedHandler}
                        onBlur={lastNameBlurHandler}
                    />
                </Form.Group>

                {lastNameInputHasError && (
                    <p className='text-danger'>Last name must not be empty. (Min 3 symbols)</p>
                )}

                <Form.Group controlId='formBasicUserName' className='my-2'>
                    <input
                        placeholder="Username"
                        autoComplete="false"
                        name="userName"
                        className="form-control"
                        value={enteredUserName}
                        onChange={userNameChangedHandler}
                        onBlur={userNameBlurHandler}
                    />
                </Form.Group>

                {userNameInputHasError && (
                    <p className='text-danger'>Username must not be empty. (Min 3 symbols)</p>
                )}

                <Form.Group controlId='formBasicPassword' className='my-2'>
                    <input
                        placeholder="Password"
                        autoComplete="false"
                        name="password"
                        className="form-control"
                        value={enteredPassword}
                        type='password'
                        onChange={passwordChangedHandler}
                        onBlur={passwordBlurHandler}
                    />
                </Form.Group>

                {passwordInputHasError && (
                    <p className='text-danger'>Password must not be empty. (Min 3 symbols)</p>
                )}

                <Form.Group controlId='formBasicActions' className='my-2'>
                    <Button variant='success' disabled={!formIsValid} type='submit'><b>{props.buttonTitle}</b></Button>
                </Form.Group>
                <Link to="/login">
                    {props.linkTitle && props.linkTitle}
                </Link>
            </Form>

    );
};

export default AddUserForm;