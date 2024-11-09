import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Usuario} from '../model/usuario';
import {Administrador} from '../model/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Administrador[]>();

  constructor() { }

  list(): Observable<any>{
    return this.http.get<Administrador[]>(this.url + "/administradores");
  }
  listId(id: number): Observable<any>{
    console.log(this.url + "/administrador/" + id)
    return this.http.get<Usuario[]>(this.url + "/administrador/" + id);
  }
  insert(usuario: Usuario): Observable<any>{
    return this.http.post(this.url + "/insertarusuario", usuario);
  }
  update(usuario: Usuario): Observable<any>{
    return this.http.put(this.url + "/actualizarAdmin", usuario);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/eliminar/{id}/" + id);
  }
  setList(listaNueva : Administrador[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }




}
