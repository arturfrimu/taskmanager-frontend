import React from 'react';

const Thead = ({columnNames, className}) => {
    return (
        <thead className={className}>
        <tr>
            {columnNames && columnNames.map(item => <th style={{minWidth: '70px'}} key={item}>{item}</th>)}
        </tr>
        </thead>
    );
};

export default Thead;