import React, {useState, useEffect, Fragment} from "react";
import {Alert, Spinner, Table} from 'react-bootstrap';
import Thead from '../generic-details/Thead';
import Tbody from '../generic-details/Tbody';
import {fetchClickedTaskHandler, fetchTasks} from '../redux/action/Task';
import {useSelector, useDispatch} from 'react-redux';
import Pagination from "../generic-details/pagination/Pagination";
import PageHeader from "../generic-details/PageHeader";
import TaskDetailsModal from "../generic-details/TaskDetailsModal";

const Tasks = () => {
    const tasks = useSelector(state => state.task.tasks)
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(5);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchTasks())
    }, []);

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks && tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (number) => {
        setCurrentPage(number);
    }

    const getClickedItemInfo = (item) => {
        dispatch(fetchClickedTaskHandler(item));
    }

    return (
        <Fragment>
            <PageHeader title='All tasks' iconName='fas fa-tasks'/>
            {
                currentTasks && currentTasks.length !== 0 ?
                    <Fragment>
                        <Table striped hover>
                            <Thead className='text-center' columnNames={['ID', 'TITLE', 'DESCRIPTION']}/>
                            <Tbody items={currentTasks} getClickedItemInfo={getClickedItemInfo}
                                   onHide={() => setShowModal(!showModal)}/>
                        </Table>

                        {tasks.length > tasksPerPage &&
                        <Pagination elementsPerPage={tasksPerPage} totalElements={tasks.length}
                                    paginate={paginate}/>}
                    </Fragment>
                    :
                    tasks && tasks.length === 0 &&
                    <Alert variant='info' className='my-5'>At the moment tasks not exists</Alert>
            }
            <TaskDetailsModal show={showModal} onHide={() => setShowModal(!showModal)} page='ALL_TASKS'/>
        </Fragment>);
};


export default Tasks;