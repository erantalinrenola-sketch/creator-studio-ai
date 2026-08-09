import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-create-project-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-project-dialog.html',
  styleUrl: './create-project-dialog.scss',
})
export class CreateProjectDialog {

  project = {
    name: '',
    description: '',
    status: 'Draft'
  };

  constructor(
    private dialogRef: MatDialogRef<CreateProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data) {
      this.project = { ...data };
    }

  }

  createProject() {
    this.dialogRef.close(this.project);
  }

  cancel() {
    this.dialogRef.close();
  }

}