import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from '../services/login-service';
import {inject} from '@angular/core';

export const guardarLoginGuard: CanActivateFn = (route, state) => {

  let loginService=inject(LoginService);
  let router=inject(Router);

  if(loginService.getToken()){
    return true

  }else{
    router.navigate(['/inicio-sesion']).then(r=> console.log("Acceso sin token controlado!"));
    return false;
  }

};
