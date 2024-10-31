 /**import {Component, inject, OnInit} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {UsuarioService} from '../../services/usuario.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Usuario} from '../../model/usuario';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput
  ],
  templateUrl:'./registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent implements OnInit{
  usuarioForm: FormGroup;
  fb = inject(FormBuilder);
  usuarioService: UsuarioService = inject(UsuarioService);
  router: Router = inject(Router);
  //edicion
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  id: number = 0

  constructor() {
    console.log("Constructor ProveedorNuevoEditComponent")
    this.usuarioForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("^\\d{9}$")]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void { //sólo una vez luego del constructor
    this.route.params.subscribe((data: Params) => {
      console.log("ngOnInit de ProveedorNuevoEditComponent")
      console.log(data);
      this.id = data['id']; //capturando el id del listado
      this.edicion = data['id'] != null;//true, false
      this.cargaForm();
    });
  }
  cargaForm() {
    if (this.edicion) {
      this.usuarioService.listId(this.id).subscribe((data: Usuario) => {
        console.log(data);
        this.usuarioForm.patchValue({
          nombre: data.nombre,
          apellido: data.apellido,
          fechaNacimiento: data.fechaNacimiento,
          telefono: data.telefono,
          email: data.email,
          username: data.username,
          password: data.password,
        });
      });
    } //del if
  } // de cargaForm

  registrar() {
    if (this.usuarioForm.valid) {
      const usuario: Usuario = new Usuario();
      usuario.id = this.id;
      usuario.nombre = this.usuarioForm.value.nombre;
      usuario.apellido = this.usuarioForm.value.apellido;
      usuario.fechaNacimiento = this.usuarioForm.value.fechaNacimiento;
      usuario.telefono = this.usuarioForm.value.telefono;
      usuario.email = this.usuarioForm.value.email;
      usuario.username = this.usuarioForm.value.username;
      usuario.password = this.usuarioForm.value.password;
      if (!this.edicion) {
        console.log("Datos aceptado:", usuario);
        this.usuarioService.insert(usuario).subscribe((data: Object): void => {
            console.log("Datos insertados:", data);
          }
        );
      } else {
        //update
        console.log("Datos aceptado:", usuario);
        this.usuarioService.update(usuario).subscribe((data: Object): void => {
            console.log("Datos actualizados:", data);
          }
        );
      }
      this.router.navigate(['register-user']);
    } else {
      console.log("Formulario no valido");
    }
  }
}
*/
