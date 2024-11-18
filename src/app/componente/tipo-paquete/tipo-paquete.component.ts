import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-tipo-paquete',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './tipo-paquete.component.html',
  styleUrl: './tipo-paquete.component.css'
})
export class TipoPaqueteComponent {
  constructor(private route: Router) {
  }

  registroReserva(url: string): void{
    console.log('url');
    this.route.navigate([url]);
  }
}
