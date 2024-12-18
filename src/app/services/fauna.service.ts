import {inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Usuario} from '../model/usuario';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Fauna} from '../model/fauna';

@Injectable({
  providedIn: 'root'
})
export class FaunaService {
  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Fauna[]>();

  constructor() { }
  list(): Observable<any>{
    return this.http.get<Fauna[]>(this.url + "/faunas");
  }
  listId(id: number): Observable<any>{
    console.log(this.url + "/faunas/" + id)
    return this.http.get<Fauna[]>(this.url + "/faunas/" + id);
  }
  insert(fauna: Fauna): Observable<any>{
    return this.http.post(this.url + "/insertarfauna", fauna);
  }
  update(fauna: Fauna): Observable<any>{
    return this.http.put(this.url + "/fauna", fauna);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/fauna/{id}/" + id);
  }
  setList(listaNueva : Fauna[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }

}
