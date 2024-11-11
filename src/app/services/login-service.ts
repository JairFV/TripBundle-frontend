import {inject, Injectable} from '@angular/core';
import {map, Observable, Subject} from 'rxjs';
import {Usuario} from '../model/usuario';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Fauna} from '../model/fauna';
import {Pago} from '../model/pago';
import {UserDto} from '../model/user-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  login(userDto:UserDto ): Observable<any> {
    console.log("Enviando:", UserDto)
    return this.http.post(this.url + "/authenticate", UserDto,
      {observe: 'response'}).pipe(map((response) => {
        const body = response.body;
        console.log("Body:", body)
        const headers = response.headers;
        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer ', '');
        console.log("Authorization:", bearerToken)
        localStorage.setItem('token', token);
        return body;
      }
    ));
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
