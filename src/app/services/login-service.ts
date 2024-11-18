import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserDto } from '../model/user-dto';
import { JwtResponse } from '../model/JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(credentials: UserDto): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.API_URL}/trip/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          // Guardar el token y el rol en localStorage
          localStorage.setItem('jwttoken', response.token);
          localStorage.setItem('role', response.rol);  // Guardar el rol
          console.log('Token guardado tras login:', response.token);
          console.log('Rol guardado:', response.rol);
        }
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
