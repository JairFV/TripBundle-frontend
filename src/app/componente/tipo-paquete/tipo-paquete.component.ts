import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tipo-paquete',
  standalone: true,
  imports: [],
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
