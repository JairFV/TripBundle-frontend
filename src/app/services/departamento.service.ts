import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Departamento } from '../model/departamento';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private url = `${environment.apiUrl}/departamentos`;
  private listaSubject = new BehaviorSubject<Departamento[]>([]);

  constructor(private http: HttpClient) {}

  // Get the observable list
  getList(): Observable<Departamento[]> {
    return this.listaSubject.asObservable();
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
