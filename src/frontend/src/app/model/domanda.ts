export interface Domanda {
  anagrafica: Anagrafica;
  istruzione: Istruzione;
  linguaStraniera?: null;
  titoliSelezionati: TitoliSelezionati;
  riserveForm: RiserveForm;
  catProtetteForm: CatProtetteForm;
  dichiarazioniIdoneita?: null;
  autorizzamentoDati?: null;
}
export interface Anagrafica {
  codiceFiscale: string;
  nome: string;
  cognome: string;
  dataDiNascita: string;
  luogoDiNascita: string;
  residenza: string;
  via: string;
  telefono: string;
  email: string;
  domicilioDigitale: string;
}
export interface Istruzione {
  istitutoFrequentatoForm?: null;
  tipoDiplomaForm?: null;
  annoDiplomaForm?: null;
  provinciaIstitutoForm?: null;
  comuneIstitutoForm?: null;
  sedeIstituto?: null;
  isitutoFrequentato: string;
}
export interface TitoliSelezionati {
  titolo_1?: null;
  titolo_2?: null;
  titolo_3?: null;
  figliCarico: FigliCarico;
}
export interface FigliCarico {
  figliACarico?: null;
  numeroFigliForm?: null;
}
export interface RiserveForm {
  riserva_1?: null;
  riserva_2?: null;
  riserva_3?: null;
  riserva_4?: null;
}
export interface CatProtetteForm {
  isCatProtette?: null;
  percInvaliditaForm?: null;
  dataCertificazioneForm?: null;
  enteRilascio?: null;
  dichiarazione_1?: null;
  dichiarazione_2?: null;
  dichiarazione_3?: null;
}

