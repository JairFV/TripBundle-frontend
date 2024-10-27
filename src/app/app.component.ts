import {Component, HostListener} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TripBundle';
  nombre: string='Roly';

  footerVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Verifica si el usuario ha llegado a la parte inferior de la página
    if (scrollY + windowHeight >= documentHeight - 50) {
      this.footerVisible = true;  // Muestra el footer
    } else {
      this.footerVisible = false; // Oculta el footer
    }
  }
}
