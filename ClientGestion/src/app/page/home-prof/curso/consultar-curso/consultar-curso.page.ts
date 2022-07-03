import { Component,HostBinding, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DatosService } from '../../../../services/datos.service';
import { Curso } from 'src/app/models/Curso';
import { Prof } from 'src/app/models/Prof';
import { ProfCourse } from 'src/app/models/ProfCourse';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultar-curso',
  templateUrl: './consultar-curso.page.html',
  styleUrls: ['./consultar-curso.page.scss'],
})
export class ConsultarCursoPage implements OnInit {
  
  prof: Prof = {  
    nTrabajador:0    
  };
  course: Curso = {
    nrc:0,
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

  constructor(private menu:MenuController, private datosService:DatosService,private alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute ) { }
  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }
  ngOnInit() {
    this.getProfCourses();
    this.getCourses();
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user;  
    console.log('User: ',this.user);
    this.pCourse.nTrabajador = this.user;   
  }  
  getProfCourses(){
    this.datosService.getProfCourses().subscribe(
      res => {
        this.pCourses = res;
      },
      err => console.error(err)
    );
  }
  getCourses(){
    this.datosService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.error(err)
    );
  } 
  deleteProfCourse(nrc){
    this.datosService.deleteProfCourse(nrc).subscribe(
      res => {
        console.log(res);
        this.getProfCourses();
      },
      err => console.error(err)
    )
  }
  deleteAllProfCourse(){
    this.datosService.deleteAllProfCourse().subscribe(
      res => {
        console.log(res);
        this.getProfCourses();
      },
      err => console.error(err)
    )
  }
  async AlertOne(nrc) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>Deseas eliminar </strong>!!! '+ nrc ,
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
            this.deleteProfCourse(nrc);

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
            this.deleteAllProfCourse();
            this.getProfCourses();
          }
        }
      ]
    });

    await alert.present();
  }

}
