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
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Pago} from '../../model/pago';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PagoService} from '../../services/pago';
import {ConfirmDialogoComponent} from './confirm-dialogo/confirm-dialogo.component';


@Component({
  selector: 'app-lista-pago',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatPaginator,
    MatSort
  ],
  templateUrl: './lista-pago.component.html',
  styleUrl: './lista-pago.component.css'
})
export class ListaPagoComponent implements OnInit,AfterViewInit {
  lista: Pago[] = [];
  displayedColumns: string[] = ['id','estado','monto','metodoPago', 'fechaPago', 'idReserva' ];

  dataSource: MatTableDataSource<Pago> = new MatTableDataSource<Pago>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pagoService: PagoService = inject(PagoService);
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
    this.pagoService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadLista();
  }


  loadLista(): void {
    this.pagoService.list().subscribe({
      next: (data) => {
        console.log("Datos de loadLista:", data); // Verifica si se reciben datos
        this.pagoService.setList(data); //enviar la nueva lista a los suscriptores
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
    this.pagoService.delete(id).subscribe(() => {
      this.pagoService.list().subscribe(data => {
        this.pagoService.setList(data);//enviar la nueva lista a los suscriptores
      });
    });
  }

}
