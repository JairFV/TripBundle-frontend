import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {CdkTableDataSourceInput} from '@angular/cdk/table';
import {Usuario} from '../../model/usuario';
import {AtractivoTuristico} from '../../model/atractivo-turistico';
import {Router, RouterLink} from '@angular/router';
import {ConfirmDialogoComponent} from '../lista-usuario/confirm-dialogo/confirm-dialogo.component';
import {UsuarioService} from '../../services/usuario.service';
import {MatDialog} from '@angular/material/dialog';
import {AtractivoTuristicoService} from '../../services/atractivoTuristico.service';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-lista-atractivo-turistico',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
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
  templateUrl: './lista-atractivo-turistico.component.html',
  styleUrl: './lista-atractivo-turistico.component.css'
})
export class ListaAtractivoTuristicoComponent implements OnInit, AfterViewInit {
  lista: AtractivoTuristico[] = [];
  displayedColumns: string[] = ['id', 'nombre','descripcion', 'valoracion','idDepartamento'  ];
  dataSource: MatTableDataSource<AtractivoTuristico> = new MatTableDataSource<AtractivoTuristico>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  atractivoTuristicoService: AtractivoTuristicoService = inject(AtractivoTuristicoService);
  route: Router = inject(Router);
  dialog = inject(MatDialog)

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
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log("Load Lista!");
    // Suscribirse al observable de la lista de usuarios
    this.atractivoTuristicoService.getList().subscribe(data => {
      this.dataSource.data = data;
    });
    this.loadLista();
  }


  loadLista(): void {
    this.atractivoTuristicoService.list().subscribe({
      next: (data) => {
        this.atractivoTuristicoService.setList(data); //enviar la nueva lista a los suscriptores
      },
      error: (err) => console.error("Error en consulta", err)
    })
  }
  delete(id:number) {
    this.atractivoTuristicoService.delete(id).subscribe(() => {
      this.atractivoTuristicoService.list().subscribe(data => {
        this.atractivoTuristicoService.setList(data);//enviar la nueva lista a los suscriptores
      });
    });
  }



}

