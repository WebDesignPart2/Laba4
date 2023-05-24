import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPortModal } from './edit-port-modal.component';

describe('EditPortModalComponent', () => {
  let component: EditPortModal;
  let fixture: ComponentFixture<EditPortModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPortModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPortModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
