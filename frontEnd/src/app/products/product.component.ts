import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import Swal from 'sweetalert2';
export interface Product {
  _id: string;
  code: string;
  name: string;
  country: string;
}

@Component({
  selector: 'app-piers',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MatDialog],
})
export class ProductComponent implements OnInit {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  public products: Array<Product> = new Array<Product>();
  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/product').subscribe({
      next: (data: any) => (this.products = data as Array<Product>),
      error: (err) => console.log(err),
    });
  }

  profileForm = new FormGroup({
    code: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.http
        .post('http://localhost:8080/api/product', this.profileForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.profileForm.reset();
            this.products.push(data as Product);
            Swal.fire('Succes', `add ${data.number}`, 'success');
          },
          error: (err) => console.log(err),
        });
    }
  }

  onDelete(product: Product) {
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
          .delete(`http://localhost:8080/api/product/${product._id}`)
          .subscribe({
            next: (_: any) =>
              (this.products = this.products.filter((p) => p != product)),
            error: (err) => console.log(err),
          });
        Swal.fire('Deleted!', 'Your port has been deleted.', 'success');
      }
    });
  }

  onEdit(product: Product) {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      width: '400px',
      position: { top: '-40vh', left: '35vw' },
      data: { product: product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http
        .put(`http://localhost:8080/api/product/${product._id}`, result)
        .subscribe({
          next: (res) => {
            let index = this.products.indexOf(product);
            this.products[index] = res as Product;
            Swal.fire('Edited!', 'Succesfully edit product', 'success');
          },
          error: (_) =>
            Swal.fire('Error occurate', 'Error when update product', 'error'),
        });
    });
  }
}
