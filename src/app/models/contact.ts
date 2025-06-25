export interface Contact {
  id: number | null;
  nom: string;
  prenom: string;
  email: string;
  number: string;
  dueDate: Date | null;
  completed: boolean;
  imagePreview: string | ArrayBuffer | null;
}
