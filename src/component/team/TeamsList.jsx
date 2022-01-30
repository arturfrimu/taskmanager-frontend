import React, {Fragment, useEffect, useState} from "react";
import {Alert, Button, Table} from 'react-bootstrap';
import Thead from '../generic-details/Thead';
import Tbody from '../generic-details/Tbody';
import {fetchTeamTasksHandler, fetchTeams, fetchTeamUsersHandler} from '../redux/action/Team';
import {useSelector, useDispatch} from 'react-redux';
import Pagination from "../generic-details/pagination/Pagination";
import TeamsDetailsModal from "../generic-details/TeamsDetailsModal";
import PageHeader from "../generic-details/PageHeader";
import AddTeamForm from "../generic-details/forms/AddTeamForm";

const Teams = () => {
    const teams = useSelector(state => state.team.teams)
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [teamsPerPage] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [showAddTeamForm, setShowAddTeamForm] = useState(false);
    const [clickedTeamID, setClickedTeamID] = useState(0);

    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = teams && teams.slice(indexOfFirstTeam, indexOfLastTeam);

    const paginate = (number) => {
        setCurrentPage(number);
    }

    useEffect(() => {
        dispatch(fetchTeams())
    }, []);

    const getClickedItemInfo = (item) => {
        setClickedTeamID(item.id)
        dispatch(fetchTeamTasksHandler(item.id))
        dispatch(fetchTeamUsersHandler(item.id))
        setShowModal(!showModal)
    }

    const onGetAddTeamForm = () => {
        setShowAddTeamForm(!showAddTeamForm)
    }

    return (
        <Fragment>
            <PageHeader title='All teams' iconName='fas fa-users'/>


            <Fragment>
                <div className='d-flex justify-content-end my-2'>

                    <Button
                        variant='outline-secondary'
                        className='fw-bold'
                        onClick={onGetAddTeamForm}
                    >Create team</Button>

                </div>
                {
                    showAddTeamForm &&
                    <div className='d-flex justify-content-end'>
                        <AddTeamForm/>
                    </div>
                }
            </Fragment>

            {
                currentTeams.length !== 0 ?
                    <Fragment>
                        <Table striped hover>
                            <Thead columnNames={['ID', 'NAME']}/>
                            <Tbody items={currentTeams} getClickedItemInfo={getClickedItemInfo}
                                   onHide={() => setShowModal(!showModal)}/>
                        </Table>
                        {teams && teams.length > teamsPerPage &&
                        <Pagination elementsPerPage={teamsPerPage} totalElements={teams.length} paginate={paginate}/>}
                    </Fragment> :
                    <Alert variant='info' className='my-5'>Team table is empty !!</Alert>
            }
            <TeamsDetailsModal show={showModal} onHide={() => setShowModal(!showModal)} id={clickedTeamID}/>
        </Fragment>

    );
};
export default Teams;