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
<<<<<<< HEAD
  navigateToFormDep() {
=======
  navigateToForm() {
>>>>>>> 9b3df2db7971bcfa9dc539d755c225afd30aaa2b
    this.router.navigate(['/lista-departamento']);
  }


<<<<<<< HEAD
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
=======
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
>>>>>>> 9b3df2db7971bcfa9dc539d755c225afd30aaa2b
    this.router.navigate(['/lista-fauna']);
  }
}
