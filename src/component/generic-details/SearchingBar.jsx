import React from 'react';
import useInput from "../../hooks/use-input";
import {Button} from "react-bootstrap";

const SearchingBar = ({onSearch, onReset}) => {

    const {
        value: searchTerm,
        valueChangeHandler: searchTermChangedHandler,
        isValid: searchTermIsValid,
        reset: resetSearchTerm
    } = useInput('', (value) => value !== '');

    const onResetHandler = () => {
        onReset();
        resetSearchTerm();
    }

    return (
        <div className='d-flex'>
            <div className="input-group">
                <div className="form-outline">
                    <input type="search"
                           className="form-control"
                           placeholder='Search'
                           value={searchTerm}
                           onChange={searchTermChangedHandler}
                           required/>
                </div>
                <Button type="button" variant='primary' disabled={!searchTermIsValid}
                        onClick={() => onSearch(searchTerm)}>
                    <i className="fas fa-search"/>
                </Button>
                <Button type="button" variant='primary'
                        onClick={() => onResetHandler()}>
                    <i className="fas fa-sync-alt"/>
                </Button>
            </div>
        </div>
    );
};

export default SearchingBar;