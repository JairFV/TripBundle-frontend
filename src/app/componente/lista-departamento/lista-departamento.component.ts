import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import {CdkTableDataSourceInput} from '@angular/cdk/table';
import {MatPaginator} from '@angular/material/paginator';
import {Usuario} from '../../model/usuario';
import {UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogoComponent} from '../lista-usuario/confirm-dialogo/confirm-dialogo.component';
import {Departamento} from '../../model/departamento';
import {DepartamentoService} from '../../services/departamento.service';

@Component({
  selector: 'app-lista-departamento',
  standalone: true,
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatSortModule,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator
  ],
  templateUrl: './lista-departamento.component.html',
  styleUrl: './lista-departamento.component.css'
})
export class ListaDepartamentoComponent implements OnInit,AfterViewInit {
  lista: Departamento[] = [];
  displayedColumns: string[] = ['id' ,'nombre','descripcion' ];

  dataSource: MatTableDataSource<Departamento> = new MatTableDataSource<Departamento>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  departamentoService: DepartamentoService = inject(DepartamentoService);
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
    // Suscribirse al observable de la lista de departamentos
    this.departamentoService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadLista();
  }


  loadLista(): void {
    this.departamentoService.list().subscribe({
      next: (data) => {
        this.departamentoService.setList(data); //enviar la nueva lista a los suscriptores
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
    this.departamentoService.delete(id).subscribe(() => {
      this.departamentoService.list().subscribe(data => {
        this.departamentoService.setList(data);//enviar la nueva lista a los suscriptores
      });
    });
  }


}
