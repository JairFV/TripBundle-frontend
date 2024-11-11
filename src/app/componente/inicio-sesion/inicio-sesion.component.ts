import {Component, inject, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ResponseDto} from "../../model/response-dto";
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {UserDto} from '../../model/user-dto';
import {LoginService} from '../../services/login-service';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [
    MatCard,
    MatFormFieldModule,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'] // Asegúrate de que sea 'styleUrls'
})
export class InicioSesionComponent   {
  username: string = '';
  password: string = '';
  router: Router = inject(Router);
  loginForm: FormGroup;
  fb = inject(FormBuilder);
  loginService: LoginService = inject(LoginService);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      localStorage.removeItem('token');
      console.log("Token eliminado");
    }
    this.loadForm()
  }

  loadForm(): void {
    console.log("Form");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userDto: UserDto = new UserDto()
      userDto.username = this.loginForm.value.username;
      userDto.password = this.loginForm.value.password;
      let responseDTO: ResponseDto = new ResponseDto();
      this.loginService.login(userDto).subscribe({
        next: (data: ResponseDto): void => {
          console.log("Login response ROLs:", data.roles);
          console.log("Login response ROL:", data.roles[0]);
          localStorage.setItem('rol', data.roles[0]);
        },
        error: (error: any) => {
          console.error(error);
          this.router.navigate(['inicio-sesion']);
        }
      })
      alert("Login ok!")
      this.router.navigate(['/home'])
    } else {
      alert("Formulario no valido!")
      console.log("Formulario no valido");
    }
  }

}
