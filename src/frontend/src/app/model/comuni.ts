export interface Comuni {
  table?: (TableEntity)[] | null;
}
export interface TableEntity {
  codISTAT: number;
  codProvincia: string;
  comune: string;
  cap: string;
  codNazionale: string;
  codCatastale: string;
  flagVariazione: number;
}
