import React, {useState, Fragment, useEffect, useContext} from 'react';
import {Button, Card, Table, Alert, Form} from 'react-bootstrap';
import Thead from "../Thead";
import Tbody from "../Tbody";
import UpdateUserForm from "../forms/UpdateUserForm";
import {deleteUserById, updateUserRole} from "../../redux/action/User";
import {useDispatch, useSelector} from "react-redux";
import AddTaskToUserForm from "../forms/AddTaskToUserForm";
import {addUserToTeam, fetchTeams} from "../../redux/action/Team";
import {fetchRoles} from "../../redux/action/Role";
import AuthContext from "../../../context/auth-context";

const UserCard = ({onHide}) => {
        const dispatch = useDispatch();
        const {id, firstName, lastName, userName, tasks, teams, role} = useSelector(state => state.user.userDetail)
        const allTeams = useSelector(state => state.team.teams);
        const roles = useSelector(state => state.role.roles);
        const currentUser = useSelector(state => state.user.user)
        const [bodyData, setBodyData] = useState([]);
        const [headData, setHeadData] = useState([]);
        const [alert, setAlert] = useState('');
        const [showBodyData, setShowBodyData] = useState(false);
        const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
        const [showAddTaskForm, setShowAddTaskForm] = useState(false);

        const authCtx = useContext(AuthContext);
        const isAdmin = authCtx.role === "ADMIN";
        const isLoggedIn = authCtx.isLoggedIn;

        useEffect(() => {
            isLoggedIn && isAdmin && dispatch(fetchRoles());
            isLoggedIn && isAdmin && dispatch(fetchTeams());
        }, [])

        const toggleTasks = () => {
            clear();
            setShowBodyData(true)
            setBodyData(tasks)
            setHeadData(['ID', 'TITLE', 'DESCRIPTION'])
            tasks.length === 0 && setAlert("User don't have tasks")
        }

        const toggleTeams = () => {
            clear();
            setShowBodyData(true)
            setBodyData(teams)
            setHeadData(['ID', 'NAME'])
            teams.length === 0 && setAlert("User don't have a team")
        }

        const toggleAuthorities = () => {
            clear();
            setShowBodyData(true)
            setBodyData(role.authorities)
            setHeadData(['AUTHORITIES'])
            role.authorities.length === 0 && setAlert("User don't have authorities")
        }

        const toggleUpdateUserForm = () => {
            clear();
            setShowUpdateUserForm(!showUpdateUserForm)
        }

        const toggleAddTaskForm = () => {
            clear();
            setShowAddTaskForm(!showAddTaskForm)
        }

        const clear = () => {
            setShowBodyData(false)
            setShowUpdateUserForm(false)
            setShowAddTaskForm(false);
            setAlert('');
        }

        const onChangeDetail = (event) => {
            const target = event.target.value;
            target === 'CLEAR' && clear();
            target === 'TASKS' && toggleTasks();
            target === 'TEAMS' && toggleTeams()
            target === 'AUTHORITIES' && toggleAuthorities();
        }

        const onChangeRole = (event) => {
            const target = event.target.value
            if (!event.target.value)
                return;
            // eslint-disable-next-line no-restricted-globals
            const conf = confirm("Are you sure to change the role to " + target);
            if (!conf)
                return;
            dispatch(updateUserRole(id, {name: target}));
        }

        //TODO: add dispatch method insertUserIntoTeam
        const onChangeTeam = (event) => {
            const target = event.target.value
            if (!event.target.value)
                return;
            // eslint-disable-next-line no-restricted-globals
            const conf = confirm("Are you sure to add user to the team " + target);
            if (!conf)
                return;
            const user = {id};
            dispatch(addUserToTeam(user, target));
        }

        const deleteById = () => {
            if (currentUser.username === userName)
                return;
            // eslint-disable-next-line no-restricted-globals
            const resOk = confirm("Are you sure to delete user by username: " + userName + "?");
            if (resOk) {
                dispatch(deleteUserById(id));
                clear();
                onHide();
            }
        }

        const cardClassName = (
            showBodyData
            || showUpdateUserForm
            || showAddTaskForm
        ) ? 'p-3 pb-0 my-3' : 'border-0'

        return (
            <Fragment>
                <div className='d-flex justify-content-between border-bottom border-secondary mb-3 pt-0'>
                    <h2>{firstName + " " + lastName}</h2>
                    <h4 className='align-self-end'>Role: {role?.name}</h4>
                </div>
                <div className='d-flex justify-content-center'>
                    <Button variant='outline-secondary fw-bold w-100 mx-1'
                            onClick={toggleUpdateUserForm} disabled={!isAdmin}>Update</Button>
                    <Button variant='outline-secondary fw-bold w-100'
                            onClick={toggleAddTaskForm}>Add task</Button>
                </div>
                <Card className='p-3 my-3'>
                    <div className='d-flex justify-content-between flex-wrap'>
                        <div className='w-50 mb-3'>
                            <Form.Label>Select details</Form.Label>
                            <Form.Control
                                as="select" custom='true'
                                onChange={onChangeDetail}
                            >
                                <option value="CLEAR">Details</option>
                                <option value="TASKS">Tasks</option>
                                <option value="TEAMS">Teams</option>
                                <option value="AUTHORITIES">Authorities</option>
                            </Form.Control>
                        </div>
                        <div className='w-50 mb-3'>
                            <Form.Label>Change Role</Form.Label>
                            <Form.Control
                                as="select" custom='true'
                                onChange={onChangeRole}
                                disabled={!isAdmin}
                            >
                                <option value=''>Role</option>
                                {roles && roles.length !== 0 && roles.map(obj => <option key={obj.id}
                                                                                         value={obj.name}>{obj.name}</option>)}
                            </Form.Control>
                        </div>
                        <div className='w-100 mb-3'>
                            <Form.Label className=''>Add to a team</Form.Label>
                            <Form.Control
                                as="select" custom='true'
                                onChange={onChangeTeam}
                            >
                                <option value="">Teams</option>
                                {allTeams && allTeams.length !== 0 && allTeams.map(obj => <option key={obj.id}
                                                                                                  value={obj.name}>{obj.name}</option>)}
                            </Form.Control>
                        </div>
                    </div>
                </Card>
                <Card className={cardClassName}>
                    {
                        showBodyData && bodyData.length !== 0 &&
                        <Table striped hover>
                            <Thead className='text-center' columnNames={headData}/>
                            <Tbody items={bodyData}/>
                        </Table>
                    }
                    {
                        alert && <Alert variant='warning' className='text-danger'>{alert}</Alert>
                    }
                    {showAddTaskForm && <AddTaskToUserForm title='' id={id}/>}
                    {showUpdateUserForm && <UpdateUserForm onHide={onHide}/>}
                </Card>
                <Button variant='outline-danger fw-bold' onClick={deleteById}
                        className='w-100'>Delete</Button>
            </Fragment>
        );
    }
;

export default UserCard;