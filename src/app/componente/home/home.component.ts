import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {Router} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavbarComponent,
    MatToolbarModule
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
