import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ShopsComponent } from './shops/shops.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './products/product.component';
import { EditPortModal } from './edit-shop-modal/edit-shop-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditProductModalComponent } from './edit-product-modal/edit-product-modal.component';
import { StoragesComponent } from './storages/storages.component';
import { EditShipModalComponent } from './edit-storage-modal/edit-storage-modal.component';
import { ProductInStorageComponent } from './product-in-storage/product-in-storage.component';
import { CreateProductInStorageComponent } from './create-product-in-pier/create-product-in-pier.component';
import { ViewProductInStorageComponent } from './view-product-in-storage/view-product-in-storage.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShopsComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProductComponent,
    EditPortModal,
    EditProductModalComponent,
    StoragesComponent,
    EditShipModalComponent,
    ProductInStorageComponent,
    CreateProductInStorageComponent,
    ViewProductInStorageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'shops', component: ShopsComponent },
      { path: 'products', component: ProductComponent },
      { path: 'storages', component: StoragesComponent },
      { path: 'home', component: HomeComponent },
      { path: 'productInStorage', component: ProductInStorageComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
