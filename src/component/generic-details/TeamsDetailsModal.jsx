import React, {useState} from 'react';
import {Alert, Button, Table} from "react-bootstrap";
import Tbody from "./Tbody";
import {useSelector} from "react-redux";
import Thead from "./Thead";
import AddTaskToTeamForm from "./forms/AddTaskToTeamForm";
import GenericModal from "./GenericModal";

const TeamsDetailsModal = (props) => {
    const {tasks, users} = useSelector(state => state.team);
    const [taskTableVisible, setTaskTableVisible] = useState(false);
    const [usersTableVisible, setUsersTableVisible] = useState(false);

    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

    const closeAllTablesAndForms = () => {
        setShowAddTaskForm(false);
        setTaskTableVisible(false);
        setUsersTableVisible(false);
    }

    const onGetTasks = () => {
        closeAllTablesAndForms()
        setTaskTableVisible(true);
    }

    const onGetUsers = () => {
        closeAllTablesAndForms()
        setUsersTableVisible(true);
    }


    const onGetAddTaskForm = () => {
        closeAllTablesAndForms()
        setShowAddTaskForm(true)
    }

    const onHideModal = () => {
        closeAllTablesAndForms()
        props.onHide()
    }

    return (
        <GenericModal show={props.show} onHide={onHideModal} title='Team actions'>
                <div className='d-flex justify-content-between'>
                    <Button
                        variant='outline-secondary'
                        className='fw-bold'
                        onClick={onGetTasks}
                    >Show tasks</Button>

                    <Button
                        variant='outline-secondary'
                        className='fw-bold'
                        onClick={onGetUsers}
                    >Show users</Button>

                    <Button
                        variant='outline-secondary'
                        className='fw-bold'
                        onClick={onGetAddTaskForm}
                    >Add task</Button>
                </div>

                {taskTableVisible && tasks && tasks.length !== 0 &&
                    <Table striped hover>
                        <Thead className='text-center' columnNames={['ID', 'Title', 'Description']}/>
                        <Tbody items={tasks}/>
                    </Table>
                }
                {taskTableVisible && tasks && tasks.length === 0 &&
                <Alert variant='info' className='my-2'>No tasks</Alert>
                }


                {usersTableVisible && users && users.length !== 0 &&
                    <Table striped hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.userName}</td>
                        </tr>)}
                        </tbody>
                    </Table>
                }

                {usersTableVisible && users && users.length === 0 &&
                    <Alert variant='info' className='my-2'>No Users</Alert>
                }

                {
                    showAddTaskForm &&
                    <AddTaskToTeamForm id={props.id}/>
                }
        </GenericModal>
    );
};

export default TeamsDetailsModal;