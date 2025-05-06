import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService, Formulario } from '../services/chat.service';
import { NgIf, NgFor } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  formularios: Formulario[] = [];
  sender = '';
  age = 0;
  course = '';
  email = '';
  city = '';
  phone = '';
  address = '';
  englishLevel = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getFormularios().subscribe(res => {
      this.formularios = res;
    });
  }

  enviarFormulario() {
    if (this.sender.trim() !== '' && this.email.trim() !== '') {
      this.chatService.sendFormulario({
        sender: this.sender,
        age: this.age,
        course: this.course,
        email: this.email,
        city: this.city,
        phone: this.phone,
        address: this.address,
        englishLevel: this.englishLevel,
      }).then(() => {
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.sender = ''; 
    this.course = '';
    this.email = '';
    this.city = '';
    this.phone = '';
    this.address = '';
    this.englishLevel = '';
    this.age = 0;
    this.sender = '';
   
  }
}
