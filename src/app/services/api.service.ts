import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService implements InMemoryDbService  {


 listeContact = [
  { id:1,
    nom: "Oueslati",
    prenom: "Ferdaws",
    email:"fersaidane@gmail.com",
     imagePreview: null
  },
    { id:3,
    nom: "AbdelHamid",
    prenom: "Ferdaws",
    email:"abdelHamid@gmail.com",
     imagePreview: null
  },
  { id:2,
    nom: "Jebali",
    prenom: "Refka",
    email:"Refkajebali@gmail.com",
     imagePreview: null
  },
  { id:4,
    nom: "Oueslati",
    prenom: "Haroun",
    email:"harounoueslati@gmail.com",
     imagePreview: null
  },
]
constructor() { }

  createDb() {
    return {
      contacts: this.listeContact
    };
  }
}

function createDb() {
  throw new Error('Function not implemented.');
}

