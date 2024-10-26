import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../model/usuario';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  constructor() { }
  list(): Observable<any> {
    return this.http.get<Usuario[]>(this.url + "/usuarios");
  }
  insert(usuario: Usuario): Observable<any> {
    return this.http.post(this.url + "/usuario", usuario);
  }
  update(usuario: Usuario): Observable<any> {
    return this.http.put(this.url + "/usuario", usuario);
  }
  delete(id: Usuario): Observable<any> {
    return this.http.delete(this.url + "/usuario/" + id);
  }
}
