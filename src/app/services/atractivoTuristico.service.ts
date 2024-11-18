import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
//import {Usuario} from '../model/usuario';
import {AtractivoTuristico} from '../model/atractivo-turistico';

@Injectable({
  providedIn: 'root'
})
export class AtractivoTuristicoService {
  private url = environment.apiUrl + '/trip'
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<AtractivoTuristico[]>();

  constructor() { }

  list(): Observable<any>{
    return this.http.get<AtractivoTuristico[]>(this.url + "/atractivos");
  }
  listId(id: number): Observable<any>{
    console.log(this.url + "/atractivos/" + id)
    return this.http.get<AtractivoTuristico[]>(this.url + "/atractivos/" + id);
  }
  insert(atractivoTuristico: AtractivoTuristico): Observable<any>{
    return this.http.post(this.url + "/insertaratractivo", atractivoTuristico);
  }
  update(atractivoTuristico: AtractivoTuristico): Observable<any>{
    return this.http.put(this.url + "/actualizarAtractivo", atractivoTuristico);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/atractivo/{id}/" + id);
  }
  setList(listaNueva : AtractivoTuristico[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }
}
