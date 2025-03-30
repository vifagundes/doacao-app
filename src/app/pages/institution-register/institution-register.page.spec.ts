import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionRegisterPage } from './institution-register.page';

describe('InstitutionRegisterPage', () => {
  let component: InstitutionRegisterPage;
  let fixture: ComponentFixture<InstitutionRegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
