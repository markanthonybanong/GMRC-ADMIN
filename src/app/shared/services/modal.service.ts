import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActionResponseComponent } from '@gmrc-admin/shared/modals';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private dialog: MatDialog
  ) { }
  success(title: string, content: string): void {
    this.dialog.open(ActionResponseComponent, {
      data: {
        title,
        content,
        success: true,
      }
    });
  }
  warn(title: string, content: string): void {
    this.dialog.open(ActionResponseComponent, {
      data: {
        title,
        content,
        warn: true,
      }
    });
  }
  error(title: string): void {
    this.dialog.open(ActionResponseComponent, {
      data: {
        title,
        content: RequestResponse.Error,
        error: true,
      }
    });
  }
  confirmation(title: string, content: string): MatDialogRef<ActionResponseComponent, boolean> {
    const dialogRef = this.dialog.open(
      ActionResponseComponent, {
        data: {
          title,
          content,
          confirmation: true,
        }
      }
    );
    return dialogRef;
  }

}
