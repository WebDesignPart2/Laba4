import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Product } from '../products/product.component';
import { Storage } from '../storages/storages.component';

@Component({
  selector: 'app-view-ship-in-pier',
  templateUrl: './view-product-in-storage.component.html',
  styleUrls: ['./view-product-in-storage.component.scss'],
})
export class ViewProductInStorageComponent {
  public productToView: Product | undefined;
  public storageToView: Storage | undefined;

  constructor(
    public dialogRef: MatDialogRef<ViewProductInStorageComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { product: Observable<Product>; storage: Observable<Storage> }
  ) {
    data.product.subscribe((data) => (this.productToView = data));
    data.storage.subscribe((data) => (this.storageToView = data));
  }
}
