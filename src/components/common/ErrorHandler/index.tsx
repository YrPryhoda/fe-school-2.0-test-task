import {useNavigate} from 'react-router-dom';
import {Grid, Typography} from '@mui/material';

import styles from './styles.module.scss';
import {routes} from '../../../router/routes';

interface IProps {
    errMessage?: string;
}

export const ErrorHandler = ({errMessage}: IProps) => {
    const navigate = useNavigate();

    const handlerReloadPage = () => {
        navigate(0);
    };

    const handlerPreviousPage = () => {
        navigate(routes.courseList);
    };

    return <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} className={styles.container}>
            <Typography textAlign="center" variant="h4" component="div">
                Sorry, some error occurred.
            </Typography>
            {
                errMessage && <Typography className={styles.error} textAlign="center" variant="body1">
                    {errMessage}
                </Typography>
            }
            <Typography textAlign="center" variant="h6" component="div">
                You may try to
                <span className={styles.link} onClick={handlerReloadPage}>reload page</span>
                or
                <span className={styles.link} onClick={handlerPreviousPage}>return to main page</span>
            </Typography>
        </Grid>
    </Grid>;
};
