import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../products/product.component';
import { Storage } from '../storages/storages.component';

@Component({
  selector: 'app-create-ship-in-pier',
  templateUrl: './create-product-in-pier.component.html',
  styleUrls: ['./create-product-in-pier.component.scss'],
})
export class CreateProductInStorageComponent {
  public selectedStorage: Storage | undefined;
  public selectedProduct: Product | undefined;

  constructor(
    public dialogRef: MatDialogRef<CreateProductInStorageComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { products: Array<Product>; storages: Array<Storage> }
  ) {}

  onShipSelected(storage: Storage) {
    this.selectedStorage = storage;
  }

  onPierSelected(product: Product) {
    this.selectedProduct = product;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      storageId: this.selectedStorage?._id,
      productId: this.selectedProduct?._id,
    });
  }
}
