import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPierModalComponent } from './edit-pier-modal.component';

describe('EditPierModalComponent', () => {
  let component: EditPierModalComponent;
  let fixture: ComponentFixture<EditPierModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPierModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPierModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
