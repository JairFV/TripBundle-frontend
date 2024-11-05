import {inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Usuario} from '../model/usuario';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Fauna} from '../model/fauna';
import {Pago} from '../model/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Pago[]>();

  constructor() { }
  list(): Observable<any>{
    return this.http.get<Pago[]>(this.url + "/pagos");
  }
  listId(id: number): Observable<any>{
    console.log(this.url + "/pagos/" + id)
    return this.http.get<Pago[]>(this.url + "/pagos/" + id);
  }
  insert(pago: Pago): Observable<any>{
    return this.http.post(this.url + "/insertarPagos", pago);
  }
  update(pago: Pago): Observable<any>{
    return this.http.put(this.url + "/fauna", pago);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(this.url + "/fauna/{id}/" + id);
  }
  setList(listaNueva : Pago[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }

}
