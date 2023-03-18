export interface CoursePreview {
    id: string;
    title: string;
    tags: string[];
    launchDate: Date;
    status: string;
    description: string;
    duration: number;
    lessonsCount: number;
    containsLockedLessons: boolean;
    previewImageLink: string;
    rating: number;
    meta: Meta;
}

export interface CourseDetails extends Omit<CoursePreview, 'lessonsCount'> {
    lessons: Lesson[];
}

export interface Lesson {
    id: string;
    title: string;
    duration: number;
    order: number;
    type: string;
    status: string;
    link: string;
    previewImageLink: string;
    meta: string[] | null;
}

interface Meta {
    slug: string;
    skills: string[];
    courseVideoPreview: CourseVideoPreview;
    fullCourseProductId?: string;
    fullCourseProductFamily?: string;
}

interface CourseVideoPreview {
    link: string;
    duration: number;
    previewImageLink: string;
}

