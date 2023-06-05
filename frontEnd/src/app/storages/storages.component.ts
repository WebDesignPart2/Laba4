import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditShipModalComponent } from '../edit-storage-modal/edit-storage-modal.component';
export interface Storage {
  _id: any;
  number: string;
  shopId: string;
  capacity: string;
}

@Component({
  selector: 'app-ships',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.scss'],
  providers: [MatDialog],
})
export class StoragesComponent implements OnInit {
  public storages: Array<Storage> = new Array<Storage>();
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/storage').subscribe({
      next: (data: any) => (this.storages = data as Array<Storage>),
      error: (err) => console.log(err),
    });
  }
  public profileForm = new FormGroup({
    number: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    shopId: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    capacity: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.http
        .post('http://localhost:8080/api/storage', this.profileForm.value)
        .subscribe({
          next: (data: any) => {
            this.storages.push(data as Storage);
            Swal.fire('Succes', `add ${data.name}`, 'success');
            this.profileForm.reset();
          },
          error: (err) => console.log(err),
        });
    }
  }

  onDelete(storage: Storage) {
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
          .delete(`http://localhost:8080/api/storage/${storage._id}`)
          .subscribe({
            next: (_: any) =>
              (this.storages = this.storages.filter((p) => p != storage)),
            error: (err) => console.log(err),
          });
        Swal.fire('Deleted!', 'Your port has been deleted.', 'success');
      }
    });
  }

  onEdit(storage: Storage) {
    const dialogRef = this.dialog.open(EditShipModalComponent, {
      width: '400px',
      position: { top: '-40vh', left: '35vw' },
      data: { storage: storage },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http
        .put(`http://localhost:8080/api/storage/${storage._id}`, result)
        .subscribe({
          next: (res) => {
            let index = this.storages.indexOf(storage);
            this.storages[index] = res as Storage;
            Swal.fire('Edited!', 'Succesfully edit port', 'success');
          },
          error: (_) =>
            Swal.fire('Error occurate', 'Error when update port', 'error'),
        });
    });
  }
}
