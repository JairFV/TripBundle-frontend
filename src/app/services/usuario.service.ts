import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Usuario} from "../model/usuario";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = environment.apiUrl + '/trip'
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Usuario[]>();

  constructor() { }

  list(): Observable<any>{
    const token = localStorage.getItem('token'); // Recupera el token del localStorage
    if (!token) {
      // Si no hay token, no permitimos la solicitud
      throw new Error('Token no encontrado');
    }
    return this.http.get<Usuario[]>(this.url + "usuarios");
  }
  listId(id: number): Observable<Usuario> {
    console.log(this.url + "/usuario/" + id);
    return this.http.get<Usuario>(this.url + "/usuario/" + id);
  }
  insert(usuario: Usuario): Observable<any>{
    return this.http.post(this.url + "/insertarusuario", usuario);
  }
  update(usuario: Usuario): Observable<any>{
    return this.http.put(this.url + "/usuario", usuario);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/usuario/" + id);
  }
  setList(listaNueva : Usuario[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }


  getAuthoritiesActual(): string[] {
    const token = localStorage.getItem('token'); // Reemplaza con tu mecanismo de almacenamiento
    if (!token) return [];
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token
      return payload.authorities || []; // Ajusta según el formato del token
    } catch (e) {
      return [];
    }
  }
}
