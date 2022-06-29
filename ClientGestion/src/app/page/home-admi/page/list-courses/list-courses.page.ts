import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.page.html',
  styleUrls: ['./list-courses.page.scss'],
})
export class ListCoursesPage implements OnInit {
  user:string='Administrador';
  courses:any = [];

  constructor( private datosService: DatosService, public alertController:AlertController) { }

  ngOnInit() {
    this.getCourse();
  }
  getCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.courses = res;
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
