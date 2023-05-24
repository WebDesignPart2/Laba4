import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditPortModal } from '../edit-port-modal/edit-port-modal.component';
export interface Port {
  _id: any;
  name: string;
  country: string;
  erdpou: string;
  address: string;
}

@Component({
  selector: 'app-ports',
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.scss'],
  providers: [MatDialog],
})
export class PortsComponent implements OnInit {
  public ports: Array<Port> = new Array<Port>();
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/port').subscribe({
      next: (data: any) => (this.ports = data as Array<Port>),
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
    erdpou: new FormControl('', [Validators.required, Validators.minLength(6)]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.http
        .post('http://localhost:8080/api/port', this.profileForm.value)
        .subscribe({
          next: (data: any) => {
            this.ports.push(data as Port);
            Swal.fire('Succes', `add ${data.name}`, 'success');
            this.profileForm.reset();
          },
          error: (err) => console.log(err),
        });
    }
  }

  onDelete(port: Port) {
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
          .delete(`http://localhost:8080/api/port/${port._id}`)
          .subscribe({
            next: (_: any) =>
              (this.ports = this.ports.filter((p) => p != port)),
            error: (err) => console.log(err),
          });
        Swal.fire('Deleted!', 'Your port has been deleted.', 'success');
      }
    });
  }

  onEdit(port: Port) {
    const dialogRef = this.dialog.open(EditPortModal, {
      width: '400px',
      position: { top: '-40vh', left: '35vw' },
      data: { port: port },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http
        .put(`http://localhost:8080/api/port/${port._id}`, result)
        .subscribe({
          next: (res) => {
            let index = this.ports.indexOf(port);
            this.ports[index] = res as Port;
            Swal.fire('Edited!', 'Succesfully edit port', 'success');
          },
          error: (_) =>
            Swal.fire('Error occurate', 'Error when update port', 'error'),
        });
    });
  }
}
