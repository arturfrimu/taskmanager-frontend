import React, {useContext, useEffect} from 'react';
import {Button} from "react-bootstrap";
import AuthContext from "../../context/auth-context";
import {useDispatch, useSelector} from "react-redux";
import {addTaskToUser, getUserDetailsByUsername} from "../redux/action/User";
import GenericModal from "./GenericModal";

const TaskDetailsModal = (props) => {
    const authCtx = useContext(AuthContext);
    const {userDetail} = useSelector(state => state.user)
    const {clickedTask} = useSelector(state => state.task)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserDetailsByUsername(authCtx.username))
    }, [])

    const takeTaskHandler = async () => {
        const checkIfTaskExists = await userDetail.tasks.find(task => task.id === clickedTask.id);
        if (!checkIfTaskExists) {
            dispatch(addTaskToUser(clickedTask, userDetail.id))
        }
        props.onHide()
    }

    const onHideModal = () => {
        props.onHide()
    }

    return (
        <GenericModal show={props.show} onHide={onHideModal} title='Task actions'>
            <div className='d-flex justify-content-between'>
                {props.page === "ALL_TASKS" &&
                <Button
                    variant='outline-secondary'
                    className='fw-bold'
                    onClick={takeTaskHandler}
                >Take task</Button>
                }
                {props.page === "MY_TASKS" &&
                <Button
                    variant='outline-secondary'
                    className='fw-bold'
                >Mark as completed</Button>
                }
            </div>
        </GenericModal>
    );
};

export default TaskDetailsModal;