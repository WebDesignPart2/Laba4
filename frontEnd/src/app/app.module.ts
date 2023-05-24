import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { PortsComponent } from './ports/ports.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PiersComponent } from './piers/piers.component';
import { EditPortModal } from './edit-port-modal/edit-port-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditPierModalComponent } from './edit-pier-modal/edit-pier-modal.component';
import { ShipsComponent } from './ships/ships.component';
import { EditShipModalComponent } from './edit-ship-modal/edit-ship-modal.component';
import { ShipInPierComponent } from './ship-in-pier/ship-in-pier.component';
import { CreateShipInPierComponent } from './create-ship-in-pier/create-ship-in-pier.component';
import { ViewShipInPierComponent } from './view-ship-in-pier/view-ship-in-pier.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PortsComponent,
    HomeComponent,
    PageNotFoundComponent,
    PiersComponent,
    EditPortModal,
    EditPierModalComponent,
    ShipsComponent,
    EditShipModalComponent,
    ShipInPierComponent,
    CreateShipInPierComponent,
    ViewShipInPierComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'ports', component: PortsComponent },
      { path: 'piers', component: PiersComponent },
      { path: 'ships', component: ShipsComponent },
      { path: 'home', component: HomeComponent },
      { path: 'shipInPire', component: ShipInPierComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
