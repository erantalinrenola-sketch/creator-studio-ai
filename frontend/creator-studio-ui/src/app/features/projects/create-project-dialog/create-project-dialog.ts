import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-project-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule
  ],
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
    private dialogRef: MatDialogRef<CreateProjectDialog>
  ) {}

  createProject() {
    this.dialogRef.close(this.project);
  }

  cancel() {
    this.dialogRef.close();
  }
}