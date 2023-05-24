import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipInPierComponent } from './ship-in-pier.component';

describe('ShipInPierComponent', () => {
  let component: ShipInPierComponent;
  let fixture: ComponentFixture<ShipInPierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipInPierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipInPierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
