export interface Province {
  table?: (TableEntity)[] | null;
}
export interface TableEntity {
  codProvincia: string;
  provincia: string;
  codRegione: number;
  regione: string;
}
