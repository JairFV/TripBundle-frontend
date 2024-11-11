import {Component, HostListener, Input, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import {NavbarComponent} from './componente/navbar/navbar.component';
import {InicioSesionComponent} from './componente/inicio-sesion/inicio-sesion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass, NavbarComponent, InicioSesionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'TripBundleFront';

  ngOnInit(): void {
  }
  @Input() showLoginButton: boolean = true; // default is true
}
