import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Institution } from '../../models/institution.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class HomePage implements OnInit {
  institutions: Institution[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getInstitutions().subscribe(institutions => {
      this.institutions = institutions;
    });
  }
}
