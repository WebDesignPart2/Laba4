import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateShipInPierComponent } from '../create-ship-in-pier/create-ship-in-pier.component';
import { HttpClient } from '@angular/common/http';
import { Ship } from '../ships/ships.component';
import { Pier } from '../piers/piers.component';
import Swal from 'sweetalert2';
import { ViewShipInPierComponent } from '../view-ship-in-pier/view-ship-in-pier.component';
export interface ShipInPier {
  _id: string;
  pierId: string;
  shipId: string;
}

@Component({
  selector: 'app-ship-in-pier',
  templateUrl: './ship-in-pier.component.html',
  styleUrls: ['./ship-in-pier.component.scss'],
  providers: [MatDialog],
})
export class ShipInPierComponent implements OnInit {
  public ships: Array<Ship> = new Array<Ship>();
  public piers: Array<Pier> = new Array<Pier>();
  public shipInPiers: Array<ShipInPier> = new Array<ShipInPier>();

  constructor(private http: HttpClient, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/ship').subscribe({
      next: (res: any) => (this.ships = res as Array<Ship>),
      error: (err) => console.log(err),
    });

    this.http.get('http://localhost:8080/api/pier').subscribe({
      next: (data: any) => (this.piers = data as Array<Pier>),
      error: (err) => console.log(err),
    });

    this.http.get('http://localhost:8080/api/shipInPier').subscribe({
      next: (data) => {
        this.shipInPiers = data as Array<ShipInPier>;
      },
      error: (err) => console.log(err),
    });
  }

  async onView(shipId: string, pierId: string) {
    const ship = this.http.get<Ship>(
      `http://localhost:8080/api/ship/${shipId}`
    );
    const pier = this.http.get<Pier>(
      `http://localhost:8080/api/pier/${pierId}`
    );

    const dialogRef = this.dialog.open(ViewShipInPierComponent, {
      width: '1000px',
      position: { left: '14vw' },
      data: { pier: pier, ship: ship },
    });

    dialogRef.afterClosed().subscribe((e) => console.log(e));
  }

  OnAdd() {
    const dialogRef = this.dialog.open(CreateShipInPierComponent, {
      width: '1000px',
      position: { left: '14vw' },
      data: { piers: this.piers, ships: this.ships },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http.post('http://localhost:8080/api/shipInPier', result).subscribe({
        next: (data) => {
          this.shipInPiers.push(data as ShipInPier);
          Swal.fire('Succes', 'succesfully park ship in port', 'success');
        },
        error: (err) => {
          Swal.fire('Error!', `${err.error.error}`, 'error');
        },
      });
    });
  }

  onDelete(shipInPier: ShipInPier) {
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
          .delete(`http://localhost:8080/api/shipInPier/${shipInPier._id}`)
          .subscribe({
            next: (_: any) =>
              (this.shipInPiers = this.shipInPiers.filter(
                (p) => p != shipInPier
              )),
            error: (err) => console.log(err),
          });
        Swal.fire('Deleted!', 'Your port has been deleted.', 'success');
      }
    });
  }

  onEdit(shipInPier: ShipInPier) {
    const dialogRef = this.dialog.open(CreateShipInPierComponent, {
      width: '1000px',
      position: { left: '14vw' },
      data: { piers: this.piers, ships: this.ships },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.http.post('http://localhost:8080/api/shipInPier', result).subscribe({
        next: (data) => {
          let index = this.shipInPiers.indexOf(shipInPier);
          this.shipInPiers[index] = data as ShipInPier;
          Swal.fire('Succes', 'succesfully park ship in port', 'success');
        },
        error: (err) => {
          Swal.fire('Error!', `${err.error.error}`, 'error');
        },
      });
    });
  }
}
