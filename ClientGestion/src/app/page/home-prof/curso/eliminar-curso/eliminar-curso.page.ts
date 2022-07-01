import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eliminar-curso',
  templateUrl: './eliminar-curso.page.html',
  styleUrls: ['./eliminar-curso.page.scss'],
})
export class EliminarCursoPage implements OnInit {
  user:number=0;
  pCourses:any=[];

  constructor(private menu:MenuController,private datosService:DatosService,private alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
    this.getProfCourse();
  }
  getProfCourse(){
    this.datosService.getProfCourses().subscribe(
      res => {
        this.pCourses = res;
      },
      err => console.error(err)
    );
  }
  deleteProfCourse(nrc: number){
    this.datosService.deleteProfCourse(nrc).subscribe(
      res => {
        console.log(res);
        this.getProfCourse();
      },
      err => console.error(err)
    )
  }
  deleteAllProfCourses(){
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
            this.deleteAllProfCourses();            
          }
        }
      ]
    });

    await alert.present();
  }

}
