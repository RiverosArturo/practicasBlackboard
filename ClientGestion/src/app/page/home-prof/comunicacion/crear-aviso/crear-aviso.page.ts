import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Aviso } from 'src/app/models/Aviso';
import { Equipo } from 'src/app/models/Equipo';
import { StudCourse } from 'src/app/models/StudCourse';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.page.html',
  styleUrls: ['./crear-aviso.page.scss'],
})
export class CrearAvisoPage implements OnInit {

  constructor(private datosService:DatosService, private menu:MenuController, private activedRoute:ActivatedRoute, private router: Router) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  nrc:number = 15437;
  nTrabajador:number = 202015110;
  user:number;
  getAviso:any = [];
  getAvisoE:any = [];
  condicionE:boolean = null;
  boton:boolean = true;

  studCourse: StudCourse = {
    matricula: 0,
    nrc: 0,
    nTrabajador: 0 
  }

  studCourses:any = [];

  avisoCurso: Aviso= {
    id: '',
    aviso: '',
    fecha: '',
    hora: '',
    noTrabajador: this.nTrabajador,
    nrc: this.nrc,
    id_equipo: null,
    matricula:0
  }

  equipo:Equipo = {
    id: 0,
    nombre: '',
    curso_nrc: 0
  }
  equipos:any = [];

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    this.nrc = params.nrc;
    this.nTrabajador = params.user;
    this.user = params.user;
    this.getEquipos();
  }

  navProf(){
    this.router.navigate(['/home-prof/home-prof/menu-prof',this.nTrabajador,this.nrc]);
  }
  
  onSubmit(){
    this.condicionE = null;
    this.boton = true;
    console.log(this.avisoCurso);
    if(this.avisoCurso.id_equipo == null){
      console.log("Insertare aviso para CURSO!!!")
      this.datosService.getOneAviso(this.avisoCurso.id,this.avisoCurso.nrc,this.avisoCurso.noTrabajador).subscribe(
        res => {
          this.getAviso = res;
          if( this.getAviso.id == ""){
            console.log(this.avisoCurso);
            alert("Aviso agregado con exito!!!");
            this.datosService.getStudCourseBien(this.avisoCurso.nrc, this.avisoCurso.noTrabajador).subscribe(
              res => {
                this.studCourses = res;   
                //for(let i=0; i<this.studCourses.length;i++){
                  //console.log(this.actividadCurso.matricula + " = " + this.studCourses[i].matricula)
                  //this.avisoCurso.matricula = this.studCourses[i].matricula;
                  //console.log(this.actividadCurso);
                  //console.log(this.actividadCurso.matricula);
                  this.datosService.saveAviso(this.avisoCurso).subscribe(
                    res => {
                      console.log(res);
                    },
                    err => console.error(err)
                  );
                //}
              }
            );
          }else{
            alert("El ID de la actividad ya existe, ingresa uno nuevo!!!");
            this.avisoCurso.id = '';
            this.avisoCurso.aviso = '';
            this.avisoCurso.fecha = '';
            this.avisoCurso.hora = '';
            this.avisoCurso.noTrabajador = this.nTrabajador;
            this.avisoCurso.nrc = this.nrc;
            this.avisoCurso.id_equipo = null;
            this.avisoCurso.matricula = 0;
            this.getAviso = [];
          }
        });
    }else{
      console.log("Insertare aviso para EQUIPO!!!")
      this.datosService.getOneAvisoEq(this.avisoCurso.id,this.avisoCurso.nrc, this.avisoCurso.id_equipo, this.avisoCurso.noTrabajador).subscribe(
        res => {
          this.getAvisoE = res;
          console.log(this.getAvisoE)
          if( this.getAvisoE.id == "FALLO"){
            
            alert("Aviso agregado con exito!!!");
            this.datosService.getEquipoStud(this.avisoCurso.noTrabajador, this.avisoCurso.nrc, this.avisoCurso.id_equipo).subscribe(
              res => {
                this.studCourses = res;   
                console.log(this.studCourses[0].id);
                for(let i=0; i<this.studCourses.length;i++){
                  console.log("----------"+this.studCourses[i].matricula);
                  //console.log(this.actividadCurso.matricula + " = " + this.studCourses[i].matricula)
                  this.avisoCurso.matricula = this.studCourses[i].matricula;
                  //console.log(this.actividadCurso.matricula);
                  this.datosService.saveAviso(this.avisoCurso).subscribe(
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
            this.avisoCurso.id = '';
            this.avisoCurso.aviso = '';
            this.avisoCurso.fecha = '';
            this.avisoCurso.hora = '';
            this.avisoCurso.noTrabajador = this.nTrabajador;
            this.avisoCurso.nrc = this.nrc;
            this.avisoCurso.id_equipo = null;
            this.avisoCurso.matricula = 0;
            this.getAvisoE = [];
          }
      });
    }
  }

  condicion1(){
    this.condicionE = true;
    this.boton = false;
    this.avisoCurso.id = '';
    this.avisoCurso.aviso = '';
    this.avisoCurso.fecha = '';
    this.avisoCurso.hora = '';
    this.avisoCurso.noTrabajador = this.nTrabajador;
    this.avisoCurso.nrc = this.nrc;
    this.avisoCurso.id_equipo = null;
    this.avisoCurso.matricula = 0;
    this.getAviso = [];
    this.getAvisoE = [];
    this.studCourses = [];
  }
  condicion2(){
    this.condicionE = false;
    this.boton = false;
    this.avisoCurso.id = '';
    this.avisoCurso.aviso = '';
    this.avisoCurso.fecha = '';
    this.avisoCurso.hora = '';
    this.avisoCurso.noTrabajador = this.nTrabajador;
    this.avisoCurso.nrc = this.nrc;
    this.avisoCurso.id_equipo = null;
    this.avisoCurso.matricula = 0;
    this.getAvisoE = [];
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
