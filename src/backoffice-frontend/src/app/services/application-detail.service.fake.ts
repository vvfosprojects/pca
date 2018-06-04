import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

import { ApplicationDetail} from '../models/application-detail.model';
import { AnomaliesRow } from '../models/anomalies-row.model';
import { ApplicationDetailComponent } from '../application-detail/application-detail.component';


@Injectable()
export class ApplicationDetailServiceFake {
private application : ApplicationDetail[] = [
  new ApplicationDetail('id1', 'XXXYYY55T66R222A','Mario Rossi',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
      [
       new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 5, 10, 10, 0), 'Descrizione1'),
      ],'172.1.3.45'
   ),
   new ApplicationDetail('id2', 'XXXYYY55T66R222B','Giuseppina Bianchi',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
   [
    new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
   ],'172.1.3.45'
),
new ApplicationDetail('id3', 'XXXYYY55T66R222C','Alviero Martelli',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
[
 new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
],'172.1.3.45'
),
new ApplicationDetail('id4', 'XXXYYY55T66R222D','Wladimiro Giannini',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
[
 new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
],'172.1.3.45'
),
new ApplicationDetail('id5', 'XXXYYY55T66R222E','Giuseppe Coretti',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
[
 new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
],'172.1.3.45'
),
new ApplicationDetail('id6', 'XXXYYY55T66R222F','Michela Branduardi',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
[
 new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
],'172.1.3.45'
),
new ApplicationDetail('id7', 'XXXYYY55T66R222G','Anacleto Rocchetti',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
[
 new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
],'172.1.3.45'
),
new ApplicationDetail('id8', 'XXXYYY55T66R222H','Dario Pane',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
[
 new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
],'172.1.3.45'
),
new ApplicationDetail('id9', 'XXXYYY55T66R222I','Giacomo Mizzetti',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
[
 new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
],'172.1.3.45'
),
new ApplicationDetail('id10', 'XXXYYY55T66R222J','Simone Pianti',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
[
 new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
],'172.1.3.45'
),
new ApplicationDetail('id11', 'XXXYYY55T66R222K','Simonetta Tronca',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
[
 new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
],'172.1.3.45'
),
new ApplicationDetail('id12', 'XXXYYY55T66R222L','Antonietta Dalila',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
[
 new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
],'172.1.3.45'
),
new ApplicationDetail('id13', 'XXXYYY55T66R222M','Tiziana Dante',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
[
 new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
],'172.1.3.45'
),
new ApplicationDetail('id14', 'XXXYYY55T66R222N','Ignazio Sola',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
[
 new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
],'172.1.3.45'
)
];

constructor() { }

 public getApplication(id: string): Observable<ApplicationDetail> {
     let result = this.application.find(application => application.id === id);
     return observableOf(result); 
     

     
  }

}

