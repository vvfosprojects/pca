import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import {UploadService} from '../../services/upload/upload.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  constructor(public dialog: MatDialog, public uploadService: UploadService) {}

  public openUploadDialog() {
    const dialogRef = this.dialog.open(DialogComponent, { width: '500px' });
  }
}
