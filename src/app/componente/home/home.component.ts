import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor( private router: Router) {}

  onLogout() {
    //this.authService.logout();
    this.router.navigate(['/inicio-sesion']);
  }
}
