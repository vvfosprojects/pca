export interface DomandaArray {
  payload?: (Domanda)[] | null;
}
export interface Domanda {
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
export interface Spid {
  codiceFiscale: string;
  nome: string;
  cognome: string;
  dataNascita: string;
  luogoDiNascita: string;
  residenza: string;
  via: string;
  telefono: string;
  email: string;
  domDigitale: string;
}
export interface Istruzione {
  istitutoFrequentato: string;
  tipoDiploma: string;
  annoDiploma: string;
  provinciaIstituto: string;
  comuneIstituto: string;
  sedeIstituto: string;
}
export interface LinguaStraniera {
  lingua: string;
  id: number;
}
export interface FigliACarico {
  haFigli: boolean;
  numeroFigli: number;
}
export interface CategorieProtette {
  isCategorieProtette: number;
  percInvalidita: string | number;
  dataCertificazione: string;
  enteRilascioCertificato: string;
  ausilioProva: string | number;
  tempiAggiuntivi: string | number;
  esenzioneProvaSelettiva: string | number;
}
