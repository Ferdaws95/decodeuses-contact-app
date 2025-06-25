import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  imports: [ FormsModule,MatListModule,  RouterModule,  MatListModule,
    RouterModule,
    MatInputModule,
    FormsModule, //Necessaire pour la directive ngModel (template driven form)
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule],
  templateUrl: './contact-favoris.html',
  styleUrl: './contact-favoris.css'
})
export class ContactFavoris implements OnInit {

constructor(private contactService: ContactService ,) {}
searchTerm: string = '';
allFavorites: any[] = [];
favoriteContacts: any[] = [];


ngOnInit() {
  this.allFavorites = this.contactService['getFavoriteContacts']();
  this.favoriteContacts = [...this.allFavorites];  //fait une copie de la liste pour que tu puisses la filtrer sans toucher à l’originale.
}

onSearch() {
  const term = this.searchTerm.toLowerCase();
  this.favoriteContacts = this.allFavorites.filter(contact =>
    contact.nom.toLowerCase().includes(term) || contact.email.toLowerCase().includes(term)
  );
}}
