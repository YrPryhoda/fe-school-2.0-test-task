import React from 'react';
import {Rating as MuiRating, Box, Typography} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface IProps {
    value: number;
}

export const Rating = ({value = 0}: IProps) => {
    return <Box sx={{display: 'flex'}}>
        <MuiRating
            name="text-feedback"
            value={value}
            readOnly
            precision={0.5}
            emptyIcon={<StarIcon style={{opacity: 0.4}} fontSize="inherit"/>}
        />
        <Typography variant="subtitle1" ml={1}>{value}</Typography>
    </Box>;
};
