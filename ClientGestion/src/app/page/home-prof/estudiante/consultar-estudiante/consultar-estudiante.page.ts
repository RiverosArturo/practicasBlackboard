
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { ProfCourse } from 'src/app/models/ProfCourse';
import { Curso } from 'src/app/models/Curso';
import { Prof } from 'src/app/models/Prof';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/User';
import { Student } from 'src/app/models/Student';
import { NgForOfContext } from '@angular/common';


@Component({
  selector: 'app-consultar-estudiante',
  templateUrl: './consultar-estudiante.page.html',
  styleUrls: ['./consultar-estudiante.page.scss'],
})
export class ConsultarEstudiantePage implements OnInit {

  student: Student = {
    matricula:0,
    nombre:'',
  }    
  course: Curso = {    
    nrc:0,     
  };

  user:number= 2013;
  nrc:number = 0;
  nTrabajador:number=0;
  curso:string='cur';
    
  students:any = [];
  studCourses:any = [];
  courses:any = [];

  constructor(private menu:MenuController, private datosService: DatosService, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;  
    console.log(params);
    this.user = params.user;
    this.nrc = params.nrc;
    this.curso = params.curso;
    this.nTrabajador = params.user;  
    
    this.getStudCourse(this.nrc,this.nTrabajador); 
    this.getStudent();
    this.getCourse();
  }
  AlertOne(matricula:number,nrc:number,nTrabajador:number){
    console.log(matricula,nrc, nTrabajador);

  }
  AlertAll(){

  }
  getCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.error(err)
    );
  }
  getStudent(){
    this.datosService.getStudents().subscribe(
      res => {
        this.students = res;     
      },
      err => console.error(err)
    );
  }
  getStudCourse(nrc:number, nTrabajador:number){
    this.datosService.getStudCourse(nrc,nTrabajador).subscribe(
      res => {
        this.studCourses = res;
        console.log(this.student);        
      },
      err => console.error(err)
    );
  }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

}
