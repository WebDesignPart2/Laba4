import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditPortModal } from '../edit-shop-modal/edit-shop-modal.component';
export interface Shop {
  _id: any;
  name: string;
  capacity: number;
  address: string;
}

@Component({
  selector: 'app-ports',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
  providers: [MatDialog],
})
export class ShopsComponent implements OnInit {
  public shops: Array<Shop> = new Array<Shop>();
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/shop').subscribe({
      next: (data: any) => (this.shops = data as Array<Shop>),
      error: (err) => console.log(err),
    });
  }

  public profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    capacity: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.http
        .post('http://localhost:8080/api/shop', this.profileForm.value)
        .subscribe({
          next: (data: any) => {
            this.shops.push(data as Shop);
            Swal.fire('Succes', `add ${data.name}`, 'success');
            this.profileForm.reset();
          },
          error: (err) => console.log(err),
        });
    }
  }

  onDelete(shop: Shop) {
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
          .delete(`http://localhost:8080/api/shop/${shop._id}`)
          .subscribe({
            next: (_: any) =>
              (this.shops = this.shops.filter((p) => p != shop)),
            error: (err) => console.log(err),
          });
        Swal.fire('Deleted!', 'Your shop has been deleted.', 'success');
      }
    });
  }

  onEdit(shop: Shop) {
    const dialogRef = this.dialog.open(EditPortModal, {
      width: '400px',
      position: { top: '-40vh', left: '35vw' },
      data: { shop: shop },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http
        .put(`http://localhost:8080/api/shop/${shop._id}`, result)
        .subscribe({
          next: (res) => {
            let index = this.shops.indexOf(shop);
            this.shops[index] = res as Shop;
            Swal.fire('Edited!', 'Succesfully edit shop', 'success');
          },
          error: (_) =>
            Swal.fire('Error occurate', 'Error when update shop', 'error'),
        });
    });
  }
}
