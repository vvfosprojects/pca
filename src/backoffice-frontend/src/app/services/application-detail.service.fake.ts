import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

// import { Observable } from 'rxjs';
import { ApplicationDetail} from '../models/application-detail.model';
import { AnomaliesRow } from '../models/anomalies-row.model';
import { ApplicationDetailComponent } from '../application-detail/application-detail.component';


@Injectable()
export class ApplicationDetailServiceFake {
private application : ApplicationDetail[] = [
  new ApplicationDetail('id1', 'XXXYYY55T66R222A','Mario Rossi',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
      [
       new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
      ],'172.1.3.45'
   ),
   new ApplicationDetail('id2', 'XXXYYY55T66R222A','Mario Rossi',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
   [
    new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
   ],'172.1.3.45'
)
];

constructor() { }

 public getApplication(id: string): Observable<ApplicationDetail> {
     let result = this.application.find(application => application.id === id);
     return observableOf(result); 
     
   /*  let result = new ApplicationDetail('id1', 'XXXYYY55T66R222A','Mario Rossi',new Date(2016, 3, 4, 10, 10, 0),"mail@vigilfuoco.it",'3351234567', 2,'Patente 1405934',['Roma',],new Date(2016, 3, 4, 10, 10, 0), 
    [
     new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'), new AnomaliesRow(new Date(2016, 3, 4, 10, 10, 0), 'Descrizione'),
    ],'172.1.3.45' 
 )
    return observableOf(result);*/
    
  }

}

