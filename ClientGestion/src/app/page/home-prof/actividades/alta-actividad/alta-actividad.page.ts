import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Actividad } from '../../../../models/Actividad';
import { DatosService } from '../../../../services/datos.service';
import { StudCourse } from '../../../../models/StudCourse';
import { Equipo } from '../../../../models/Equipo';

@Component({
  selector: 'app-alta-actividad',
  templateUrl: './alta-actividad.page.html',
  styleUrls: ['./alta-actividad.page.scss'],
})
export class AltaActividadPage implements OnInit {

  constructor(private datosService:DatosService, private menu:MenuController) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  nrc:number = 15437;
  nTrabajador:number = 202015110;
  getActividad:any = [];
  getActividadE:any = [];
  condicionE:boolean = null;
  boton:boolean = true;

  studCourse: StudCourse = {
    matricula: 0,
    nrc: 0,
    nTrabajador: 0 
  }

  studCourses:any = [];

  actividadCurso: Actividad = {
    id: '',
    nombre: '',
    descripcion: '',
    fecha: '',
    fechaEntrega: '',
    horaEntrega: '',
    noTrabajador: this.nTrabajador,
    nrc: this.nrc,
    id_equipo: null,
    calificacion: 0,
    matricula: 0
  }

  equipo:Equipo = {
    id: 0,
    nombre: '',
    curso_nrc: 0
  }
  equipos:any = [];
  ngOnInit() {
    this.getEquipos();
  }

  onSubmit(){
    this.condicionE = null;
    this.boton = true;
    console.log(this.actividadCurso);
    if(this.actividadCurso.id_equipo == null){
      console.log("Insertare actividad para ACTIVIDAD!!!")
      this.datosService.getOneActividad(this.actividadCurso.id).subscribe(
        res => {
          this.getActividad = res;
          if( this.getActividad.id == ""){
            console.log(this.actividadCurso);
            alert("Actividad agregada con exito!!!");
            this.datosService.getStudCourseBien(this.actividadCurso.nrc, this.actividadCurso.noTrabajador).subscribe(
              res => {
                this.studCourses = res;   
                for(let i=0; i<this.studCourses.length;i++){
                  //console.log(this.actividadCurso.matricula + " = " + this.studCourses[i].matricula)
                  this.actividadCurso.matricula = this.studCourses[i].matricula;
                  //console.log(this.actividadCurso);
                  //console.log(this.actividadCurso.matricula);
                  this.datosService.saveActividad(this.actividadCurso).subscribe(
                    res => {
                      console.log(res);
                    },
                    err => console.error(err)
                  );
                }
              }
            );
          }else{
            alert("El ID de la actividad ya existe, ingresa uno nuevo!!!");
            this.actividadCurso.id = '';
            this.actividadCurso.nombre = '';
            this.actividadCurso.descripcion = '';
            this.actividadCurso.fecha = '';
            this.actividadCurso.fechaEntrega = '';
            this.actividadCurso.noTrabajador = this.nTrabajador;
            this.actividadCurso.nrc = this.nrc;
            this.actividadCurso.id_equipo = null;
            this.actividadCurso.matricula = 0;
            this.getActividad = [];
          }
        });
    }else{
      console.log("Insertare actividad para EQUIPO!!!")
      this.datosService.getOneActividadEq(this.actividadCurso.id, this.actividadCurso.id_equipo).subscribe(
        res => {
          this.getActividadE = res;
          console.log("-----------------------");
          console.log(this.studCourses[0]);
          if( this.getActividadE.id == ""){
            alert("Actividad agregada con exito!!!");
            this.datosService.getEquipoStud(this.actividadCurso.noTrabajador, this.actividadCurso.nrc, this.actividadCurso.id_equipo).subscribe(
              res => {
                this.studCourses = res;   
                for(let i=0; i<this.studCourses.length;i++){
                  //console.log(this.actividadCurso.matricula + " = " + this.studCourses[i].matricula)
                  this.actividadCurso.matricula = this.studCourses[i].matricula;
                  //console.log(this.actividadCurso.matricula);
                  this.datosService.saveActividad(this.actividadCurso).subscribe(
                    res => {
                      console.log(res);
                    },
                    err => console.error(err)
                  );
                }
              }
            );
          }else{
            alert("El ID de la actividad ya existe, ingresa uno nuevo!!!");
            this.actividadCurso.id = '';
            this.actividadCurso.nombre = '';
            this.actividadCurso.descripcion = '';
            this.actividadCurso.fecha = '';
            this.actividadCurso.fechaEntrega = '';
            this.actividadCurso.noTrabajador = this.nTrabajador;
            this.actividadCurso.nrc = this.nrc;
            this.actividadCurso.id_equipo = null;
            this.actividadCurso.matricula = 0;
            this.getActividadE = [];
          }
      });
    }
  }

  condicion1(){
    this.condicionE = true;
    this.boton = false;
    this.actividadCurso.id = '';
    this.actividadCurso.nombre = '';
    this.actividadCurso.descripcion = '';
    this.actividadCurso.fecha = '';
    this.actividadCurso.fechaEntrega = '';
    this.actividadCurso.noTrabajador = this.nTrabajador;
    this.actividadCurso.nrc = this.nrc;
    this.actividadCurso.id_equipo = null;
    this.actividadCurso.matricula = 0;
    this.getActividad = [];
    this.studCourses = [];
  }
  condicion2(){
    this.condicionE = false;
    this.boton = false;
    this.actividadCurso.id = '';
    this.actividadCurso.nombre = '';
    this.actividadCurso.descripcion = '';
    this.actividadCurso.fecha = '';
    this.actividadCurso.fechaEntrega = '';
    this.actividadCurso.noTrabajador = this.nTrabajador;
    this.actividadCurso.nrc = this.nrc;
    this.actividadCurso.id_equipo = null;
    this.actividadCurso.matricula = 0;
    this.getActividad = [];
    this.studCourses = [];
  }

  getEquipos(){
    this.datosService.getEquipos().subscribe(
      res => {
        this.equipos = res;
      },
      err => console.error(err)
    );
  }

}