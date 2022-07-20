
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
  selector: 'app-eliminar-estudiante',
  templateUrl: './eliminar-estudiante.page.html',
  styleUrls: ['./eliminar-estudiante.page.scss'],
})
export class EliminarEstudiantePage implements OnInit {

  student: Student = {
    matricula:0,
    nombre:'',
  }    
  course: Curso = {    
    nrc:0,     
  };
    
  students:any = [];
  courses:any = [];
  studCourses:any = [];

  user:number = 0;
  nrc:number = 0;
  curso:string = '';
  nTrabajador:number = 0;

  constructor(private menu:MenuController, private datosService: DatosService, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;  

    this.user = params.user;
    this.nrc = params.nrc;    
    this.curso = params.curso;
    this.nTrabajador = params.user;
    
    this.getStudCourse( this.nrc, this.nTrabajador);    
    this.getStudent();
    this.getCourse();
    console.log(this.nTrabajador);
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
  getStudCourse( nrc, nTrabajador){        
    this.datosService.getStudCourse(nrc, nTrabajador).subscribe(
      res => {
        this.studCourses = res;              
      },
      err => console.error(err)
    );
  }
  deleteStudCourse(matricula:number, nrc:number, nTrabajador:number){            
    console.log('Dat en funcion delete:',matricula, nrc, nTrabajador);    
    this.datosService.deleteStudCourse(matricula, nrc, nTrabajador).subscribe(
      res => {       
        console.log(res); 
        this.getStudCourse(nrc, nTrabajador);
      },
      err => console.error(err)
    )
  }
// Elimina un alumno de la lista del curso
  async AlertOne(matricula:number, nrc:number, nTrabajador:number) {        
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>Deseas eliminar </strong>!!! '+ matricula + ',' + nrc ,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteStudCourse(matricula, nrc, nTrabajador);
          }
        }
      ]
    });
    await alert.present();
  }
//Alert para Elimina todes los alumnos del curso
  async AlertAll() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>Deseas eliminar</strong>!!! ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteAllStudCourse();
          }
        }
      ]
    });
    await alert.present();
  }
// funcion para eliminar todos las alumnos del curso
  deleteAllStudCourse(){
    this.datosService.deleteAllStudCourse().subscribe(
      res => {      
        this.getStudCourse(this.nrc, this.nTrabajador);
      },
      err => console.error(err)
    )
  }
// funcion del menu profesor
  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

}
