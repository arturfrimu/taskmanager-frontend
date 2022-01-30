import React, {Fragment} from 'react';
import useInput from "../../../hooks/use-input";
import {inputValidation} from "../../../validation/InputValidator";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form} from "react-bootstrap";
import {addTaskToUser} from "../../redux/action/User";

const AddTaskToUserForm = (props) => {
    const dispatch = useDispatch();
    const {id} = useSelector(state => state.user.userDetail)
    const {
        value: title,
        isValid: titleIsValid,
        hasError: titleInputHasError,
        valueChangeHandler: titleChangedHandler,
        inputBlurHandler: titleBlurHandler,
        reset: resetTitleInput
    } = useInput('', inputValidation);

    const {
        value: description,
        isValid: descriptionIsValid,
        hasError: descriptionInputHasError,
        valueChangeHandler: descriptionChangedHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: resetDescriptionInput
    } = useInput('', inputValidation);


    let formIsValid = false;

    if (titleIsValid && descriptionIsValid) {
        formIsValid = true
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        let task = {
            title,
            description
        };

        dispatch(addTaskToUser(task, id));


        resetTitleInput();
        resetDescriptionInput();
    }

    return (
        <Fragment>
            <Form onSubmit={formSubmissionHandler} autoComplete='off'>
                <input type="hidden" autoComplete='false'/>

                <Form.Group controlId='formBasicFirstName' className='my-2'>
                    <input
                        placeholder="Title"
                        autoComplete="false"
                        name="title"
                        className="form-control"
                        value={title}
                        onChange={titleChangedHandler}
                        onBlur={titleBlurHandler}
                    />
                </Form.Group>

                {titleInputHasError && (
                    <p className='text-danger'>Title must not be empty. (Min 3 symbols)</p>
                )}

                <input type="hidden" autoComplete='false'/>
                <Form.Group controlId='formBasicFirstName' className='my-2'>
                    <input
                        placeholder="Description"
                        autoComplete="false"
                        name="description"
                        className="form-control"
                        value={description}
                        onChange={descriptionChangedHandler}
                        onBlur={descriptionBlurHandler}
                    />
                </Form.Group>

                {descriptionInputHasError && (
                    <p className='text-danger'>Description must not be empty. (Min 3 symbols)</p>
                )}

                <Form.Group controlId='formBasicActions'>
                    <Button variant='outline-secondary' disabled={!formIsValid} type='submit'
                            className='w-100 mb-3 fw-bold'>Save</Button>
                </Form.Group>
            </Form>
        </Fragment>
    );
};

export default AddTaskToUserForm;