



import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';
import { ContactService } from '../services/contact.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-contact-list',
imports: [
    MatListModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, //Necessaire pour la directive ngModel (template driven form)
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule
  ],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})

export class ContactList implements OnInit  {
contact: any;

 readonly dialog = inject(MatDialog);
imagePreview: any;

constructor(private router: Router,private snackBar: MatSnackBar , private contcatservice :ContactService , private fb : FormBuilder , private service:ContactService) {

}
  listeContact : any[] = [];
  searchTerm: string = '';
  listeContactFiltre : any[] = [];
  countContacts = 0;
  textRecherche : string = '';
  selectedId: number | null = null;
  menuOpenedId: number | null = null;
  menu: any;
// A : Créer une variable tableau "listeContact"
// Qui contient deux contacts : moi et ma camarade
// avec "nom" et "prenom"


/* listeContact = [

   nom: ['', Validators.required],
    prenom: ['', Validators.required],
    dueDate: [null, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    number: ['', Validators.required],
    completed: [false],
    imagePreview: [null]  // ✅
*/
/*
  { id:1,
    nom: "Oueslati",
    prenom: "Ferdaws",
    dueDate: "12/05/1995",
    email:"fersaidane@gmail.com",
    number:"0636461779",

  },
    { id:3,
    nom: "AbdelHamid",
    prenom: "Ferdaws",
    dueDate: "12/05/1995",
    email:"abdelHamid@gmail.com",
        number:"0636461779",

  },
  { id:2,
    nom: "Jebali",
    prenom: "Refka",
    dueDate: "10/09/1988",
    email:"Refkajebali@gmail.com",
        number:"0568974589",

  },
  { id:4,
    nom: "Oueslati",
    prenom: "Haroun",
    dueDate: "31/05/2021",
    email:"harounoueslati@gmail.com"   ,
     number:"0658759791",


  },

];
*/

  ngOnInit() {
    this.service.getContats().subscribe(data=>{
    this.listeContact = data;
    this.onSearch();
    });}


/*    // cette fonction sert a chercher tant que le contact contient le terme souhaité
filteredContacts() {
    const term = this.searchTerm.toLowerCase();
    return this.listeContact.filter(contact =>
      contact.nom.toLowerCase().includes(term) ||
      contact.prenom.toLowerCase().includes(term)
    );
  }*/

    /* Methode 1 : Filter
 filteredContacts() {
  const term = this.searchTerm.toLowerCase();
  return this.listeContact.filter(contact =>
    contact.nom.toLowerCase().startsWith(term) ||
    contact.prenom.toLowerCase().startsWith(term)
  );
}*/

//Methode 2: avec la boucle for
    //Utiliser .push pour ajouter à la liste listeContactFiltre

filteredContactsGrouped() {
  const term = this.searchTerm.toLowerCase();
  const grouped: { [key: string]: any[] } = {};

  for (const contact of this.listeContact) { //On boucle sur tous les contacts dans this.listeContact.
    // Filtrer selon le terme recherché
    if (
      contact.nom.toLowerCase().includes(term) ||
      contact.prenom.toLowerCase().includes(term)
    ) {
      // Prendre la première lettre du prénom (ou du nom)
      const initial = contact.prenom.charAt(0).toUpperCase();

      // Si ce groupe n'existe pas encore, on le crée
      if (!grouped[initial]) {
        grouped[initial] = [];  //On crée un tableau vide pour cette lettre dans grouped.
      }

      // On ajoute le contact au bon groupe
      grouped[initial].push(contact);
    }
  }

  return grouped;  ///Une fois tous les contacts triés et groupés, on retourne l'objet grouped.
}
getKeys(obj: any): string[] {
  return Object.keys(obj);  // retourne toutes les clés (lettres) d’un objet :
}
filteredContacts() {
  const term = this.searchTerm.toLowerCase();
  const listeContactFiltre = [];

  for (const contact of this.listeContact) {
    if (
      contact.nom.toLowerCase().startsWith(term) ||
      contact.prenom.toLowerCase().startsWith(term)
    ) {
      listeContactFiltre.push(contact);
    }
  }

  return listeContactFiltre;
}


onSearch() {
    console.log(this.searchTerm);
  }

trackById(index: number, contact: any) {
    return contact.id;
  }

onAddContact() {
    this.router.navigate(['contact-detail']);
  }

onDelete(id: number ): void {


     const dialogRef = this.dialog.open(ConfirmationDialog);
    dialogRef.afterClosed().subscribe(result => {
     if (result === true) {
      console.log("L'utilisateur a confirmé");

      if (id == null) return;

      // Méthode 1 : suppression par filter
      this.listeContact = this.listeContact.filter(contact => contact.id !== id);

      // Affichage d'une notification
      this.snackBar.open('Contact supprimé', '', { duration: 1000 });


    }
    else if (result === false) {
      console.log('L\'utilisateur a annulé');
    } else {
      console.log('La boîte de dialogue a été fermée sans action explicite');
    }
  });
/*
  if (id == null) return;
    // ma methode pour delete
      this.listeContact = this.listeContact.filter(contact => contact.id !== id);
      // Tu peux afficher un snackBar ici si tu veux
      this.snackBar.open('Contact supprimé', '', { duration: 1000 });
      */
        /// Methode 2 pour delete
    //const index = this.listeContact.findIndex(item=>item.id==id)
    //this.listeContact.splice(index,1);
    //this.onSearch()


}
onFavoriteContact(contact: any) {
  this.contcatservice.addToFavorites(contact);
  this.router.navigate(['/contact-favoris']);
}


sendEmail(contact: { id: { email: string } }) {
    const email = contact.id.email;
    const subject = encodeURIComponent('Sujet du message');
    const body = encodeURIComponent('Bonjour, je vous contacte depuis mon application Angular.');

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }


}
