import {Grid} from '@mui/material';
import styles from './styles.module.scss';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return <Grid container className={styles.footer}>
        <p className={styles.footer__title}>Created for Genesis Academy in {currentYear}</p>
    </Grid>;
};
