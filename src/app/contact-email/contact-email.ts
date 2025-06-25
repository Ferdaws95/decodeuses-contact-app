import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contact-email',
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './contact-email.html',
  styleUrl: './contact-email.css'
})
export class ContactEmail {

  contact: any = {};
  emailMessage: string = '';

  // Liste simulée — à remplacer par un vrai service dans un vrai projet
  contacts = [
    { id: 1, nom: "Oueslati", prenom: "Ferdaws", email: "fersaidane@gmail.com" },
    { id: 3, nom: "AbdelHamid", prenom: "Ferdaws", email: "abdelHamid@gmail.com" },
    { id: 2, nom: "Jebali", prenom: "Refka", email: "Refkajebali@gmail.com" },
    { id: 4, nom: "Oueslati", prenom: "Haroun", email: "harounoueslati@gmail.com" }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

   //je recupere le Id de mon URL et je le converti au nombre
    //pour faire appel au fetch by ID du service CRUD
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contact = this.contacts.find(c => c.id === id);
  }

  onSubmit() {
    // Exemple d’envoi (à remplacer par appel d’API réel ou mailto:)
    console.log('Envoi à :', this.contact.email);
    console.log('Message :', this.emailMessage);
    alert(`Email envoyé à ${this.contact.email} avec le message : ${this.emailMessage}`);
    this.emailMessage = ''; // Réinitialiser le champ
  }
}
