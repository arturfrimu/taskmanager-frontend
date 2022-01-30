import React, {Fragment, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Alert, Table} from "react-bootstrap";
import Thead from "../generic-details/Thead";
import Tbody from "../generic-details/Tbody";
import Pagination from "../generic-details/pagination/Pagination";
import {getUserDetailsByUsername} from "../redux/action/User";
import AuthContext from "../../context/auth-context";
import PageHeader from "../generic-details/PageHeader";
import {fetchTeamTasksHandler, fetchTeamUsersHandler} from "../redux/action/Team";
import TeamsDetailsModal from "../generic-details/TeamsDetailsModal";

const MyTeams = () => {
    const {teams} = useSelector(state => state.user.userDetail)
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);
    const username = authCtx.username;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getUserDetailsByUsername(username));
    }, [username]);

    const [currentPage, setCurrentPage] = useState(1);
    const [teamsPerPage] = useState(5);

    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = teams && teams.slice(indexOfFirstTeam, indexOfLastTeam);

    const paginate = (number) => {
        setCurrentPage(number);
    }

    const getClickedItemInfo = (item) => {
        dispatch(fetchTeamTasksHandler(item.id))
        dispatch(fetchTeamUsersHandler(item.id))
    }

    return (
        <Fragment>
            <PageHeader title='My teams' iconName='fas fa-users'/>
            {
                teams && currentTeams.length !== 0 ?
                    <Fragment>

                        <Table striped hover>
                            <Thead columnNames={['ID', 'NAME']}/>
                            <Tbody items={currentTeams} getClickedItemInfo={getClickedItemInfo}
                                   onHide={() => setShowModal(!showModal)}/>
                        </Table>
                        {teams && teams.length > teamsPerPage &&
                        <Pagination elementsPerPage={teamsPerPage} totalElements={teams.length} paginate={paginate}/>}
                    </Fragment> :
                    <Alert variant='info' className='my-5'>At the moment you don't have a team</Alert>
            }
            <TeamsDetailsModal show={showModal} onHide={() => setShowModal(!showModal)}/>
        </Fragment>
    );
};

export default MyTeams;