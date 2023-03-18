import React, {useRef, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

import {BaseList} from '../common/BaseList';
import {Rating} from '../common/Rating';

import {dateFormatter} from '../../helpers/dateFormatter';
import {CoursePreview} from '../../../types';
import {routes} from '../../router/routes';
import styles from './styles.module.scss';

interface IProps {
    item: CoursePreview;
}

export const CoursePreviewCard = ({item}: IProps) => {
    const [showDetails, setShowDetails] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const previewVideoRef = useRef<HTMLVideoElement>(null);

    const handlerOnHover = () => {
        setShowDetails(true);
        setIsPreview(true);
        previewVideoRef.current?.play();
    };

    const handlerOnLeave = () => {
        setIsPreview(false);
        setShowDetails(false);
        previewVideoRef.current?.pause();
    };

    return (
        <Card
            className={styles.card}
            onMouseEnter={handlerOnHover}
            onMouseLeave={handlerOnLeave}
        >
            <div className={styles.card__media}>
                <video
                    preload="metadata"
                    ref={previewVideoRef}
                    className={`${styles.card__video} ${!isPreview ? styles.card_hidden : ''}`}
                    muted
                    loop
                >
                    <source src={process.env['REACT_APP_MOCK_VIDEO']} type="video/mp4"/>
                </video>

                <CardMedia
                    component="img"
                    className={`${styles.card__img} ${isPreview ? styles.card_hidden : ''}`}
                    alt={item.title}
                    image={`${item.previewImageLink}/cover.webp`}
                />
            </div>
            <CardContent className={styles.card__content}>
                <Typography gutterBottom variant="h5" component="div" className={styles.card__title}>
                    {item.title}
                </Typography>
                <Typography align="justify" variant="body2" color="text.secondary">
                    {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Includes lesson(s): <strong>{item.lessonsCount}</strong>
                </Typography>
                <Typography sx={{display: 'flex', justifyContent: 'flex-end'}} component="div" variant="body2"
                            color="text.secondary">
                    <Rating value={item.rating}/>
                </Typography>
                <Typography sx={{display: 'flex', justifyContent: 'flex-end'}} component="div" variant="body2"
                            color="text.secondary">
                    {dateFormatter(item.launchDate)}
                </Typography>

                <CardActions sx={{justifyContent: 'center'}}>
                    <NavLink to={`${routes.courseDetailsLink}/${item.id}`}>
                        <Button variant="outlined" size="small"> Show Details</Button>
                    </NavLink>
                </CardActions>
                {showDetails && item.meta.skills?.length &&
                    <Typography className={styles.card__details} variant="body2" component="div" color="text.secondary">
                        <Typography variant="subtitle1" ml={3} component="div" sx={{backgroundColor: 'inherit'}}>
                            It helps you with:
                        </Typography>
                        <BaseList itemsArr={item.meta.skills} icon={<DoneIcon/>}/>
                    </Typography>}
            </CardContent>
        </Card>
    );
};
