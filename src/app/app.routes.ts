import { Routes } from '@angular/router';
import {HomeComponent} from './componente/home/home.component';
import {InicioSesionComponent} from './componente/inicio-sesion/inicio-sesion.component';
import {ListaUsuarioComponent} from './componente/lista-usuario/lista-usuario.component';
import {RegistrarseComponent} from './componente/registrarse/registrarse.component';
import {AcercaComponent} from './componente/acerca/acerca.component';

export const routes: Routes = [

  { path: '', component: HomeComponent , pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'acerca', component: AcercaComponent },
  {path: 'inicio-sesion', component: InicioSesionComponent},
  {path: 'usuario', component: ListaUsuarioComponent},
  {path: 'registrarse', component: RegistrarseComponent},




];
