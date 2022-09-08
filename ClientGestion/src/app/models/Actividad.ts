export interface Actividad {

    id?: string;
    nombre?: string;
    descripcion?: string;
    fecha?: string;
    fechaEntrega?: string; 
    horaEntrega?: string;
    noTrabajador?: number;
    nrc?: number;
    id_equipo?: number;
    calificacion?: number;
    matricula?: number;
    urlProfesor?: string;
    urlEstudiante?: string;
    fechaEstudiante?: string;
    comentarioProfesor?: string;
}