import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Port } from '../ports/ports.component';

@Component({
  selector: 'app-edit-port-modal',
  templateUrl: './edit-port-modal.component.html',
  styleUrls: ['./edit-port-modal.component.scss'],
})
export class EditPortModal {
  public editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditPortModal>,
    @Inject(MAT_DIALOG_DATA) public data: { port: Port }
  ) {
    this.editForm = new FormGroup({
      name: new FormControl(data.port.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      country: new FormControl(data.port.country, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      erdpou: new FormControl(data.port.erdpou, [
        Validators.required,
        Validators.minLength(6),
      ]),
      address: new FormControl(data.port.address, [
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
    const updatedPort = {
      name: this.editForm.value.name,
      country: this.editForm.value.country,
      erdpou: this.editForm.value.erdpou,
      address: this.editForm.value.address,
    };
    this.dialogRef.close(updatedPort);
  }
}
