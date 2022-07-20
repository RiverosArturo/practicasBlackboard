
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
  courses:any = [];
  studCourses:any = [];
  

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
  deleteStudCourse(matricula:number, nrc:number, nTrabajador:number){
    console.log('user', nTrabajador, 'nrc:', nrc);
    this.datosService.deleteStudCourse(matricula, nrc, nTrabajador).subscribe(
      res => {
        console.log(res);        
        this.getStudCourse(this.nrc,this.nTrabajador);     
      },
      err => console.error(err)
    )
  }
  deleteAllStudCourse(nrc:number, nTrabajador:number){
    this.datosService.deleteAllStudCourse(nrc, nTrabajador).subscribe(
      res => {
        console.log(res);
        this.getStudCourse(this.nrc,this.nTrabajador);
      },
      err => console.error(err)
    )
  }
  async AlertOne(matricula:number, nrc:number, nTrabajador:number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: ' <strong>Eliminar</strong>!!! '+ matricula ,
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
  async AlertAll(nrc:number, nTrabajador:number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>Eliminar todo el registro?</strong>!!! ',
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
            this.deleteAllStudCourse(nrc, nTrabajador);
          }
        }
      ]
    });
    await alert.present();
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
