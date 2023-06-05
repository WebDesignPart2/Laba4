import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInStorageComponent } from './product-in-storage.component';

describe('ShipInPierComponent', () => {
  let component: ProductInStorageComponent;
  let fixture: ComponentFixture<ProductInStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInStorageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
