import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomandaService {

  idC;
  idD;
  idE;

  getDomanda() {
    return [this.idC, this.idD];
  }

  setEsito(idE) {
    this.idE = idE;
  }

  getEsito() {
    return this.idE;
  }

  setDomanda(idC, idD) {
    this.idC = idC;
    this.idD = idD;
  }

  constructor() { }
}
