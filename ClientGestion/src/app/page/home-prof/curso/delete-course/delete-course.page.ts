import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.page.html',
  styleUrls: ['./delete-course.page.scss'],
})
export class DeleteCoursePage implements OnInit {

  user:number;
  courses:any=[];
  pCourses:any=[];

  constructor( private datosService: DatosService, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    this.getCourse();
    this.getProfCourse();
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user;  
    console.log('User: ',this.user);
  }
  getProfCourse(){
    this.datosService.getProfCourses().subscribe(
      res => {
        this.pCourses = res;
      },
      err => console.error(err)
    );
  }
  getCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.error(err)
    );
  }
  deleteProfCourse(nTrabajador:number, nrc:number){
    this.datosService.deleteProfCourse(nrc).subscribe(
      res => {
        console.log(res);        
        this.getProfCourse();
      },
      err => console.error(err)
    )
  }
  deleteAllProfCourse(){
    this.datosService.deleteAllProfCourse().subscribe(
      res => {
        console.log(res);
        this.getProfCourse();
      },
      err => console.error(err)
    )
  }
  async AlertOne(nTrabajador:number, nrc: number) {
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
            this.deleteProfCourse(nTrabajador, nrc);
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
          }
        }
      ]
    });
    await alert.present();
  }

}
