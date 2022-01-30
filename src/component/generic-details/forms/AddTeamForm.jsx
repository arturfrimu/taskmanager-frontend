import React from 'react';
import {useDispatch} from "react-redux";
import useInput from "../../../hooks/use-input";
import {inputValidation} from "../../../validation/InputValidator";
import {Button, Form} from "react-bootstrap";
import {createTeam} from "../../redux/action/Team";

const AddTeamForm = (props) => {
    const dispatch = useDispatch();
    const {
        value: name,
        isValid: nameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput
    } = useInput('', inputValidation);

    let formIsValid = false;

    if (nameIsValid) {
        formIsValid = true
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        let team = {
            name
        };

        dispatch(createTeam(team));

        resetNameInput();
    }

    return (
            <Form onSubmit={formSubmissionHandler} autoComplete='off'>
                <h5 className='text-center'>{props.title}</h5>

                <Form.Group controlId='formBasicFirstName' className='my-2'>
                    <input
                        placeholder="Team name"
                        autoComplete="false"
                        name="name"
                        className="form-control"
                        value={name}
                        onChange={nameChangedHandler}
                        onBlur={nameBlurHandler}
                    />
                </Form.Group>

                {nameInputHasError && (
                    <p className='text-danger'>Name must not be empty. (Min 3 symbols)</p>
                )}

                <Form.Group controlId='formBasicActions'>
                    <Button variant='outline-success' disabled={!formIsValid} type='submit'
                            className='w-100 mb-3 fw-bold'>Save</Button>
                </Form.Group>
            </Form>
    );
};

export default AddTeamForm;