import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-consultar-actividad',
  templateUrl: './consultar-actividad.page.html',
  styleUrls: ['./consultar-actividad.page.scss'],
})
export class ConsultarActividadPage implements OnInit {
  
  user:number= 2013;
  nrc:number = 0;
  curso:string = '';
  nTrabajador:number= 0;

  courses:any = [];
  equipos:any = [];
  activitys:any =[];
  

  constructor(private menu:MenuController, private datosService: DatosService, public alertController:AlertController, private activedRoute:ActivatedRoute) { }

  ngOnInit() {

    const params = this.activedRoute.snapshot.params;  
    console.log(params);

    this.user = params.user;   
    this.nTrabajador = params.user; 
    this.nrc = params.nrc;  
    this.curso = params.curso;  

    this.getCourse();
    this.getEquipo(this.nrc);
    this.getActivity();
  }

  getActivity(){
    this.datosService.getActivity().subscribe(
      res => {
        this.activitys = res; 
        console.log(res);       
      },
      err => console.error(err)
    );
  }
  getEquipo(nrc:number){
    this.datosService.getEquipos(nrc).subscribe(
      res => {
        this.equipos = res;
      },
      err => console.error(err)
    );
  }
  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
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
