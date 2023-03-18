import React from 'react';
import {ListItem, ListItemIcon, ListItemText, List} from '@mui/material';

interface IProps {
    icon?: React.ReactNode;
    itemsArr: string[];
}

export const BaseList = ({icon, itemsArr = []}: IProps) => {
    return <List>
        {itemsArr
            .map(title => (
                <ListItem key={title} dense={true} sx={{backgroundColor: 'inherit'}}>
                    {icon ?
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        : null}
                    <ListItemText primary={title}/>
                </ListItem>
            ))}
    </List>;
};
