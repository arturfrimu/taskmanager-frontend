export const pageValidation = (list, currentPage, usersPerPage) => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    let currentUsers = list && list.slice(indexOfFirstUser, indexOfLastUser);
    return currentUsers;
}

