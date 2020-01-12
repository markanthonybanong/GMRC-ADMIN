import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-action-response',
  templateUrl: './action-response.component.html',
  styleUrls: ['./action-response.component.scss']
})
export class ActionResponseComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ActionResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }
  onOk(): void {
    this.dialogRef.close();
  }

}
