import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detalle-departamento',
  standalone: true,
  imports: [],
  templateUrl: './detalle-departamento.component.html',
  styleUrl: './detalle-departamento.component.css'
})
export class DetalleDepartamentoComponent {
  constructor(private route: Router) {
  }

  detalleFauna(url: string): void{
    console.log('url');
    this.route.navigate([url]);
  }

  detalleFlora(url: string): void{
    console.log('url');
    this.route.navigate([url]);
  }

  detalleComida(url: string): void{
    console.log('url');
    this.route.navigate([url]);
  }

  detalleAtractivo(url: string): void{
    console.log('url');
    this.route.navigate([url]);
  }
}
