import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonationReceiptPage } from './donation-receipt.page';

describe('DonationReceiptPage', () => {
  let component: DonationReceiptPage;
  let fixture: ComponentFixture<DonationReceiptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
