import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShipInPierComponent } from './view-ship-in-pier.component';

describe('ViewShipInPierComponent', () => {
  let component: ViewShipInPierComponent;
  let fixture: ComponentFixture<ViewShipInPierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewShipInPierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewShipInPierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
