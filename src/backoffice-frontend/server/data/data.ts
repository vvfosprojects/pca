import {LESSONS} from '../scripts/listaDomande';

export const COURSES: any  = {
  1: {
    id: 1,
    nome: 'Concorso DAC',
    lessonsCount: 100
  },
  2: {
    id: 2,
    nome: 'Concorso VD',
    lessonsCount: 0
  }
};


export function findCourseById(courseId: number) {
  return COURSES[courseId];
}

export function findLessonsForCourse(courseId: number) {
  return Object.values(LESSONS).filter(lesson => lesson.courseId == courseId);
}
