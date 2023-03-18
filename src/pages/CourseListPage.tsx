import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Grid, Typography} from '@mui/material';

import {PageLoadStages} from '../components/common/PageLoadStages';
import {PageLayout} from '../components/common/PageLayout';
import {Pagination} from '../components/Pagination';
import {CourseList} from '../components/CourseList';

import {coursesPerPage} from '../helpers/coursesPerPage';
import {courseService} from '../service/course.service';
import {useFetch} from '../hooks/useFetch';
import {CoursePreview} from '../../types';

export const CourseListPage = () => {
    const {loading, data, error} = useFetch<CoursePreview[]>(courseService.getCourses);
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const [pageItems, setPageItems] = useState<CoursePreview[]>([]);

    useEffect(() => {
        if (data) {
            const forPage = coursesPerPage(data, page, 10);
            setPageItems(forPage);
        }
    }, [page, data, searchParams]);

    if (!data || !data.length) {
        return <PageLoadStages loading={loading} error={error}/>;
    }

    return <PageLayout>
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h4" mb={3} textAlign="center" component="div">
                    Available courses:
                </Typography>
            </Grid>
            <CourseList list={pageItems}/>
            <Grid container justifyContent="center" mt={6}>
                <Pagination totalCount={Math.ceil(data.length / 10)}/>
            </Grid>
        </Grid>
    </PageLayout>;
};

