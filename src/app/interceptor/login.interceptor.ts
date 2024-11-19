import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { catchError, tap, EMPTY, throwError } from 'rxjs';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptando...');
  const token = localStorage.getItem('jwttoken');
  console.log('Token recuperado:', token);

  let authReq = req;

  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log('Solicitud clonada con encabezado de autorización:', authReq.headers.get('Authorization'));
  }

  return next(authReq).pipe(
    tap(event => {
      // Verificar si la respuesta tiene un cuerpo con el token
      if (event && typeof event === 'object' && 'body' in event) {
        const responseBody: any = event.body;
        if (responseBody && responseBody.token) {
          localStorage.setItem('jwttoken', responseBody.token);
          console.log('Token guardado desde la respuesta:', responseBody.token);
        }
      }
    }),
    catchError(error => {
      console.error('Error en la petición:', error);

      if (error.status === HttpStatusCode.Forbidden) {
        alert('NO TIENES PERMISOS!');
        return EMPTY;
      }

      return throwError(() => error);
    })
  );
};
