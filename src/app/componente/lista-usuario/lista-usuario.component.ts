import {Component, inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Usuario} from '../../model/usuario';
import {Router} from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  imports: [
    MatPaginator,
    MatHeaderRow,
    MatRow,
    MatCell,
    MatHeaderCell,
    MatRowDef,
    MatHeaderRowDef,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef
  ],
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.css'
})
export class ListaUsuarioComponent {

  lista: Usuario[] = [];
  displayedColumns: string[] = ['id', 'dni', 'nombre', 'apellido', 'telefono','email', 'password','fechaNacimiento'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator: MatPaginator ;
  @ViewChild(MatSort) sort: MatSort;


  usuarioService : UsuarioService = inject(UsuarioService);
  route: Router = inject(Router);

  constructor() {
    console.log("Load Constructor")
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit():void {
    console.log("Load OnInit Lista")
    this.loadLista();
  }
  loadLista() {
    this.usuarioService.list().subscribe({
      next: (data) => {
        console.log("Data recibida:", data);  // Verifica que data no esté vacía
        this.dataSource.data = data;
      },
      error: (err) => console.error("Error en consulta", err)
    });
  }

}
