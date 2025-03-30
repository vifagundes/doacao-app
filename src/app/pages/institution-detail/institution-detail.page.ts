import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Institution } from '../../models/institution.model';
import { Donation } from '../../models/donation.model';

@Component({
  selector: 'app-institution-detail',
  templateUrl: './institution-detail.page.html',
  styleUrls: ['./institution-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class InstitutionDetailPage implements OnInit {
  institution?: Institution;
  recentDonations: Donation[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.institution = this.dataService.getInstitution(id);
      this.recentDonations = this.dataService.getDonationsByInstitution(id);
    }
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
