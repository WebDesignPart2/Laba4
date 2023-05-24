import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortsComponent } from './ports.component';

describe('PiersComponent', () => {
  let component: PortsComponent;
  let fixture: ComponentFixture<PortsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
