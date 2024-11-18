import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { LoginService } from '../../services/login-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';

import { finalize } from 'rxjs/operators';
import { UserDto } from '../../model/user-dto';
import { JwtResponse } from '../../model/JwtResponse';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatError
  ]
})
export class InicioSesionComponent implements OnInit {
  loading = false;
  loginError: string | null = null;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Elimina cualquier sesión previa almacenada
    if (localStorage.getItem('token')) {
      localStorage.clear();
      console.log("Información de sesión eliminada");
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginError = null;

      const userDto: UserDto = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      };
      console.log('Credenciales ingresadas:', userDto);

      this.loginService.login(userDto)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (response: JwtResponse) => {
            if (response.token) {
              // Guardar el token y rol en localStorage
              localStorage.setItem('token', response.token);


              if (response.rol && response.rol.length > 0) {
                localStorage.setItem('rol', response.rol[0]);
                console.log("Rol asignado:", response.rol[0]);
              } else {
                console.warn('No se encontró información de roles en la respuesta.');
              }
              console.log("Token recuperado:", response.token);


              // Redirige al usuario a la página principal
              this.router.navigate(['/home']);
            } else {
              this.loginError = 'Respuesta inválida del servidor';
              console.error('La respuesta no contiene token:', response);
            }
          },
          error: (error) => {
            // Manejo de errores
            this.loginError = error.error?.message || 'Error en el inicio de sesión';
            console.error('Error de login:', error);
            this.loginForm.reset();
          }
        });
    } else {
      // Marca los campos como tocados para mostrar mensajes de error
      this.markFormGroupTouched(this.loginForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }

  // Getters para acceder fácilmente a los controles del formulario en la plantilla
  get usernameControl() {
    return this.loginForm.get('username');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
}
