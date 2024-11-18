import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const permisos = this.usuarioService.getAuthoritiesActual();

    if (permisos && permisos.includes('ADMIN')) {
      return true;
    }

    // Redirige a login si no tiene permisos de ADMIN
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const permisos = this.usuarioService.getAuthoritiesActual();

    if (permisos && permisos.includes('USER')) {
      return true;
    }

    // Redirige a login si no tiene permisos de USER
    this.router.navigate(['/login']);
    return false;
  }
}
