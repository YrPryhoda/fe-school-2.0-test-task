import React from 'react';
import {Grid} from '@mui/material';

import {AppBar} from '../AppBar';
import {Footer} from '../Footer';

import styles from './styles.module.scss';

interface IProps {
    children: React.ReactNode;
}

export const PageLayout = (props: IProps) => {
    return <Grid container spacing={2} className={styles.page}>
        <Grid item xs={12}>
            <AppBar/>
        </Grid>
        <Grid container className={styles.content}>
            {props.children}
        </Grid>
        <Grid item xs={12}>
            <Footer/>
        </Grid>
    </Grid>;
};
