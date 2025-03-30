import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Donation } from '../../models/donation.model';

@Component({
  selector: 'app-donation-receipt',
  templateUrl: './donation-receipt.page.html',
  styleUrls: ['./donation-receipt.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class DonationReceiptPage implements OnInit {
  donation?: Donation;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id) {
      this.router.navigate(['/home']);
      return;
    }
    
    this.dataService.getDonations().subscribe(donations => {
      this.donation = donations.find(d => d.id === id);
      
      if (!this.donation) {
        this.router.navigate(['/home']);
      }
    });
  }
  
  getStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Concluída';
      case 'pending': return 'Pendente';
      case 'failed': return 'Falhou';
      default: return status;
    }
  }
  
  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'danger';
      default: return 'medium';
    }
  }
  
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR') + ' ' + 
           new Date(date).toLocaleTimeString('pt-BR');
  }
  
  formatAmount(amount: string | number): string {
    if (typeof amount === 'number') {
      return amount.toFixed(2).replace('.', ',');
    } else if (typeof amount === 'string') {
      
      if (amount.includes('R$')) {
        return amount.replace('R$', '').trim();
      }
      
      
      const numberValue = parseFloat(amount.replace(',', '.'));
      if (!isNaN(numberValue)) {
        return numberValue.toFixed(2).replace('.', ',');
      }
    }
    
    return '0,00';
  }
}
