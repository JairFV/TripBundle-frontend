import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
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
import {CdkTableDataSourceInput} from '@angular/cdk/table';
import {Departamento} from '../../model/departamento';
import {DepartamentoService} from '../../services/departamento.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogoComponent} from '../lista-usuario/confirm-dialogo/confirm-dialogo.component';
import {Fauna} from '../../model/fauna';
import {FaunaService} from '../../services/fauna.service';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-lista-fauna',
  standalone: true,
    imports: [
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
        NavbarComponent
    ],
  templateUrl: './lista-fauna.component.html',
  styleUrl: './lista-fauna.component.css'
})
export class ListaFaunaComponent implements OnInit, AfterViewInit {
  lista: Fauna[] = [];
  displayedColumns: string[] = ['id' ,'nombre','descripcion','idDepartaento' ];

  dataSource: MatTableDataSource<Fauna> = new MatTableDataSource<Fauna>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  faunaService: FaunaService = inject(FaunaService);
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
    // Suscribirse al observable de la lista de fauna
    this.faunaService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadLista();
  }


  loadLista(): void {
    this.faunaService.list().subscribe({
      next: (data) => {
        this.faunaService.setList(data); //enviar la nueva lista a los suscriptores
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
    this.faunaService.delete(id).subscribe(() => {
      this.faunaService.list().subscribe(data => {
        this.faunaService.setList(data);//enviar la nueva lista a los suscriptores
      });
    });
  }

}
