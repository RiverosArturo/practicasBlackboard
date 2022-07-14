import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { ProfCourse } from 'src/app/models/ProfCourse';
import { Curso } from 'src/app/models/Curso';
import { Prof } from 'src/app/models/Prof';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.page.html',
  styleUrls: ['./create-course.page.scss'],
})
export class CreateCoursePage implements OnInit {

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
  profCourse: ProfCourse = {
    nTrabajador:0,
    nrc:0,
  }
    
  profs:any = [];
  courses:any = [];
  pCourses:any=[];
  profCourses:any=[];
  
  edit:boolean = false;
  user:number;
  nrc:number=0;

  constructor( private menu:MenuController, private datosService: DatosService, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { }
  
  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }
  ngOnInit() {
    this.getProfCourses();
    this.getCourse();    
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user;      
    this.pCourse.nTrabajador = this.user;        
  }  
  // optiene el curso de un usuario en espesifico  
  getUSERNRC(user:number, nrc:number){    
    console.log(user,nrc);
    this.datosService.getUSERNRC(user, nrc).subscribe(
      res => {          
        this.pCourse = res;
        console.log(this.pCourse);   
      },
      err => console.error(err)
    )
  }
  // optiene el dato curso
  getCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.error(err)
    );
  }
//Optiene el dato nTrabajador
  getProf(){
    this.datosService.getProfs().subscribe(
      res => {
        this.profs = res;
      },
      err => console.error(err)
    );
  }
  //optiene la tabla profesor_curso
  getProfCourses(){
    this.datosService.getProfCourses().subscribe(
      res => {
        this.pCourses = res;
      },
      err => console.error(err)
    );
  }
  // guerda el curso del profesor
  saveProfCourse(){
    this.datosService.saveProfCourse(this.pCourse)
    .subscribe(
      res => {
        console.log(res);    
        console.log('Curso guardado---');        
      },
      err => console.error(err)
    )
  }
//------------------------------------------------------------------  
  async Alert(nrc: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmado!',
      message: 'Message <strong> Curso </strong> '+ nrc +' guardado' ,
      buttons: [
        {
          text: 'ok',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
  async AlertOne(nrc: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirma!',
      message: 'Message <strong> Guardar curso </strong> '+ nrc ,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Guardar',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirma Okay');            
            console.log(nrc);            
            //this.saveProfCourse();
            this.Alert(nrc);
          }
        }
      ]
    });
    await alert.present();
  }
}
