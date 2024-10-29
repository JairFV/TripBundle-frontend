import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-opcion-departamento',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './opcion-departamento.component.html',
  styleUrl: './opcion-departamento.component.css'
})
export class OpcionDepartamentoComponent {
  constructor(private route: Router) {
  }

  detalleDepartamento(url: string): void{
    console.log('url');
    this.route.navigate([url]);
  }
}
