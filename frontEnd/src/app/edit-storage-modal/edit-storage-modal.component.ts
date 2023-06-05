import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Storage } from '../storages/storages.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-ship-modal',
  templateUrl: './edit-storage-modal.component.html',
  styleUrls: ['./edit-storage-modal.component.scss'],
})
export class EditShipModalComponent {
  public editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditShipModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { storage: Storage }
  ) {
    this.editForm = new FormGroup({
      number: new FormControl(data.storage.number, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      capacity: new FormControl(data.storage.capacity, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      shopId: new FormControl(data.storage.shopId, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    const updatedProduct = {
      number: this.editForm.value.number,
      shopId: this.editForm.value.shopId,
      capacity: this.editForm.value.capacity,
    };
    this.dialogRef.close(updatedProduct);
  }
}
