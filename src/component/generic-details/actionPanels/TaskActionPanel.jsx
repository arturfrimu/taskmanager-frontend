import React from 'react';
import {Button} from "react-bootstrap";

const TaskActionPanel = () => {
    return (
        <div className='p-2 mt-2'>
            <div className='d-flex'>
                <div className='w-50'/>
                <div className='w-50'>
                    <Button>Add</Button>
                    <Button/>
                </div>
            </div>
        </div>
    );
};

export default TaskActionPanel;