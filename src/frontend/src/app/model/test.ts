export interface Test {
  idDomanda: number;
  idStatoDomanda: number;
  anagrafica: Anagrafica;
  titoloDiploma?: null;
  lingua?: null;
  avereRiserve: boolean;
  lstRiserve?: null;
  avereTitoliPreferenziali: boolean;
  lstTitoliPreferenziali?: null;
  avereInvalidita: boolean;
  invaliditaCivile?: null;
}
export interface Anagrafica {
  codiceFiscale: string;
  cognome: string;
  nome: string;
  provincia: string;
  comune: string;
  dataNascita: string;
  sesso: string;
  residenza: string;
  cellulare: string;
  email: string;
  domicilioDigitale: string;
  codiceSpid: string;
}
