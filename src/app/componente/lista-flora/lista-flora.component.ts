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
import {Fauna} from '../../model/fauna';
import {FaunaService} from '../../services/fauna.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogoComponent} from '../lista-usuario/confirm-dialogo/confirm-dialogo.component';
import {Flora} from '../../model/flora';
import {FloraService} from '../../services/flora.service';

@Component({
  selector: 'app-lista-flora',
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
    MatHeaderCellDef
  ],
  templateUrl: './lista-flora.component.html',
  styleUrl: './lista-flora.component.css'
})
export class ListaFloraComponent implements OnInit, AfterViewInit {
  lista: Flora[] = [];
  displayedColumns: string[] = ['id' ,'nombre','descripcion','idDepartamento' ];

  dataSource: MatTableDataSource<Flora> = new MatTableDataSource<Flora>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  floraService: FloraService   = inject(FloraService);
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
    this.floraService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadLista();
  }


  loadLista(): void {
    this.floraService.list().subscribe({
      next: (data) => {
        this.floraService.setList(data); //enviar la nueva lista a los suscriptores
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
    this.floraService.delete(id).subscribe(() => {
      this.floraService.list().subscribe(data => {
        this.floraService.setList(data);//enviar la nueva lista a los suscriptores
      });
    });
  }
}
