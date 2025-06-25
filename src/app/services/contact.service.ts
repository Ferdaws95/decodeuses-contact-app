import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class ContactService {
private apiURL = 'api/contacts';
private favoriteContacts: any[] = [];

  constructor(private http: HttpClient) { }

getContats() {
  return this.http.get<any[]>(this.apiURL);
}

  getContact(id : number) {
    return this.http.get<any>(this.apiURL+'/'+id);
  }

  addContact(contact: any) {
    return this.http.post<any>(this.apiURL , contact);

  }

  updateContact(contact: any ) {
  return this.http.put<any>(this.apiURL +'/'+ contact.id, contact);
  }

  deleteContact(id:number) {
 return this.http.delete(this.apiURL +'/'+ id);
  }

 addToFavorites(contact: any) {
    if (!this.favoriteContacts.find(c => c.id === contact.id)) { //Cette partie cherche dans le tableau favoriteContacts un contact qui a le même id que celui qu’on veut ajouter.
     //Si la recherche ne trouve aucun contact avec le même id, alors la condition est vraie (le contact n’est pas encore dans les favoris).
      this.favoriteContacts.push(contact);// l'ajouter dans favorieContacts
    }
  }

  getFavoriteContacts(): any[] {
    return this.favoriteContacts;
  }


}
