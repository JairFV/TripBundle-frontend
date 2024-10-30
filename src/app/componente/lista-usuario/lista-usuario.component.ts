import {AfterViewInit, Component, Inject, inject, OnInit, ViewChild} from '@angular/core';
import {Usuario} from "../../model/usuario";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {UsuarioService} from "../../services/usuario.service";
import {Router, RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ConfirmDialogoComponent} from "./confirm-dialogo/confirm-dialogo.component";

@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    DatePipe,
    MatSort,
    MatSortHeader,
    MatButton,
    RouterLink
  ],
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.css'
})
export class ListaUsuarioComponent implements OnInit, AfterViewInit {

  lista: Usuario[] = [];
  displayedColumns: string[] = ['id','dni','nombre','apellido', 'telefono', 'email', 'password','fechaNacimiento','accion01','accion02' ];

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  usuarioService: UsuarioService = inject(UsuarioService);
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
    this.usuarioService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadLista();
  }


  loadLista(): void {
    this.usuarioService.list().subscribe({
      next: (data) => {
        this.usuarioService.setList(data); //enviar la nueva lista a los suscriptores
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
    this.usuarioService.delete(id).subscribe(() => {
      this.usuarioService.list().subscribe(data => {
        this.usuarioService.setList(data);//enviar la nueva lista a los suscriptores
      });
    });
  }

}

