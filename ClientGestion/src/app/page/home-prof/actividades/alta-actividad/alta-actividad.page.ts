import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Actividad } from '../../../../models/Actividad';
import { DatosService } from '../../../../services/datos.service';

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

  actividadCurso: Actividad = {
    id: '',
    nombre: '',
    descripcion: '',
    fecha: '',
    fechaEntrega: '',
    horaEntrega: '',
    noTrabajador: this.nTrabajador,
    nrc: this.nrc,
    id_equipo: null
  }

  ngOnInit() {
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
          console.log("SOY YO: " + this.getActividad.id);
          if( this.getActividad.id == ""){
            alert("Actividad agregada con exito!!!");
            this.datosService.saveActividad(this.actividadCurso).subscribe(
              res => {
                console.log(res);
              },
              err => console.error(err)
            );
            this.actividadCurso.id = '';
            this.actividadCurso.nombre = '';
            this.actividadCurso.descripcion = '';
            this.actividadCurso.fecha = '';
            this.actividadCurso.fechaEntrega = '';
            this.actividadCurso.noTrabajador = this.nTrabajador;
            this.actividadCurso.nrc = this.nrc;
            this.actividadCurso.id_equipo = null;
            this.getActividad = [];
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
            this.getActividad = [];
          }
        });
    }else{
      console.log("Insertare actividad para EQUIPO!!!")
      this.datosService.getOneActividadEq(this.actividadCurso.id, this.actividadCurso.id_equipo).subscribe(
        res => {
          this.getActividadE = res;
          console.log("SOY YO: " + this.getActividadE.id);
          if( this.getActividadE.id == ""){
            alert("Actividad agregada con exito!!!");
            this.datosService.saveActividad(this.actividadCurso).subscribe(
              res => {
                console.log(res);
              },
              err => console.error(err)
            );
            this.actividadCurso.id = '';
            this.actividadCurso.nombre = '';
            this.actividadCurso.descripcion = '';
            this.actividadCurso.fecha = '';
            this.actividadCurso.fechaEntrega = '';
            this.actividadCurso.noTrabajador = this.nTrabajador;
            this.actividadCurso.nrc = this.nrc;
            this.actividadCurso.id_equipo = null;
            this.getActividadE = [];
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
            this.getActividadE = [];
          }
      });
    }
  }

  condicion1(){
    this.condicionE = true;
    this.boton = false;
  }
  condicion2(){
    this.condicionE = false;
    this.boton = false;
  }

}
