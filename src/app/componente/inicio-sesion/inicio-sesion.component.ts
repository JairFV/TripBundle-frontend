import { Component } from '@angular/core';
import {Router} from '@angular/router';



@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {

  constructor(private route: Router) {
  }



  opcionDepartamento(url: string): void{
    console.log('url');
    this.route.navigate([url]);
  }


  registrateAqui(url: string): void {
    console.log('url');
    this.route.navigate([url]);
  }
}
