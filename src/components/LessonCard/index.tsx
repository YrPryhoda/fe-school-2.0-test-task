import React, {ForwardedRef} from 'react';
import {Card, CardMedia, Typography} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

import styles from './styles.module.scss';
import {Lesson} from '../../../types';

interface IProps {
    lesson: Lesson,
    mode?: 'video' | 'preview';
    fontSize: string;
}

export const LessonCard = React.forwardRef((
    {
        lesson,
        fontSize,
        mode = 'preview'
    }: IProps,
    ref: ForwardedRef<HTMLVideoElement>
) => {
    const isLocked = lesson.status === 'locked';
    const cover = `${lesson.previewImageLink}/lesson-${lesson.order}.webp`;

    return <Card
        key={lesson.id}
        className={styles.lesson}
        sx={{
            backgroundColor: isLocked ? 'grey' : '',
            opacity: isLocked ? 0.7 : 1
        }}
    >
        {isLocked ? <LockIcon className={styles.lesson_lock}/> : null}
        <Typography
            my={1}
            textAlign="center"
            fontSize={fontSize}
            color={isLocked ? "#fff" : "#000"}
            className={styles.lesson__header}>
            {`${lesson.order}. ${lesson.title}`}
        </Typography>
        <div>
            {mode === 'preview' || isLocked
                ? <CardMedia
                    component="img"
                    height="100%"
                    image={cover}
                    sx={{minHeight: '140px'}}
                    alt={lesson.title}
                />
                : <video
                    preload="metadata"
                    ref={ref}
                    width="100%"
                    controls
                    height="100%"
                    className={styles.lesson__video}
                    poster={cover}
                >
                    <source src={process.env['REACT_APP_MOCK_VIDEO']} type="video/mp4"/>
                </video>
            }
        </div>
    </Card>;
});
