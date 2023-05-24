import { Component } from '@angular/core';

interface Pier {
  port: string;
  number: number;
  capacity: number;
  minimumShipDraft: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
