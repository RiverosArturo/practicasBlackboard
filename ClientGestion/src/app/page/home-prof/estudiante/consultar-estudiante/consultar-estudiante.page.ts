
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
    
  students:any = [];
  studCourses:any = [];
  courses:any = [];

  constructor(private menu:MenuController, private datosService: DatosService, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.getStudCourse(); 
    this.getStudent();
    this.getCourse();
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user;      
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
  getStudCourse(){
    this.datosService.getStudCourse().subscribe(
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
