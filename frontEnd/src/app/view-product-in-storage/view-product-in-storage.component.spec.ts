import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductInStorageComponent } from './view-product-in-storage.component';

describe('ViewShipInPierComponent', () => {
  let component: ViewProductInStorageComponent;
  let fixture: ComponentFixture<ViewProductInStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductInStorageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductInStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
