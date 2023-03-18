import {logs} from '../helpers/logger';
import {CourseDetails, CoursePreview} from '../../types';

class CourseService {
    private readonly env = process.env;
    private readonly BASE_URI = `${this.env['REACT_APP_HOST']}/${this.env['REACT_APP_V']}`;

    baseFetch = async (endpoint: string) => {
        const response = await fetch(
            endpoint, {
                headers: {
                    Authorization: `${this.env['REACT_APP_TOKEN']}`
                }
            });

        if (!response.ok) {
            throw Error(`Failed to fetch from ${endpoint}`);
        }

        return response;
    };

    getCourses = async (): Promise<{ data: CoursePreview[] } | { error: string }> => {
        try {
            const response = await this.baseFetch(`${this.BASE_URI}/core/preview-courses/`);
            const {courses} = await response.json();
            return {data: courses};
        } catch (e: unknown) {
            const err = e as Error;
            logs.error(err.message);
            return {error: err.message};
        }
    };

    getCourse = async (id: string): Promise<{ data: CourseDetails } | { error: string }> => {
        try {
            const response = await this.baseFetch(`${this.BASE_URI}/core/preview-courses/${id}`);
            return {data: await response.json()};
        } catch (e: unknown) {
            const err = e as Error;
            logs.error(err.message);
            return {error: err.message};
        }
    };
}

export const courseService = new CourseService();
