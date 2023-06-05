import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../products/product.component';

@Component({
  selector: 'app-edit-pier-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent {
  public editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {
    this.editForm = new FormGroup({
      code: new FormControl(data.product.code, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      country: new FormControl(data.product.country, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      name: new FormControl(data.product.name, [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    const updatedPier = {
      code: this.editForm.value.code,
      country: this.editForm.value.country,
      name: this.editForm.value.name,
    };
    this.dialogRef.close(updatedPier);
  }
}
