import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Alert, Table} from "react-bootstrap";
import Thead from "../generic-details/Thead";
import Tbody from "../generic-details/Tbody";
import Pagination from "../generic-details/pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetailsByUsername} from "../redux/action/User";
import AuthContext from "../../context/auth-context";
import PageHeader from "../generic-details/PageHeader";


const MyTasks = () => {
    const {tasks} = useSelector(state => state.user.userDetail)
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);
    const username = authCtx.username;

    useEffect(() => {
        dispatch(getUserDetailsByUsername(username));
    }, [username]);

    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(5);

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks && tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (number) => {
        setCurrentPage(number);
    }

    return (
        <Fragment>
            <PageHeader title='My tasks' iconName='fas fa-tasks'/>
            {
                tasks && currentTasks.length !== 0 ?
                    <Fragment>

                        <Table striped hover>
                            <Thead className='text-center' columnNames={['ID', 'TITLE', 'DESCRIPTION']}/>
                            <Tbody items={currentTasks}/>
                        </Table>
                        {tasks.length > tasksPerPage &&
                        <Pagination elementsPerPage={tasksPerPage} totalElements={tasks.length} paginate={paginate}/>}
                    </Fragment> :
                    <Alert variant='info' className='my-5'>At the moment you don't have any tasks</Alert>
            }
        </Fragment>
    );
};

export default MyTasks;