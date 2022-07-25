import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-consultar-equipo',
  templateUrl: './consultar-equipo.page.html',
  styleUrls: ['./consultar-equipo.page.scss'],
})
export class ConsultarEquipoPage implements OnInit {

  courses:any = [];
  equipos:any = [];

  user:number= 2013;
  nrc:number = 0;
  nTrabajador:number=0;
  curso:string='cur';

  constructor(private activedRoute:ActivatedRoute,private menu:MenuController, private datosService: DatosService, public alertController:AlertController) { }

  ngOnInit() {

    const params = this.activedRoute.snapshot.params;      
    this.user = params.user;
    this.nrc = params.nrc;
    this.curso = params.curso;
    this.nTrabajador = params.user;

    this.getCourse();
    this.getEquipos1(this.nrc, this.nTrabajador);
  }
  getEquipos1(nrc:number, nTrabajador:number){    
    this.datosService.getEquipos1(nrc, nTrabajador).subscribe(
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
  deleteEquipo(id:number, nombre:string, nrc:number, nTrabajador:number){        
    this.datosService.deleteEquipo(id, nombre, nrc, nTrabajador).subscribe(
      res => {
        console.log(res); 
        this.getEquipos1(this.nrc, nTrabajador);       
      },
      err => console.error(err)
    )
  }
  deleteAllEquipos(nrc:number, nTrabajador:number){
    this.datosService.deleteAllEquipos(nrc, nTrabajador).subscribe(
      res => {
        console.log(res);        
      },
      err => console.error(err)
    )
  }
  async AlertDeleteEquipo(id: number,nombre:string, curso_nrc:number, nTrabajador:number) {    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirma',
      message: '<strong>Eliminar </strong>!!! '+ nombre ,
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
            this.deleteEquipo(id, nombre, curso_nrc, nTrabajador);            
          }
        }
      ]
    });
    await alert.present();
  }

  async AlertDeleteAll(nrc:number, nTrabajador:number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Deseas eliminar todos los equipo? ',
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
            this.deleteAllEquipos(nrc,nTrabajador);
          }
        }
      ]
    });
    await alert.present();
  }

}
