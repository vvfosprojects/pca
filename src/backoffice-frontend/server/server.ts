

import * as express from 'express';
import {Application} from 'express';
import {getAllCourses, getCourseById} from './get-courses.route';
import {
  getDomandaById,
  getEsitoDomandaById,
  getLessonById,
  searchLessons,
  updateDomandaById,
} from './search-lessons.route';


const app: Application = express();
const bodyParser    = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));



app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').get(getCourseById);


app.route('/api/lessons').get(searchLessons);

app.route('/api/lesson').get(getLessonById);

app.route('/api/domanda/:idConcorso/:idDomanda').get(getDomandaById);
app.route('/api/domanda/:idConcorso/:idDomanda').put(updateDomandaById);

app.route('/api/domanda/:idConcorso/:idDomanda/esito').get(getEsitoDomandaById);


const httpServer = app.listen(9000, '172.16.26.72', () => {
    console.log('HTTP REST API Server running at http://localhost:' + httpServer.address().port);
});




