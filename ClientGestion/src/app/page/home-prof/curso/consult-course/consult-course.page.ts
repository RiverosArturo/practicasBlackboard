import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { ProfCourse } from 'src/app/models/ProfCourse';
import { Curso } from 'src/app/models/Curso';
import { Prof } from 'src/app/models/Prof';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-consult-course',
  templateUrl: './consult-course.page.html',
  styleUrls: ['./consult-course.page.scss'],
})
export class ConsultCoursePage implements OnInit {

  prof: Prof = {  
    nTrabajador:0    
  };
  course: Curso = {
    materia:'',
    //nrc:0,
  }
  course2: Curso = {
    materia:'',
  }  
  pCourse: ProfCourse = {
    nTrabajador:0,
    nrc:0,     
  };

    
  profs:any = [];
  courses:any = [];
  pCourses:any=[];
  
  edit:boolean = false;
  user:number=0;
  nrc:number=0;
  nrc2:number=0;

  constructor( private datosService: DatosService, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.getProfCourses();
    this.getCourse();    
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user; 
    this.pCourse.nTrabajador = this.user;       
  }
  getCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.error(err)
    );
  }
  getProfCourses(){
    this.datosService.getProfCourses().subscribe(
      res => {
        this.pCourses = res;
      },
      err => console.error(err)
    );
  }  
  deleteCourse(nrc:number){
    this.datosService.deleteCourse(nrc).subscribe(
      res => {
        console.log(res);
        this.getCourse();
      },
      err => console.error(err)
    )
  }
  deleteAllCourses(){
    this.datosService.deleteAllCourses().subscribe(
      res => {
        console.log(res);
        this.getCourse();
      },
      err => console.error(err)
    )
  }
  async AlertOne(clave: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>Deseas eliminar </strong>!!! '+ clave ,
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
            this.deleteCourse(clave);
          }
        }
      ]
    });
    await alert.present();
  }
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
            this.deleteAllCourses();
          }
        }
      ]
    });
    await alert.present();
  }

}
