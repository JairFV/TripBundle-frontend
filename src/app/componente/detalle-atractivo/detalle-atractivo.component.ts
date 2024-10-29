import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-detalle-atractivo',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './detalle-atractivo.component.html',
  styleUrl: './detalle-atractivo.component.css'
})
export class DetalleAtractivoComponent {
  constructor(private route: Router) {
  }

  tipoPaquete(url: string): void{
    console.log('url');
    this.route.navigate([url]);
  }
}
