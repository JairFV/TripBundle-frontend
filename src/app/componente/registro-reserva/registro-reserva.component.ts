import {Component, inject} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {MatToolbar} from '@angular/material/toolbar';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {UsuarioService} from '../../services/usuario.service';
import {PaqueteService} from '../../services/paquete.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from '../../model/usuario';
import {ReservaService} from '../../services/reserva.service';
import {Reserva} from '../../model/reserva';

@Component({
  selector: 'app-registro-reserva',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf,
    MatButton,
    NavbarComponent
  ],
  templateUrl: './registro-reserva.component.html',
  styleUrl: './registro-reserva.component.css'
})
export class RegistroReservaComponent {
  reservaForm: FormGroup;
  fb = inject(FormBuilder);
  reservaService: ReservaService = inject(ReservaService);
  usuarioService: UsuarioService = inject(UsuarioService);
  paqueteService: PaqueteService = inject(PaqueteService);
  router: Router = inject(Router);
  //edicion
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  id: number = 0
  public idUsuario: number = 0;
  public idAdministrador: number = 0;
  public idPaquete: number = 0;
  lista: Usuario[] = [];
  nuevoUsuario: Usuario = new Usuario();

  constructor() {
    console.log("Constructor ProveedorNuevoEditComponent")
    this.reservaForm = this.fb.group({
      id: [''],
      detalleReserva: ['', Validators.required],
      fechaReserva: ['', Validators.required],
      cantidadPersonas: ['', Validators.required],
      nuevoUsuario: ['', Validators.required],
    })
  }


  ngOnInit(): void { //sólo una vez luego del constructor
    console.log("ngOnInit de ProductoComponent, Load Lista de Tipos Productos")
    this.loadLista();
  }

  loadLista(): void {
    this.usuarioService.list().subscribe({
      next: (data: Usuario[]) => {
        this.lista = data;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  onSubmit() {
    if (this.reservaForm.valid) {
      const reserva: Reserva = new Reserva();
      reserva.id = 0;
      reserva.detalleReserva = this.reservaForm.value.detalleReserva;
      reserva.fechaReserva = this.reservaForm.value.fechaReserva;
      reserva.cantidadPersonas = this.reservaForm.value.cantidadPersonas;
      reserva.idUsuario = this.idUsuario;
      /*reserva.idUsuario.id = this.reservaForm.value.tipoProducto;
      console.log("Producto validado para registrar:", producto);
      this.productoService.insert(producto).subscribe({
        next: (data: Object): void => {
          console.log("Producto registrado:", data);
        }
      })*/
      alert("Producto registrado!")
      this.router.navigate([''])
    } else {
      alert("Formulario no valido!")
      console.log("Formulario no valido");
    }
  }
}
