// usuario.model.ts
export class Usuario {
  id: number = 0;
  dni: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  fechaNacimiento: Date;
  password: string;

  constructor(dni: string, nombre: string, apellido: string, telefono: string, email: string, fechaNacimiento: Date, password: string) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
    this.fechaNacimiento = fechaNacimiento;
    this.password = password;
  }
}

