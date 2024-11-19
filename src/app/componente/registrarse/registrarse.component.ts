import {Component, inject} from '@angular/core';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import {UsuarioService} from '../../services/usuario.service';
import {Usuario} from '../../model/usuario';
import {UserDto} from '../../model/user-dto';
import {LoginService} from '../../services/login-service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [
    MatFormField,
    MatFormFieldModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatFormField,
    MatInput,
  ],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  registrarForm: FormGroup;
  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  registrarService: UsuarioService = inject(UsuarioService);
  authService: LoginService = inject(LoginService);
  router: Router = inject(Router);
  //edicion
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  id: number = 0

  constructor() {
    console.log("Constructor ConsultorioNuevoEditComponent")
    this.registrarForm = this.fb.group({
      id: [''],
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      rol: ['', Validators.required],
    })
  }


  ngOnInit(): void { //sólo una vez luego del constructor
    this.route.params.subscribe((data: Params) => {
      console.log("ngOnInit de ConsultorioNuevoEditComponent")
      console.log(data);
      this.id = data['id']; //capturando el id del listado
      this.edicion = data['id'] != null;//true, false
      this.cargaForm();
    });
  }

  cargaForm() {
    if (this.edicion) {
      this.registrarService.listId(this.id).subscribe((data: Usuario) => {
        console.log(data);
        this.registrarForm.patchValue({
          dni: data.dni,
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          email: data.email,
          username: data.username,
          password: data.password,
          fechaNacimiento: data.fechaNacimiento,
          rol: data.rol,
        });
      });
    }
  }

  registrar() {
    if (this.registrarForm.valid) {
      const usuario: Usuario = new Usuario();
      usuario.id = this.id;
      usuario.dni = this.registrarForm.value.dni;
      usuario.nombre = this.registrarForm.value.nombre;
      usuario.apellido = this.registrarForm.value.apellido;
      usuario.telefono = this.registrarForm.value.telefono;
      usuario.email = this.registrarForm.value.email;
      usuario.username = this.registrarForm.value.username;
      usuario.password = this.registrarForm.value.password;
      usuario.fechaNacimiento = this.registrarForm.value.fechaNacimiento;
      usuario.rol = this.registrarForm.value.rol;

      this.registrarService.insert(usuario).subscribe((user: Usuario) => {

        if (user != null) {
          ///generar token
          const user: UserDto = {
            username: this.registrarForm.get('username')!.value,
            password: this.registrarForm.get('password')!.value
          }

          this.authService.login(user).subscribe({
            next: (_data) => {
              this.router.navigateByUrl("/inicio-sesion");
            },
            error: (err) => {
              console.log(err)
            },
          })

          this.registrarForm.reset()
        } else {
          this.snackBar.open('Cambie de Username: ' + usuario.username, '', {
            duration: 3000
          })


        }

      })
    }
  }
}
