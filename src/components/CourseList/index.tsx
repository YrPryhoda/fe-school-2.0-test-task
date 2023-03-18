import {Grid, Typography} from '@mui/material';

import {CoursePreviewCard} from '../CoursePreviewCard';
import {CoursePreview} from '../../../types';

interface IProps {
    list: CoursePreview[];
}

export const CourseList = ({list}: IProps) => {
    return <Grid container spacing={4} sx={{overflow: 'visible'}}>
        {
            list.length ?
                list.map(item => <Grid sx={{overflow: 'visible'}} key={item.id} item xl={3} md={4} sm={6} xs={12}>
                    <CoursePreviewCard item={item}/>
                </Grid>)
                : <Grid item xs={12}>
                    <Typography textAlign="center" variant="h6">
                        No data found
                    </Typography>
                </Grid>
        }
    </Grid>;
};
