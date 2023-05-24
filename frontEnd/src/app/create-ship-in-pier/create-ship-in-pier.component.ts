import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pier } from '../piers/piers.component';
import { Ship } from '../ships/ships.component';

@Component({
  selector: 'app-create-ship-in-pier',
  templateUrl: './create-ship-in-pier.component.html',
  styleUrls: ['./create-ship-in-pier.component.scss'],
})
export class CreateShipInPierComponent {
  public selectedShip: Ship | undefined;
  public selectedPier: Pier | undefined;

  constructor(
    public dialogRef: MatDialogRef<CreateShipInPierComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { piers: Array<Pier>; ships: Array<Ship> }
  ) {}

  onShipSelected(ship: Ship) {
    this.selectedShip = ship;
  }

  onPierSelected(pier: Pier) {
    this.selectedPier = pier;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      shipId: this.selectedShip?._id,
      pierId: this.selectedPier?._id,
    });
  }
}
