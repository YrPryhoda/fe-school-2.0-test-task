import {useEffect, useRef, useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {Grid, Typography} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

import {PageLoadStages} from '../components/common/PageLoadStages';
import {PageLayout} from '../components/common/PageLayout';
import {BaseList} from '../components/common/BaseList';
import {LessonsList} from '../components/LessonsList';
import {LessonCard} from '../components/LessonCard';
import {Rating} from '../components/common/Rating';

import {storageService} from '../service/storage.service';
import {courseService} from '../service/course.service';
import {dateFormatter} from '../helpers/dateFormatter';
import {useFetch} from '../hooks/useFetch';
import {CourseDetails, Lesson} from '../../types';


export const CourseDetailsPage = () => {
    const {courseId} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const videoRef = useRef<HTMLVideoElement>(null);

    const {
        loading,
        data,
        error
    } = useFetch<CourseDetails>(courseService.getCourse.bind(null, `${courseId}`));
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

    const handlerChangeLesson = (id: string) => {
        const lesson = data!.lessons.find(el => el.id === id);
        if (!lesson) {
            return;
        }

        storageService.setItem(`${courseId}`, id);
        setCurrentLesson(lesson);
        setSearchParams({lesson: id});
    };

    useEffect(() => {
        if (data) {
            data.lessons.sort((a, b) => a.order - b.order);
            const lessonId = searchParams.get('lesson') || storageService.getItem(data.id);
            const lesson = data.lessons.find(el => el.id === lessonId);
            setCurrentLesson(lesson ?? data.lessons[0]);
        }
    }, [data, searchParams]);

    useEffect(() => {
        const ref = videoRef.current;

        if (currentLesson) {
            const currentVideoTime = Number(storageService.getItem(currentLesson.id));
            ref && currentVideoTime && (ref.currentTime = currentVideoTime);
        }

        return () => {
            const time = ref?.currentTime;
            if (time) {
                storageService.setItem(currentLesson!.id, time.toString());
            }
        };
    }, [currentLesson]);

    if (!data || !currentLesson) {
        return <PageLoadStages loading={loading} error={error}/>;
    }

    return <PageLayout>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography textAlign="center" variant="h4" my={5}>
                    {data.title}
                </Typography>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
                <LessonCard
                    lesson={currentLesson}
                    fontSize={'26px'}
                    mode="video"
                    ref={videoRef}
                />
                <Grid container justifyContent="space-between" my={3}>
                    <Rating value={data.rating}/>
                    <span>Last updated: {dateFormatter(data.launchDate)}</span>
                </Grid>
                <Grid item>
                    <Typography textAlign="justify" component="div" variant="body1">
                        <h3>About this course:</h3>
                        {data.description}
                    </Typography>
                </Grid>
                <Grid item>
                    <h3>By the end of this course you will develop:</h3>
                    {
                        data.meta.skills?.length
                            ? <BaseList itemsArr={data.meta.skills} icon={<DoneIcon/>}/>
                            : <p> Information not found or not provided</p>
                    }

                </Grid>
            </Grid>
            <Grid item xs={12} md={4} lg={3} sx={{maxHeight: '820px', overflow: 'auto'}}>
                <LessonsList
                    lessons={data.lessons}
                    onClick={handlerChangeLesson}
                />
            </Grid>
        </Grid>
    </PageLayout>;
};
