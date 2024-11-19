import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Departamento } from '../model/departamento';
import {environment} from "../../environments/environment";
import {Usuario} from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private url = environment.apiUrl + '/trip'
  private listaSubject = new BehaviorSubject<Departamento[]>([]);

  constructor(private http: HttpClient) {}

  getList(): Observable<any>{
    const token = localStorage.getItem('token'); // Recupera el token del localStorage
    if (!token) {
      // Si no hay token, no permitimos la solicitud
      throw new Error('Token no encontrado');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Departamento[]>(`${this.url}/departamentos`,{ headers });
  }

  // Set a new list for subscribers
  setList(lista: Departamento[]): void {
    this.listaSubject.next(lista);
  }

  // Get the list of departments from the API
  list(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.url);
  }

  // Delete a department by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
