import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShipInPierComponent } from './create-ship-in-pier.component';

describe('CreateShipInPierComponent', () => {
  let component: CreateShipInPierComponent;
  let fixture: ComponentFixture<CreateShipInPierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateShipInPierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateShipInPierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
