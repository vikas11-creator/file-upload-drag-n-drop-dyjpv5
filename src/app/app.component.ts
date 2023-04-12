import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public files: any[] = [];

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog){}

  onFileChange(pFileList: File[]){
    this.files = Object.keys(pFileList).map(key => pFileList[key]);
    this._snackBar.open("Successfully upload!", 'Close', {
      duration: 2000,
    });
  }

  deleteFile(f){
    this.files = this.files.filter(function(w){ return w.name != f.name });
    this._snackBar.open("Successfully delete!", 'Close', {
      duration: 2000,
    });
  }

  openConfirmDialog(pIndex): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      panelClass: 'modal-xs'
    });
    dialogRef.componentInstance.fName = this.files[pIndex].name;
    dialogRef.componentInstance.fIndex = pIndex;


    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deleteFromArray(result);
      }
    });
  }

  deleteFromArray(index) {
    console.log(this.files);
    this.files.splice(index, 1);
  }
}
