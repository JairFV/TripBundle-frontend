export class Reserva {
  id: number = 0;
  detalleReserva: string;
  fechaReserva: Date = new Date();
  cantidadPersonas:number;
  idUsuario: number;
  idAdministrador: number;
  idPaquete: number;
}
