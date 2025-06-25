import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../contact';

export class ContactFormModel {
  constructor(private fb: FormBuilder) {}

  buildForm(contact?: Contact): FormGroup {
    return this.fb.group({
      id: [contact?.id ?? null],
      nom: [contact?.nom ?? '', Validators.required],
      prenom: [contact?.prenom ?? '', Validators.required],
      email: [contact?.email ?? '', [Validators.required, Validators.email]],
      number: [contact?.number ?? '', Validators.required],
      dueDate: [contact?.dueDate ?? null],
      completed: [contact?.completed ?? false],
      imagePreview: [contact?.imagePreview ?? null],
    });
  }
}
