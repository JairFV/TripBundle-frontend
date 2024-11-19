import { Component } from '@angular/core';
import {ListaDepartamentoComponent} from '../lista-departamento/lista-departamento.component';
import {Router} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';


@Component({
  selector: 'app-lista-registros',
  standalone: true,

  templateUrl: './lista-registros.component.html',
  imports: [
    NavbarComponent
  ],
  styleUrl: './lista-registros.component.css'
})
export class ListaRegistrosComponent {
  cityName: ListaDepartamentoComponent;

  constructor(private router: Router) {}
  navigateToFormDep() {
    this.router.navigate(['/lista-departamento']);
  }


  navigateToFormUser() {
    this.router.navigate(['/lista-usuarios']);
  }

  navigateToFormFlora() {
    this.router.navigate(['/lista-flora']);
  }

  navigateToFormAtractivo() {
    this.router.navigate(['/lista-atractivo-turistico']);
  }

  navigateToFormAdmin() {
    this.router.navigate(['/lista-administrador']);
  }

  navigateToFormFauna() {
    this.router.navigate(['/lista-fauna']);
  }
}
