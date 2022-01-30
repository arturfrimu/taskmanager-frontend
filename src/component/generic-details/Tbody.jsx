import React from 'react';

const Tbody = ({items, getClickedItemInfo, onHide}) => {
    const itemsValues = [];

    for (let key in items) {
        itemsValues.push(Object.values(items[key]));
    }

    const getClickedItem = (item) => {
        if (getClickedItemInfo) {
            const itemInfo = items.find(({id}) => id === item);
            getClickedItemInfo(itemInfo);
            onHide && onHide();
        }
    }

    return (
        <tbody>
        {
            itemsValues.length !== 0 && itemsValues.map(itemValues =>
                <tr key={itemValues[0]}
                    onClick={() => getClickedItem(itemValues[0])}>
                    {
                        itemValues.map(value => <td className='text-start' key={Math.random()}>{value}</td>)
                    }
                </tr>
            )
        }
        </tbody>
    );
};

export default Tbody;
