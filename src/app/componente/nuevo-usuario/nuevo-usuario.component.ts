import {Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {UsuarioService} from '../../services/usuario.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import {Usuario} from '../../model/usuario';

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatFormFieldModule,
    MatButton
  ],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent    {
  usuarioForm: FormGroup;
  fb = inject(FormBuilder);
  usuarioService: UsuarioService= inject(UsuarioService);
  router: Router = inject(Router);

  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  id: number = 0
  constructor() {
    console.log("Constructor NuevoUsuarioComponent");
    this.usuarioForm = this.fb.group({
      id : [''],
      dni: ['', [Validators.required,  ]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("^\\d{9}$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],

    })
  }

  ngOnInit(): void { //sólo una vez luego del constructor
    this.route.params.subscribe((data: Params) => {
      console.log("ngOnInit de NuevoUsuarioComponent ")
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
          dni: data.dni,
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          email: data.email,
          password: data.password,
          fechaNacimiento: data.fechaNacimiento,

        });
      });
    } //del if
  } // de cargaForm




  onSubmit() {
    if (this.usuarioForm.valid) {
      const usuario: Usuario = new Usuario();
      usuario.id = this.id;
      usuario.nombre = this.usuarioForm.value.nombre;
      usuario.apellido = this.usuarioForm.value.apellido;
      usuario.telefono = this.usuarioForm.value.telefono;
      usuario.email = this.usuarioForm.value.email;
      usuario.password = this.usuarioForm.value.password;
      usuario.fechaNacimiento = this.usuarioForm.value.fechaNacimiento;
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
      this.router.navigate(['usuarios']);
    } else {
      console.log("Formulario no valido");
    }

  }
}
