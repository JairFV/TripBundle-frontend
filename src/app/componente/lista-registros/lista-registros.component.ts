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
  navigateToForm() {
    this.router.navigate(['/lista-departamento']);
  }


  navigateToForm1() {
    this.router.navigate(['/lista-usuarios']);
  }

  navigateToForm2() {
    this.router.navigate(['/lista-flora']);
  }

  navigateToForm3() {
    this.router.navigate(['/lista-atractivo-turistico']);
  }

  navigateToForm4() {
    this.router.navigate(['/lista-administrador']);
  }

  navigateToForm5() {
    this.router.navigate(['/lista-fauna']);
  }
}
