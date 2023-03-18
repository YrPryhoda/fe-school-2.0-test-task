import {createBrowserRouter} from 'react-router-dom';

import {CourseDetailsPage} from '../pages/CourseDetailsPage';
import {CourseListPage} from '../pages/CourseListPage';

import {routes} from './routes';

export const router = createBrowserRouter([
    {
        path: routes.courseList,
        element: <CourseListPage/>
    }, {
        path: routes.courseDetails,
        element: <CourseDetailsPage/>
    }

]);
