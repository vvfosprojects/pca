import { NgModule } from '@angular/core';
import {UploadComponent} from '../../components/upload/upload.component';
import {DialogComponent} from '../../components/upload/dialog/dialog.component';
import {UploadService} from '../../services/upload/upload.service';
import {DemoMaterialModule} from '../material-module';

@NgModule({
  imports: [DemoMaterialModule],
  declarations: [UploadComponent, DialogComponent],
  exports: [UploadComponent],
  entryComponents: [DialogComponent], // Add the DialogComponent as entry component
  providers: [UploadService]
})
export class UploadModule {}
