export class Domanda {

  private istituoFrequentato: string;
  private annoDiploma: number;
  private tipoDiploma: string;
  private provinciaIstituto: string;
  private comuneIstituto: string;
  private viaIsituto: string;

  private linguaStraniera: string;

  private titoliPreferenziali: string[];
  private numeroFigli?: number;

  private riserve: string[];

  private categorieProtette: boolean;
  private percentualeInvalidita?: number;
  private dataCertificazione?: string;
  private enteCertificazioneInvalidita?: string;
  private dirittoAusili?: boolean;
  private dirittoTempiAggiuntivi?: boolean;
  private dirittoEsenzioneProvaSelettiva?: boolean;


  constructor() {

  }

}
