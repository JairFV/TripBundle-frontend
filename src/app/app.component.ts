import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TripBundle';
  nombre: string = 'Roly';

  footerVisible = false; // Controla la visibilidad del footer
  isMenuOpen = false;
  isDropdownOpen: boolean = false;
  lastScrollY = 0; // Almacena la posición de desplazamiento anterior

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // Alternar el menú móvil
  }

  toggleDropdown(isOpen: boolean): void {
    this.isDropdownOpen = isOpen; // Alternar el menú desplegable
  }

  ngOnInit() {
    this.footerVisible = false; // Inicialmente, el footer está oculto
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY; // Posición actual de desplazamiento
    const documentHeight = document.documentElement.scrollHeight; // Altura total del documento
    const windowHeight = window.innerHeight; // Altura de la ventana visible

    // Verifica si se ha llegado al final del contenido
    if (scrollY + windowHeight >= documentHeight) {
      this.footerVisible = true; // Muestra el footer al llegar al final
    } else if (scrollY < this.lastScrollY) {
      this.footerVisible = false; // Oculta el footer al desplazarse hacia arriba
    }

    this.lastScrollY = scrollY; // Actualiza la posición de desplazamiento anterior
  }
}
