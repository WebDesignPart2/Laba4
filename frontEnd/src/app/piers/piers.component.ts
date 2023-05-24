import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditPierModalComponent } from '../edit-pier-modal/edit-pier-modal.component';
import Swal from 'sweetalert2';
export interface Pier {
  _id: string;
  port: string;
  number: string;
  capacity: string;
  tonnage: string;
}

@Component({
  selector: 'app-piers',
  templateUrl: './piers.component.html',
  styleUrls: ['./piers.component.scss'],
  providers: [MatDialog],
})
export class PiersComponent implements OnInit {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  public piers: Array<Pier> = new Array<Pier>();
  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/pier').subscribe({
      next: (data: any) => (this.piers = data as Array<Pier>),
      error: (err) => console.log(err),
    });
  }
  
  profileForm = new FormGroup({
    port: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    capacity: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    tonnage: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.http
        .post('http://localhost:8080/api/pier', this.profileForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.profileForm.reset();
            this.piers.push(data as Pier);
            Swal.fire('Succes', `add ${data.number}`, 'success');
          },
          error: (err) => console.log(err),
        });
    }
  }

  onDelete(pier: Pier) {
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
          .delete(`http://localhost:8080/api/pier/${pier._id}`)
          .subscribe({
            next: (_: any) =>
              (this.piers = this.piers.filter((p) => p != pier)),
            error: (err) => console.log(err),
          });
        Swal.fire('Deleted!', 'Your port has been deleted.', 'success');
      }
    });
  }

  onEdit(pier: Pier) {
    const dialogRef = this.dialog.open(EditPierModalComponent, {
      width: '400px',
      position: { top: '-40vh', left: '35vw' },
      data: { pier: pier },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http
        .put(`http://localhost:8080/api/pier/${pier._id}`, result)
        .subscribe({
          next: (res) => {
            let index = this.piers.indexOf(pier);
            this.piers[index] = res as Pier;
            Swal.fire('Edited!', 'Succesfully edit pier', 'success');
          },
          error: (_) =>
            Swal.fire('Error occurate', 'Error when update pier', 'error'),
        });
    });
  }
}
