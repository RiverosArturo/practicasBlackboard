import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { Actividad } from '../../../../models/Actividad';

@Component({
  selector: 'app-evaluar-actividad',
  templateUrl: './evaluar-actividad.page.html',
  styleUrls: ['./evaluar-actividad.page.scss'],
})

export class EvaluarActividadPage implements OnInit {

  constructor(private datosService:DatosService, private menu:MenuController, private router: Router, private activedRoute:ActivatedRoute) { }

  boton:number = 0;
  nTrabajador: number = 1234;
  nrc: number = 1234
  actividades:any= [];
  actividadesE:any= [];
  actividades2:any=[];
  actividades2E:any=[];
  alumnos:any=[];
  alumnos2:any=[];
  equipos:any=[];
  acti:Actividad;
  actiE:Actividad;
  
  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    this.nrc = params.nrc;
    this.nTrabajador = params.user;
    this.getActividad();
    this.getActividadE();
    console.log(this.boton);
  }

  navProf(){
    this.router.navigate(['/home-prof/home-prof/menu-prof',this.nTrabajador,this.nrc]);
    this.boton = 0;
  }

  condicion1(){
    this.boton=1;
    this.getActividad();
  }

  condicion2(){
    this.boton=3;
    this.getActividadE();
  }

  atras(){
    this.boton = 0;
  }

  atras2(){
    this.boton = 1;
  }

  atras3(){
    this.boton = 3;
  }

  getActividad(){
    this.datosService.getActivity(this.nrc, this.nTrabajador).subscribe(
      res => {
        this.actividades = res;       
      },
      err => console.error(err)
    );
  }

  getActividadE(){
    this.datosService.getActivityEq(this.nrc, this.nTrabajador).subscribe(
      res => {
        this.actividadesE = res;        
      },
      err => console.error(err)
    );
  }

  act(nrc:number, noTrabajador:number, id:string){
    this.boton=2;
    this.datosService.act(nrc, noTrabajador, id).subscribe(
      res => {
        this.actividades2 = res; 
        for(let i = 0; i<this.actividades2.length;i++){
          if(this.actividades2[i].matricula != null){
            this.datosService.getStudent(this.actividades2[i].matricula).subscribe(
              res => {
                this.alumnos[this.actividades2[i].matricula] = res; 
              },
              err => console.error(err)
            );
          }   
        }    
      },
      err => console.error(err)
    );
  }
  
  actE(nrc:number, noTrabajador:number, id:string, id_equipo:number){
    this.boton=4;
    this.datosService.actE(nrc, noTrabajador, id, id_equipo).subscribe(
      res => {
        this.actividades2E = res;  
        for(let i = 0; i<this.actividades2E.length;i++){
          if(this.actividades2E[i].matricula != null){
            this.datosService.getStudent(this.actividades2E[i].matricula).subscribe(
              res => {
                this.alumnos2[this.actividades2E[i].matricula] = res; 
                this.datosService.getid(this.actividades2E[i].id_equipo).subscribe(
                  res => {
                    this.equipos[this.actividades2E[i].id_equipo] = res; 
                  },
                  err => console.error(err)
                );
              },
              err => console.error(err)
            );

          }   
        }         
      },
      err => console.error(err)
    );
  }

  onSubmit(id:string, nrc:number, noTrabajador:number, id_equipo:number, matricula:number, actividad:Actividad){
    if(id_equipo!=null && id_equipo>0){
      this.actiE = {
        id: actividad.id,
        nombre: actividad.nombre,
        descripcion: actividad.descripcion,
        fecha: actividad.fecha,
        fechaEntrega: actividad.fechaEntrega,
        horaEntrega: actividad.horaEntrega,
        noTrabajador: actividad.noTrabajador,
        nrc: actividad.nrc,
        id_equipo: actividad.id_equipo,
        calificacion: actividad.calificacion,
        matricula: actividad.matricula,
        urlProfesor: actividad.urlProfesor,
        urlEstudiante: actividad.urlEstudiante,
        fechaEstudiante: actividad.fechaEstudiante,
        comentarioProfesor: actividad.comentarioProfesor,
        horaEstudiante: actividad.horaEstudiante
      }
      console.log("Calificando act de equipo");
      alert("Actividad calificada con exito!!!");
      this.datosService.actualizarActEqAl(id, nrc, noTrabajador, id_equipo, matricula, this.actiE)
            .subscribe(
              res => {
                console.log(res);
                this.actE(nrc, noTrabajador, id, id_equipo);
              },
              err => console.error(err)
            );
    }else{
      
      
      this.acti = {
        id: actividad.id,
        nombre: actividad.nombre,
        descripcion: actividad.descripcion,
        fecha: actividad.fecha,
        fechaEntrega: actividad.fechaEntrega,
        horaEntrega: actividad.horaEntrega,
        noTrabajador: actividad.noTrabajador,
        nrc: actividad.nrc,
        id_equipo: null,
        calificacion: actividad.calificacion,
        matricula: actividad.matricula,
        urlProfesor: actividad.urlProfesor,
        urlEstudiante: actividad.urlEstudiante,
        fechaEstudiante: actividad.fechaEstudiante,
        comentarioProfesor: actividad.comentarioProfesor,
        horaEstudiante: actividad.horaEstudiante
      }
      console.log(this.acti);
      console.log("Calificando act");
      alert("Actividad calificada con exito!!!");
      //console.log(actividad.fechaEstudiante);
      this.datosService.actualizarActAl(id, nrc, noTrabajador, matricula, this.acti)
            .subscribe(
              res => {
                console.log(res);
                this.act(nrc, noTrabajador, id);
              },
              err => console.error(err)
            );
    }
  }
}
