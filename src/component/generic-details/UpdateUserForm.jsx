import React, {Fragment} from 'react';
import {Button, Form} from "react-bootstrap";
import useInput from "../hooks/use-input";
import {inputValidation} from "../../validation/InputValidator";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../redux/action/User";

const UpdateUserForm = () => {
        const {id, firstName, lastName, userName} = useSelector(state => state.user.userDetail)
        const dispatch = useDispatch();
        const {
            value: enteredFirstName,
            isValid: enteredFirstNameIsValid,
            hasError: firstNameInputHasError,
            valueChangeHandler: firstNameChangedHandler,
            inputBlurHandler: firstNameBlurHandler,
            reset: resetFirstNameInput
        } = useInput(firstName, inputValidation);

        const {
            value: enteredLastName,
            isValid: enteredLastNameIsValid,
            hasError: lastNameInputHasError,
            valueChangeHandler: lastNameChangedHandler,
            inputBlurHandler: lastNameBlurHandler,
            reset: resetLastNameInput
        } = useInput(lastName, inputValidation);

        const {
            value: enteredUserName,
            isValid: enteredUserNameIsValid,
            hasError: userNameInputHasError,
            valueChangeHandler: userNameChangedHandler,
            inputBlurHandler: userNameBlurHandler,
            reset: resetUserNameInput
        } = useInput(userName, inputValidation);

        let formIsValid = false;

        if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredUserNameIsValid) {
            formIsValid = true;
        }

        const formSubmissionHandler = async (event) => {
            event.preventDefault()
            if (!enteredFirstName || !enteredLastName || !enteredUserNameIsValid) {
                return;
            }

            let user = {
                id: id,
                firstName: enteredFirstName,
                lastName: enteredLastName,
                userName: enteredUserName,
                status: {id: 1},
                role: {id: 1},
            };

            await dispatch(updateUser(user));

            resetFirstNameInput();
            resetLastNameInput();
            resetUserNameInput();

        }
        return (
            <Fragment>
                <h2>Update user</h2>
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
                            placeholder=''
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

                    <Form.Group controlId='formBasicActions' className='my-2'>
                        <Button variant='success' disabled={!formIsValid} type='submit'><b>Submit</b></Button>
                    </Form.Group>
                </Form>
            </Fragment>
        );
    }
;

export default UpdateUserForm;