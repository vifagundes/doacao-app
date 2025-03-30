import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'institution-detail/:id',
    loadComponent: () => import('./pages/institution-detail/institution-detail.page').then(m => m.InstitutionDetailPage)
  },
  {
    path: 'institution-register',
    loadComponent: () => import('./pages/institution-register/institution-register.page').then(m => m.InstitutionRegisterPage)
  },
  {
    path: 'donation/:id',
    loadComponent: () => import('./pages/donation/donation.page').then(m => m.DonationPage)
  },
  {
    path: 'donation-receipt/:id',
    loadComponent: () => import('./pages/donation-receipt/donation-receipt.page').then(m => m.DonationReceiptPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
