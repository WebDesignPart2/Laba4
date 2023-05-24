import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pier } from '../piers/piers.component';

@Component({
  selector: 'app-edit-pier-modal',
  templateUrl: './edit-pier-modal.component.html',
  styleUrls: ['./edit-pier-modal.component.scss'],
})
export class EditPierModalComponent {
  public editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditPierModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pier: Pier }
  ) {
    this.editForm = new FormGroup({
      port: new FormControl(data.pier.port, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      number: new FormControl(data.pier.number, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      capacity: new FormControl(data.pier.capacity, [
        Validators.required,
        Validators.minLength(2),
      ]),
      tonnage: new FormControl(data.pier.tonnage, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    });
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    const updatedPier = {
      port: this.editForm.value.port,
      number: this.editForm.value.number,
      capacity: this.editForm.value.capacity,
      tonnage: this.editForm.value.tonnage,
    };
    this.dialogRef.close(updatedPier);
  }
}
