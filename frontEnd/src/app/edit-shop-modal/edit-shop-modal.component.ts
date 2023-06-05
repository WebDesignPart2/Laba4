import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Shop } from '../shops/shops.component';

@Component({
  selector: 'app-edit-port-modal',
  templateUrl: './edit-shop-modal.component.html',
  styleUrls: ['./edit-shop-modal.component.scss'],
})
export class EditPortModal {
  public editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditPortModal>,
    @Inject(MAT_DIALOG_DATA) public data: { shop: Shop }
  ) {
    this.editForm = new FormGroup({
      name: new FormControl(data.shop.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      capacity: new FormControl(data.shop.capacity, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      address: new FormControl(data.shop.address, [
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
    const updatedShop = {
      name: this.editForm.value.name,
      capacity: this.editForm.value.capacity,
      address: this.editForm.value.address,
    };
    this.dialogRef.close(updatedShop);
  }
}
