import {Request, Response} from 'express';
import {LESSONS} from './scripts/listaDomande';
import {COURSES} from './data/data';
import {ESITO} from './scripts/lista-esito-Domande';


export function searchLessons(req: Request, res: Response) {

  const queryParams = req.query;

  const courseId = queryParams.courseId,
    filter = queryParams.filter || '',
    sortOrder = queryParams.sortOrder,
    pageNumber = parseInt(queryParams.pageNumber) || 0,
    pageSize = parseInt(queryParams.pageSize);

  let lessons = Object.values(LESSONS).filter(lesson => lesson.courseId == courseId).sort((l1, l2) => l1.id - l2.id);

  if (filter) {
    lessons = lessons.filter(lesson => (lesson.spid.cognome + ' ' + lesson.spid.nome).trim().toLowerCase().search(filter.toLowerCase()) >= 0);
  }



  if (sortOrder == 'desc') {
    lessons = lessons.reverse();
  }

  const initialPos = pageNumber * pageSize;

  const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);


  setTimeout(() => {
    res.status(200).json({payload: lessonsPage});
  }, 1000);


}


function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0;
}

export function getLessonById(req: Request, res: Response) {
  const queryParams = req.query;

  const courseId = queryParams.courseId,
    filter = queryParams.filter || '';

  const lessons = Object.values(LESSONS).filter(lesson => lesson.courseId == courseId).sort((l1, l2) => l1.id - l2.id);

  const lezione = lessons.find(less => less.id == filter);

  res.status(200).json(lezione);

}

export function updateLessonById(req: Request, res: Response) {
  const queryParams = req.query;

  const courseId = queryParams.courseId,
    filter = queryParams.filter || '';

  const lessons = Object.values(LESSONS).filter(lesson => lesson.courseId == courseId).sort((l1, l2) => l1.id - l2.id);

  let lezione = lessons.find(less => less.id == filter);

  lezione = req.body;


  res.status(200).json(req.body);

}

export function getDomandaById(req: Request, res: Response) {


  const courseId = req.params['idConcorso'];
  const lessonId = req.params['idDomanda'];

  const lessons = Object.values(LESSONS).filter(lesson => lesson.courseId == courseId).sort((l1, l2) => l1.id - l2.id);

  const lezione = lessons.find(less => less.id == lessonId);


  res.status(200).json(lezione);
}


export function getEsitoDomandaById(req: Request, res: Response) {

  const concorsoId = req.params['idConcorso'];
  const domandaId = req.params['idDomanda'];


  let lessons = Object.values(ESITO).filter(lesson => lesson.idConcorso == concorsoId);

  let esito = lessons.find(es => es.id == domandaId);


  res.status(200).json(esito);
}

export function updateDomandaById(req: Request, res: Response) {


  const courseId = req.params['idConcorso'];
  const lessonId = req.params['idDomanda'];

  let lessons = Object.values(LESSONS).filter(lesson => lesson.courseId == courseId);

  const aid = lessons.findIndex(less => less.id == lessonId);

  lessons[aid].statoDomanda = req.body.statoDomanda;

  const lezione = lessons.find(less => less.id == lessonId);

  res.status(200).json(lezione);
}

