import { Routes } from '@angular/router';
import {HomeComponent} from './componente/home/home.component';
import {InicioSesionComponent} from './componente/inicio-sesion/inicio-sesion.component';
import {ListaUsuarioComponent} from './componente/lista-usuario/lista-usuario.component';
import {RegistrarseComponent} from './componente/registrarse/registrarse.component';
import {AcercaComponent} from './componente/acerca/acerca.component';
import {DetalleDepartamentoComponent} from './componente/detalle-departamento/detalle-departamento.component';
import {OpcionDepartamentoComponent} from './componente/opcion-departamento/opcion-departamento.component';
import {DetalleFloraComponent} from './componente/detalle-flora/detalle-flora.component';
import {DetalleFaunaComponent} from './componente/detalle-fauna/detalle-fauna.component';
import {DetalleComidaComponent} from './componente/detalle-comida/detalle-comida.component';
import {DetalleAtractivoComponent} from './componente/detalle-atractivo/detalle-atractivo.component';
import {TipoPaqueteComponent} from './componente/tipo-paquete/tipo-paquete.component';

export const routes: Routes = [

  { path: '', component: HomeComponent , pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'acerca', component: AcercaComponent },
  {path: 'inicio-sesion', component: InicioSesionComponent},
  {path: 'usuario', component: ListaUsuarioComponent},
  {path: 'registrarse', component: RegistrarseComponent},

  {path: 'detalle-departamento', component: DetalleDepartamentoComponent},
  {path: 'opcion-departamento', component: OpcionDepartamentoComponent},
  {path: 'detalle-flora', component: DetalleFloraComponent},
  {path: 'detalle-fauna', component: DetalleFaunaComponent},
  {path: 'detalle-comida', component: DetalleComidaComponent},
  {path: 'detalle-atractivo', component: DetalleAtractivoComponent},
  {path: 'tipo-paquete', component: TipoPaqueteComponent}
];
