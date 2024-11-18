import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-detalle-flora',
  standalone: true,
    imports: [
        NavbarComponent
    ],
  templateUrl: './detalle-flora.component.html',
  styleUrl: './detalle-flora.component.css'
})
export class DetalleFloraComponent {

}
