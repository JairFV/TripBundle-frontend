import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Fauna} from '../model/fauna';
import {Flora} from '../model/flora';

@Injectable({
  providedIn: 'root'
})
export class FloraService {
  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Flora[]>();

  constructor() { }
  list(): Observable<any>{
    return this.http.get<Flora[]>(this.url + "/floras");
  }
  listId(id: number): Observable<any>{
    console.log(this.url + "/floras/" + id)
    return this.http.get<Flora[]>(this.url + "/flora/" + id);
  }
  insert(flora: Flora): Observable<any>{
    return this.http.post(this.url + "/insertarflora", flora);
  }
  update(flora: Flora): Observable<any>{
    return this.http.put(this.url + "/fauna", flora);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/flora/{id}/" + id);
  }
  setList(listaNueva : Flora[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }


}
