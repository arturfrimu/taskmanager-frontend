import React from 'react';

const PageHeader = (props) => {
    return (
        <div
            className='text-center border-bottom border-secondary py-1 fw-bold d-flex justify-content-between align-items-center'>
            <h2>{props.title}</h2>
            {props.children}
            <i className={props.iconName} style={{fontSize: '30px'}}/>
        </div>
    );
};

export default PageHeader;