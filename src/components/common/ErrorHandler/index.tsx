import {useNavigate} from 'react-router-dom';
import {Grid, Typography} from '@mui/material';

import styles from './styles.module.scss';

interface IProps {
    errMessage?: string;
}

export const ErrorHandler = ({errMessage}: IProps) => {
    const navigate = useNavigate();

    const handlerReloadPage = () => {
        navigate(0);
    };

    const handlerPreviousPage = () => {
        navigate(-1);
    };

    return <Grid item xs={12} justifyContent="center" alignItems="center">
        <Typography textAlign="center" variant="h4" component="div">
            Sorry, some error occurred.
        </Typography>
        {
            errMessage && <Typography textAlign="center" variant="body1" component="div">
                {errMessage}
            </Typography>
        }
        <Typography textAlign="center" variant="body1" component="div">
            You may try to
            <span className={styles.link} onClick={handlerReloadPage}>reload page</span>
            or
            <span className={styles.link} onClick={handlerPreviousPage}>return to previous page</span>
        </Typography>
    </Grid>;
};
