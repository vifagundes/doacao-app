import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Institution } from '../models/institution.model';
import { Donation } from '../models/donation.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private institutions = new BehaviorSubject<Institution[]>([]);
  private donations = new BehaviorSubject<Donation[]>([]);

  constructor() {
    // Remover todos os dados existentes (opcional - remova depois se quiser manter os dados)
    localStorage.removeItem('institutions');
    localStorage.removeItem('donations');
    
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const storedInstitutions = localStorage.getItem('institutions');
    if (storedInstitutions) {
      const institutions = JSON.parse(storedInstitutions);
      // Converter strings de data para objetos Date
      institutions.forEach((inst: Institution) => {
        inst.createdAt = new Date(inst.createdAt);
      });
      this.institutions.next(institutions);
    } else {
      // Inicializa com um array vazio em vez de adicionar exemplos
      this.institutions.next([]);
    }

    const storedDonations = localStorage.getItem('donations');
    if (storedDonations) {
      const donations = JSON.parse(storedDonations);
      // Converter strings de data para objetos Date
      donations.forEach((donation: Donation) => {
        donation.createdAt = new Date(donation.createdAt);
      });
      this.donations.next(donations);
    } else {
      // Inicializa com um array vazio
      this.donations.next([]);
    }
  }

  private saveToStorage() {
    localStorage.setItem('institutions', JSON.stringify(this.institutions.value));
    localStorage.setItem('donations', JSON.stringify(this.donations.value));
  }

  // Instituições
  getInstitutions(): Observable<Institution[]> {
    return this.institutions.asObservable();
  }

  getInstitution(id: string): Institution | undefined {
    return this.institutions.value.find(inst => inst.id === id);
  }

  addInstitution(institution: Institution) {
    if (!institution.id) {
      institution.id = uuidv4();
    }
    institution.createdAt = new Date();
    
    const current = this.institutions.value;
    const updated = [...current, institution];
    this.institutions.next(updated);
    this.saveToStorage();
  }

  updateInstitution(institution: Institution) {
    const current = this.institutions.value;
    const updated = current.map(i => i.id === institution.id ? institution : i);
    this.institutions.next(updated);
    this.saveToStorage();
  }

  deleteInstitution(id: string) {
    const current = this.institutions.value;
    const updated = current.filter(i => i.id !== id);
    this.institutions.next(updated);
    this.saveToStorage();
  }

  // Doações
  getDonations(): Observable<Donation[]> {
    return this.donations.asObservable();
  }

  getDonationsByInstitution(institutionId: string): Donation[] {
    return this.donations.value.filter(donation => donation.institutionId === institutionId);
  }

  addDonation(donation: Donation) {
    if (!donation.id) {
      donation.id = uuidv4();
    }
    
    // Garantir que amount seja um número
    if (typeof donation.amount === 'string') {
      // Remove qualquer formatação de moeda e converte para número
      const cleanValue = donation.amount
        .replace(/R\$\s*/g, '')
        .replace(/\./g, '')
        .replace(',', '.');
      
      donation.amount = parseFloat(cleanValue) || 0;
    }
    
    donation.createdAt = new Date();
    donation.status = 'pending';
    
    const institution = this.getInstitution(donation.institutionId);
    if (institution) {
      donation.institutionName = institution.name;
    }
    
    const current = this.donations.value;
    const updated = [...current, donation];
    this.donations.next(updated);
    this.saveToStorage();
    
    // Simular processamento de pagamento após 2 segundos
    setTimeout(() => {
      this.processPayment(donation.id);
    }, 2000);
    
    return donation;
  }
  
  processPayment(donationId: string) {
    const current = this.donations.value;
    const updated = current.map(d => {
      if (d.id === donationId) {
        return {
          ...d,
          status: 'completed' as 'pending' | 'completed' | 'failed',
          transactionId: `TX-${Math.floor(Math.random() * 1000000)}`
        };
      }
      return d;
    });
    this.donations.next(updated);
    this.saveToStorage();
  }
}