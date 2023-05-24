import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Pier } from '../piers/piers.component';
import { Ship } from '../ships/ships.component';

@Component({
  selector: 'app-view-ship-in-pier',
  templateUrl: './view-ship-in-pier.component.html',
  styleUrls: ['./view-ship-in-pier.component.scss'],
})
export class ViewShipInPierComponent {
  public pierToView: Pier | undefined;
  public shipToView: Ship | undefined;

  constructor(
    public dialogRef: MatDialogRef<ViewShipInPierComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { pier: Observable<Pier>; ship: Observable<Ship> }
  ) {
    data.pier.subscribe((data) => (this.pierToView = data));
    data.ship.subscribe((data) => (this.shipToView = data));
  }
}
