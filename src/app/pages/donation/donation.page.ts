import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Donation } from '../../models/donation.model';
import { Institution } from '../../models/institution.model';
import { MaskModule } from '../../shared/mask.module';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.page.html',
  styleUrls: ['./donation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MaskModule]
})
export class DonationPage implements OnInit {
  institution?: Institution;
  donation: Donation = {
    id: '',
    institutionId: '',
    institutionName: '',
    amount: 0,
    donorName: '',
    donorEmail: '',
    message: '',
    status: 'pending',
    createdAt: new Date()
  };

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.institution = this.dataService.getInstitution(id);
      if (this.institution) {
        this.donation.institutionId = id;
        this.donation.institutionName = this.institution.name;
      }
    }
  }

  async makeDonation() {
    if (!this.validateForm()) {
      return;
    }
    
    const loading = await this.loadingController.create({
      message: 'Processando doação...',
      spinner: 'circles'
    });
    await loading.present();
    
    try {
      const donation = this.dataService.addDonation(this.donation);
      
      setTimeout(async () => {
        await loading.dismiss();
        
        const toast = await this.toastController.create({
          message: 'Doação realizada com sucesso!',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
        
        this.router.navigate(['/donation-receipt', donation.id]);
      }, 2000);
    } catch (error) {
      await loading.dismiss();
      
      const toast = await this.toastController.create({
        message: 'Erro ao processar a doação. Tente novamente.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
  
  validateForm(): boolean {
    // Se usar a máscara de moeda, precisamos converter o valor formatado
    let amountValue = this.donation.amount;
    
    if (typeof amountValue === 'string') {
      // Remove R$, espaços e converte vírgula para ponto
      const cleanedValue = amountValue
        .replace('R$', '')
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(',', '.');
        
      amountValue = parseFloat(cleanedValue);
      this.donation.amount = amountValue;
    }
    
    if (!amountValue || isNaN(amountValue) || amountValue <= 0) {
      this.presentToast('Por favor, informe um valor válido para a doação.');
      return false;
    }
    
    return true;
  }
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
}
