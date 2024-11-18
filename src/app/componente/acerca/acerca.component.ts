import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-acerca',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './acerca.component.html',
  styleUrl: './acerca.component.css'
})
export class AcercaComponent {
    description: string='Bienvenidos a TripBundle';
  title: string='Bienvenidos a TripBundle';

}
