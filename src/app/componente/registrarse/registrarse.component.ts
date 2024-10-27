import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  constructor(private route: Router) {
  }

  inicioSesion(url: string): void{
    console.log('url');
    this.route.navigate([url]);
  }
}
