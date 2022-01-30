import React, {useState, useEffect, Fragment} from "react";
import Thead from '../generic-details/Thead';
import Tbody from '../generic-details/Tbody';
import {Modal, Table} from 'react-bootstrap';
import {getUserDetailsById, fetchUsers, searchUserHandler} from '../redux/action/User';
import {useSelector, useDispatch} from 'react-redux';
import UserCard from "../generic-details/userCard/UserCard";
import GenericModal from "../generic-details/GenericModal";
import Pagination from "../generic-details/pagination/Pagination";
import PageHeader from "../generic-details/PageHeader";
import SearchingBar from "../generic-details/SearchingBar";
import {pageValidation} from "../../validation/pageValidation";

const Users = () => {
    const {users, searchedUsers} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

    let currentUsers = pageValidation(users, currentPage, usersPerPage);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(searchUserHandler(null))
        pageValidation(users, currentPage, usersPerPage);
    }, []);

    useEffect(() => {
        dispatch(fetchUsers());
        pageValidation(searchedUsers, currentPage, usersPerPage);
        console.log("USE EFFECT")
    }, [currentPage]);

    const setCurrentUsers = () => {
        currentUsers = pageValidation(users, currentPage, usersPerPage);
        users && dispatch(searchUserHandler(users))
    }

    const paginate = (number) => {
        setCurrentPage(number);
    }

    const onHideModal = () => {
        setShowModal(!showModal)
        dispatch(fetchUsers());
    }

    const getClickedItemInfo = (item) => {
        dispatch(getUserDetailsById(item.id))
    }

    if (searchedUsers && searchedUsers.length !== 0) {
        currentUsers = pageValidation(searchedUsers, currentPage, usersPerPage);
    }

    const searchUsersHandler = (userName) => {
        const searchedUsers = users && users.filter(user => ((user.userName).toLowerCase()).startsWith((userName).toLowerCase()));
        if (searchedUsers && searchedUsers.length !== 0) {
            currentUsers = pageValidation(searchedUsers, currentPage, usersPerPage);
            dispatch(searchUserHandler(searchedUsers))
        } else {
            alert(`User by username ${userName} not found`)
            setCurrentUsers();
        }
        pageValidation(searchedUsers, currentPage, usersPerPage);
        paginate(1);
    }

    return (
        <Fragment>
            <PageHeader title='All users' iconName='fas fa-users'>
                {users && users.length !== 0 && <SearchingBar onReset={setCurrentUsers} onSearch={searchUsersHandler}/>}
            </PageHeader>
            {
                users && users.length !== 0 &&
                <Fragment>
                    <Table striped hover>
                        <Thead columnNames={['ID', 'FIRST_NAME', 'LAST_NAME', 'USER_NAME']}/>
                        {
                            <Tbody
                                items={currentUsers} getClickedItemInfo={getClickedItemInfo}
                                onHide={() => setShowModal(!showModal)}
                            />
                        }
                    </Table>
                    {users.length > usersPerPage &&
                    <Pagination
                        elementsPerPage={usersPerPage}
                        totalElements={searchedUsers ? searchedUsers.length : users.length}
                        paginate={paginate}/>}
                </Fragment>
            }
            {
                <GenericModal show={showModal} onHide={onHideModal} title={'USER DETAILS'}>
                    <Modal.Body>
                        <UserCard onHide={() => setShowModal(!showModal)}/>
                    </Modal.Body>
                </GenericModal>
            }
        </Fragment>);
};


export default Users;