import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { Curso } from 'src/app/models/Curso';
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

  user:string;
  nrc:number;
  nTrabajador:number;
  curso:string;

  students:any = [];
  courses:any = [];
  studCourses:any = [];

  constructor( private menu:MenuController, private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;     
    this.user = params.user;  
    this.nrc = params.nrc;
    this.user = params.user;
    this.nrc = params.nrc;
    this.nTrabajador = params.nTrabajador;  
    
    this.getStudCourse(this.nrc,this.nTrabajador); 
    this.getStudent();
    this.getCourse();
  }
//---------------------------------------------------------------------------------
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
//---------------------------------------------------------------------------------
  OpenMenuStud(){
    this.menu.enable(true,'MenuStud');
    this.menu.open('MenuStud');
  }
  openmenu0(){
    this.menu.enable(true,'end');
    this.menu.open('end')
  }

}
