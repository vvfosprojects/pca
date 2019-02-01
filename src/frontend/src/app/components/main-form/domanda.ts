import {TitoliPreferenzialiOut} from '../../model/titoliPreferenziali';

export class Parser {




  TitoliPreferenziali_PO(lista, selezionati) {
    const titoliPreferenzialiObj: TitoliPreferenzialiOut[] = [];
    const titoliSelected: TitoliPreferenzialiOut[] = [];

    for (const i of lista) {
      const obj: TitoliPreferenzialiOut = {
        id: i.id,
        titolo: i.titolo,
        isSelected: false,
      };
      titoliPreferenzialiObj.push(obj);
    }

    for (const x of titoliPreferenzialiObj) {
      for (const i of selezionati) {
        if ((i + 1) === x.id) {
          x.isSelected = true;
          titoliSelected.push(x);
        }
      }
    }

    return titoliSelected;
  }
}
