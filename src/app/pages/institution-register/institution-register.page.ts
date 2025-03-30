import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Institution } from '../../models/institution.model';
import { MaskModule } from '../../shared/mask.module';

@Component({
  selector: 'app-institution-register',
  templateUrl: './institution-register.page.html',
  styleUrls: ['./institution-register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MaskModule]
})
export class InstitutionRegisterPage {
  institution: Institution = {
    id: '',
    name: '',
    cnpj: '',
    description: '',
    needs: '',
    contact: {
      phone: '',
      email: ''
    },
    createdAt: new Date()
  };

  constructor(
    private dataService: DataService,
    private router: Router,
    private toastController: ToastController
  ) {}

  validateForm(): boolean {
    if (!this.institution.name || !this.institution.cnpj || !this.institution.description) {
      this.presentToast('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    
    // Remover caracteres não numéricos para validação
    const cnpjNumbers = this.institution.cnpj.replace(/\D/g, '');
    
    // Validação simples de CNPJ
    if (cnpjNumbers.length !== 14) {
      this.presentToast('CNPJ inválido. Deve ter 14 dígitos.');
      return false;
    }
    
    return true;
  }

  async saveInstitution() {
    if (!this.validateForm()) {
      return;
    }
    
    // Aqui mantemos a formatação do CNPJ para exibição
    // Se preferir armazenar apenas os números, descomente a linha abaixo
    // this.institution.cnpj = this.institution.cnpj.replace(/\D/g, '');
    
    this.dataService.addInstitution(this.institution);
    
    const toast = await this.toastController.create({
      message: 'Instituição cadastrada com sucesso!',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
    
    this.router.navigate(['/home']);
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
