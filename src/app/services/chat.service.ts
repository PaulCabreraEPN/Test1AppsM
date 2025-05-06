import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Formulario {
  createdAt: number;
  sender: string;
  id?: string;
  age: number ;
  course: string;
  email: string;
  city: string;
  phone: string;
  address?: string;
  englishLevel?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private firestore: Firestore) {}

  // Obtener formularios ordenados por fecha de creación
  getFormularios(): Observable<Formulario[]> {
    const formulariosRef = collection(this.firestore, 'formularios');
    const q = query(formulariosRef, orderBy('createdAt'));
    return collectionData(q, { idField: 'id' }) as Observable<Formulario[]>;
  }

  // Enviar un nuevo formulario
  sendFormulario(data: Omit<Formulario, 'createdAt' | 'id'>): Promise<any> {
    const formulariosRef = collection(this.firestore, 'formularios');
    const formulario: Formulario = {
      ...data,
      createdAt: Date.now(),
    };
    return addDoc(formulariosRef, formulario);
  }
}


