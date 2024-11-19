import {inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Reserva} from '../model/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Reserva[]>();

  constructor() { }

  list(): Observable<any>{
    return this.http.get<Reserva[]>(this.url + "/reservas");
  }
  listId(id: number): Observable<any>{
    console.log(this.url + "/reserva/" + id)
    return this.http.get<Reserva[]>(this.url + "/reserva/" + id);
  }
  insert(reserva: Reserva): Observable<any>{
    return this.http.post(this.url + "/insertarReserva", reserva);
  }
  update(reserva: Reserva): Observable<any>{
    return this.http.put(this.url + "/reserva", reserva);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/reserva/" + id);
  }
  setList(listaNueva : Reserva[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }
}
