import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductInStorageComponent } from '../create-product-in-pier/create-product-in-pier.component';
import { HttpClient } from '@angular/common/http';
import { Storage } from '../storages/storages.component';
import { Product } from '../products/product.component';
import Swal from 'sweetalert2';
import { ViewProductInStorageComponent } from '../view-product-in-storage/view-product-in-storage.component';
export interface ProductInStorage {
  _id: string;
  productId: string;
  storageId: string;
}

@Component({
  selector: 'app-ship-in-pier',
  templateUrl: './product-in-storage.component.html',
  styleUrls: ['./product-in-storage.component.scss'],
  providers: [MatDialog],
})
export class ProductInStorageComponent implements OnInit {
  public storages: Array<Storage> = new Array<Storage>();
  public products: Array<Product> = new Array<Product>();
  public productInStorages: Array<ProductInStorage> =
    new Array<ProductInStorage>();

  constructor(private http: HttpClient, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/storage').subscribe({
      next: (res: any) => (this.storages = res as Array<Storage>),
      error: (err) => console.log(err),
    });

    this.http.get('http://localhost:8080/api/product').subscribe({
      next: (data: any) => (this.products = data as Array<Product>),
      error: (err) => console.log(err),
    });

    this.http.get('http://localhost:8080/api/productInStorage').subscribe({
      next: (data) => {
        this.productInStorages = data as Array<ProductInStorage>;
      },
      error: (err) => console.log(err),
    });
  }

  async onView(storageId: string, productId: string) {
    const storage = this.http.get<Storage>(
      `http://localhost:8080/api/storage/${storageId}`
    );
    const product = this.http.get<Product>(
      `http://localhost:8080/api/product/${productId}`
    );

    const dialogRef = this.dialog.open(ViewProductInStorageComponent, {
      width: '1000px',
      position: { left: '14vw' },
      data: { product: product, storage: storage },
    });

    dialogRef.afterClosed().subscribe((e) => console.log(e));
  }

  OnAdd() {
    const dialogRef = this.dialog.open(CreateProductInStorageComponent, {
      width: '1000px',
      position: { left: '14vw' },
      data: { products: this.products, storages: this.storages },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http
        .post('http://localhost:8080/api/productInStorage', result)
        .subscribe({
          next: (data) => {
            this.productInStorages.push(data as ProductInStorage);
            Swal.fire('Succes', 'succesfully park storage in port', 'success');
          },
          error: (err) => {
            Swal.fire('Error!', `${err.error.error}`, 'error');
          },
        });
    });
  }

  onDelete(productInStorage: ProductInStorage) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(
            `http://localhost:8080/api/productInStorage/${productInStorage._id}`
          )
          .subscribe({
            next: (_: any) =>
              (this.productInStorages = this.productInStorages.filter(
                (p) => p != productInStorage
              )),
            error: (err) => console.log(err),
          });
        Swal.fire('Deleted!', 'Your port has been deleted.', 'success');
      }
    });
  }

  onEdit(productInStorage: ProductInStorage) {
    const dialogRef = this.dialog.open(CreateProductInStorageComponent, {
      width: '1000px',
      position: { left: '14vw' },
      data: { products: this.products, storages: this.storages },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http
        .post('http://localhost:8080/api/productInStorage', result)
        .subscribe({
          next: (data) => {
            let index = this.productInStorages.indexOf(productInStorage);
            this.productInStorages[index] = data as ProductInStorage;
            Swal.fire('Succes', 'succesfully park storage in port', 'success');
          },
          error: (err) => {
            Swal.fire('Error!', `${err.error.error}`, 'error');
          },
        });
    });
  }
}
