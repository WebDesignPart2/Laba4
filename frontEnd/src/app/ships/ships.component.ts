import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditShipModalComponent } from '../edit-ship-modal/edit-ship-modal.component';
export interface Ship {
  _id: any;
  name: string;
  bortNum: string;
  country: string;
  tonnage: string;
  sediment: string;
}

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
  providers: [MatDialog],
})
export class ShipsComponent implements OnInit {
  public ships: Array<Ship> = new Array<Ship>();
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/ship').subscribe({
      next: (data: any) => (this.ships = data as Array<Ship>),
      error: (err) => console.log(err),
    });
  }
  public profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    bortNum: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    tonnage: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    sediment: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.http
        .post('http://localhost:8080/api/ship', this.profileForm.value)
        .subscribe({
          next: (data: any) => {
            this.ships.push(data as Ship);
            Swal.fire('Succes', `add ${data.name}`, 'success');
            this.profileForm.reset();
          },
          error: (err) => console.log(err),
        });
    }
  }

  onDelete(ship: Ship) {
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
          .delete(`http://localhost:8080/api/ship/${ship._id}`)
          .subscribe({
            next: (_: any) =>
              (this.ships = this.ships.filter((p) => p != ship)),
            error: (err) => console.log(err),
          });
        Swal.fire('Deleted!', 'Your port has been deleted.', 'success');
      }
    });
  }

  onEdit(ship: Ship) {
    const dialogRef = this.dialog.open(EditShipModalComponent, {
      width: '400px',
      position: { top: '-40vh', left: '35vw' },
      data: { ship: ship },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http
        .put(`http://localhost:8080/api/ship/${ship._id}`, result)
        .subscribe({
          next: (res) => {
            let index = this.ships.indexOf(ship);
            this.ships[index] = res as Ship;
            Swal.fire('Edited!', 'Succesfully edit port', 'success');
          },
          error: (_) =>
            Swal.fire('Error occurate', 'Error when update port', 'error'),
        });
    });
  }
}
