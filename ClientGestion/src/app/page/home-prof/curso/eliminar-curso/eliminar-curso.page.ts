import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-eliminar-curso',
  templateUrl: './eliminar-curso.page.html',
  styleUrls: ['./eliminar-curso.page.scss'],
})
export class EliminarCursoPage implements OnInit {
  user:number=201347656;
  pCourses:any=[];

  constructor(private menu:MenuController,private datosService:DatosService,private alertController:AlertController) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
    this.getProfCourse();
  }
  getProfCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.pCourses = res;
      },
      err => console.error(err)
    );
  }
  deleteProfCourse(nrc: number){
    this.datosService.deleteCourse(nrc).subscribe(
      res => {
        console.log(res);
        this.getProfCourse();
      },
      err => console.error(err)
    )
  }
  deleteAllCourses(){
    this.datosService.deleteAllProfCourse().subscribe(
      res => {
        console.log(res);
        this.getProfCourse();
      },
      err => console.error(err)
    )
  }
  async AlertOne(nrc: number) {
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
            this.deleteAllCourses();            
          }
        }
      ]
    });

    await alert.present();
  }

}
