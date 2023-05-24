import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ship } from '../ships/ships.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-ship-modal',
  templateUrl: './edit-ship-modal.component.html',
  styleUrls: ['./edit-ship-modal.component.scss'],
})
export class EditShipModalComponent {
  public editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditShipModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ship: Ship }
  ) {
    this.editForm = new FormGroup({
      name: new FormControl(data.ship.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      country: new FormControl(data.ship.country, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      bortNum: new FormControl(data.ship.bortNum, [
        Validators.required,
        Validators.minLength(6),
      ]),
      tonnage: new FormControl(data.ship.tonnage, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      sediment: new FormControl(data.ship.sediment, [
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
    const updatedShip = {
      name: this.editForm.value.name,
      country: this.editForm.value.country,
      bortNum: this.editForm.value.bortNum,
      tonnage: this.editForm.value.tonnage,
      sediment: this.editForm.value.sediment,
    };
    this.dialogRef.close(updatedShip);
  }
}
