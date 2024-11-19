import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {Router, RouterLink} from '@angular/router';
import {CdkTableDataSourceInput} from '@angular/cdk/table';
import {Usuario} from '../../model/usuario';
import {UsuarioService} from '../../services/usuario.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogoComponent} from '../lista-usuario/confirm-dialogo/confirm-dialogo.component';
import {Administrador} from '../../model/administrador';
import {AdministradorService} from '../../services/administrador.service';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-lista-administrador',
  standalone: true,
    imports: [
        MatButton,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatPaginator,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        MatHeaderCellDef,
        RouterLink,
        NavbarComponent
    ],
  templateUrl: './lista-administrador.component.html',
  styleUrl: './lista-administrador.component.css'
})
export class ListaAdministradorComponent implements OnInit, AfterViewInit {
  lista: Administrador[] = [];
  displayedColumns: string[] = ['id','codigo','nombre','apellido', 'email', 'password' ];

  dataSource: MatTableDataSource<Administrador> = new MatTableDataSource<Administrador>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  administradorService: AdministradorService = inject(AdministradorService);
  route: Router = inject(Router);
  dialog = inject(MatDialog)

  constructor() {
    console.log("Load constructor")
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log("Load Lista!");
    // Suscribirse al observable de la lista de usuarios
    this.administradorService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadLista();
  }


  loadLista(): void {
    this.administradorService.list().subscribe({
      next: (data) => {
        this.administradorService.setList(data); //enviar la nueva lista a los suscriptores
      },
      error: (err) => console.error("Error en consulta", err)
    })
  }

  openDialog(id:number){
    const dialogRef = this.dialog.open(ConfirmDialogoComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.delete(id);
      }else{
        console.log("Diálogo respondió no eliminar");
      }
    });
  }

  delete(id:number) {
    this.administradorService.delete(id).subscribe(() => {
      this.administradorService.list().subscribe(data => {
        this.administradorService.setList(data);//enviar la nueva lista a los suscriptores
      });
    });
  }

}
