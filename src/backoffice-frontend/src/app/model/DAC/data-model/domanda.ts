export interface Domanda {
  id: number;
  Istruzione: Istruzione;
  LinguaStraniera: LinguaStraniera;
  TitoliPreferenziali?: (null)[] | null;
  FigliACarico: FigliACarico;
  Riserve?: (null)[] | null;
  CategorieProtette: CategorieProtette;
  spid: Spid;
}
export interface Istruzione {
  istitutoFrequentato: string;
  tipoDiploma: string;
  annoDiploma: string;
  provinciaIstituto: string;
  comuneIstituto: string;
  sedeIstituto?: string;
}
export interface LinguaStraniera {
  lingua: string;
  id: number;
}
export interface FigliACarico {
  haveSon: boolean;
  numSons: number;
}
export interface CategorieProtette {
  isCategegorieProtette: boolean;
  percentualeInvalidita?: null;
  dataCertificazione?: null;
  enteRilascioCertificato?: null;
  ausilioProva?: null;
  tempiaggiuntivi?: null;
  esenzioneProvaSelettiva?: null;
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
