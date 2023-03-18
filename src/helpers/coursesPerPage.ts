import {CoursePreview} from '../../types';

export const coursesPerPage = (listArr: CoursePreview[], page = 1, count = 10) => {
    const from = (page - 1) * count;
    const to = from + count;
    return listArr
        .sort((a, b) => {
            return new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime();
        })
        .slice(from, to);
};
