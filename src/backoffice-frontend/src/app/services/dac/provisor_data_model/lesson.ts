import {CategorieProtette, FigliACarico, Istruzione, LinguaStraniera, Spid} from '../../../model/DAC/local-model/domanda';


export interface Lesson {
  id: number;
  courseId: number;
  spid: Spid;
  istruzione: Istruzione;
  linguaStraniera: LinguaStraniera;
  titoliPreferenziali: string;
  figliACarico: FigliACarico;
  riserve: string;
  categorieProtette: CategorieProtette;
}
