import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  domanda: string;
}

@Component({
  selector: 'app-dialog-annulla-domanda',
  templateUrl: './dialog-annulla-domanda.component.html',
  styleUrls: ['./dialog-annulla-domanda.component.css']
})
export class DialogAnnullaDomandaComponent implements OnInit {


  ngOnInit() {
  }


  constructor(
    public dialogRef: MatDialogRef<DialogAnnullaDomandaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
