import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductInStorageComponent } from './create-product-in-pier.component';

describe('CreateShipInPierComponent', () => {
  let component: CreateProductInStorageComponent;
  let fixture: ComponentFixture<CreateProductInStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductInStorageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductInStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
