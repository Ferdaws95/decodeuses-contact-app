/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactService } from '../services/contact.service';   //Le ContactService sert à communiquer avec l’API ou la source de données (GET, POST, PUT...).
import { ContactFormModel } from '../models/models/contact-form.model';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,

  ],
  templateUrl: './contact-detail.html',
  styleUrls: ['./contact-detail.css']
})
export class ContactDetail implements OnInit {
  formGroup!: FormGroup;  //formGroup: structure du formulaire
  imagePreview: string | ArrayBuffer | null = null;
  Id: number | null = null;   //: identifiant du contact à éditer (s’il y en a un dans l’URL)
  Edit: any | undefined;   //Edit: booléen indiquant si c’est une édition (true) ou une création (false).

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {   //Le composant implémente OnInit → permet d’exécuter du code à l’initialisation avec ngOnInit().
    this.Id = Number(this.route.snapshot.paramMap.get('id'));  //Récupère l’ID depuis l’URL (ActivatedRoute).
    this.Edit = this.Id > 0;
    this.formGroup = this.fb.group({    //Initialise le FormGroup avec des Validators.
      id: [null],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      dueDate: [null],
      completed: [false],
      imagePreview: [null]
    });

  if (this.Edit) {
    this.contactService.getContact(this.Id).subscribe(data => {
      this.formGroup.patchValue({
        id: data.id,
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        number: data.number,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        completed: data.completed,
        imagePreview: data.imagePreview || null
      });

      this.imagePreview = data.imagePreview || null;
    });
  }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const contactData = this.formGroup.value;

      if (this.Edit) {
        this.contactService.updateContact(contactData).subscribe(() => {
          console.log('✅ Contact mis à jour');
          this.router.navigate(['contact-list']);
        });
      } else {
        this.contactService.addContact(contactData).subscribe(() => {
          console.log('✅ Nouveau contact ajouté');
          this.router.navigate(['contact-list']);
        });
      }
    } else {
      console.warn('❌ Formulaire invalide');
      this.formGroup.markAllAsTouched();  //En cas d'erreur de validation, tous les champs sont marqués comme "touchés".
    }
  }

  onCancel(): void {
    this.router.navigate(['contact-list']);
  }

  onImageSelected(event: Event): void { //Quand une image est choisie :



    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader(); //elle est lue en base64 via FileReader,

      reader.onload = () => {

        this.formGroup.get('imagePreview')?.setValue(reader.result); // puis stockée dans le champ imagePreview du formulaire,
        this.imagePreview = reader.result; //et affichée dans le formulaire via imagePreview.
      };
      reader.readAsDataURL(file);
    }
  }
}
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ContactService } from '../services/contact.service';
import { ContactFormModel } from '../models/models/contact-form.model';
import { Contact } from '../models/contact';// ✅ (optionnel) Interface des données contact

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './contact-detail.html',
  styleUrls: ['./contact-detail.css']
})
export class ContactDetail implements OnInit {
  formGroup!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  Id: number | null = null;
  Edit: boolean = false;

  contactFormModel!: ContactFormModel;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.Id = Number(this.route.snapshot.paramMap.get('id'));
    this.Edit = this.Id > 0;

    this.contactFormModel = new ContactFormModel(this.fb);
    this.formGroup = this.contactFormModel.buildForm();

    if (this.Edit) {
      this.contactService.getContact(this.Id).subscribe((data: Contact) => {
        this.formGroup = this.contactFormModel.buildForm(data);
        this.imagePreview = data.imagePreview || null;
      });
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const contactData = this.formGroup.value;

      if (this.Edit) {
        this.contactService.updateContact(contactData).subscribe(() => {
          console.log('✅ Contact mis à jour');
          this.router.navigate(['contact-list']);
        });
      } else {
        this.contactService.addContact(contactData).subscribe(() => {
          console.log('✅ Nouveau contact ajouté');
          this.router.navigate(['contact-list']);
        });
      }
    } else {
      console.warn('❌ Formulaire invalide');
      this.formGroup.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['contact-list']);
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.formGroup.get('imagePreview')?.setValue(reader.result);
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
