import { Component,HostBinding, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Equipo } from '../../../../models/Equipo';
import { DatosService } from '../../../../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-generar-equipo',
  templateUrl: './generar-equipo.page.html',
  styleUrls: ['./generar-equipo.page.scss'],
})
export class GenerarEquipoPage implements OnInit {
 
  user:number= 2013;
  nrc:number = 0;
  nTrabajador:number=0;
  course:string='cur';

  equipo:Equipo = {
    curso_nrc:0,
    nTrabajador: 0,    
  }

  equipos:any = [];
  pequipos:any = [];

  getEquipoId:any = [];
  getEquipoN:any = [];

  constructor( public alertController:AlertController,private activedRoute:ActivatedRoute,private menu:MenuController, private datosService:DatosService, private router:Router, private activated:ActivatedRoute) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;    
    this.user = params.user;
    this.nrc = params.nrc;
    this.course = params.curso;
    this.nTrabajador = params.user;

    this.equipo.curso_nrc = this.nrc;
    this.equipo.nTrabajador = this.nTrabajador;
    this.getEquipos();
  }
  Save(id, nombre, curso_nrc, nTrabajador){
    //console.log('Datos enviados:',id, nombre, curso_nrc, nTrabajador); 
    this.datosService.getEquipo(id, nombre, curso_nrc, nTrabajador).subscribe(
      res => {
        this.pequipos = res;
        if(id == null || nombre == null){
          console.log('Llena los parametros');
          this.AlertLLenar();
        }else{
          this.saveEquipo();
          this.AlertEquipoGenerado(nombre);
          //console.log('Datos resividos:',this.pequipos.id); 
          /*
          if(this.equipo.nTrabajador == nTrabajador && this.equipo.curso_nrc == curso_nrc){
            console.log('El equipo ya existe');
            this.Alert_ya_existe(nombre);
          }else{
            console.log('Equipo creado');
            //this.AlertSave(nrc);            
          }*/
        }        
      },
      err => console.error(err)
    );
  }
  async AlertEquipoGenerado(nombre) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmado',
      message:  nombre +' creado',
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
  async Alert_ya_existe(nombre) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: 'El equipo '+ nombre +'ya existe',
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
  async AlertLLenar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: '<strong> Llena los parametros Id, Nombre </strong> ',
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
  getEquipo(id:number, nombre:string, curso_nrc:number, nTrabajador:number){
    this.datosService.getEquipo(id, nombre, curso_nrc, nTrabajador).subscribe(
        res => {
          console.log('Datos enviados:',id, nombre, curso_nrc, nTrabajador);
          this.equipo = res;
        },
        err => console.error(err)
    );
  }
  Save2(id, nombre, curso_nrc, nTrabajador) {  
    //console.log('Datos enviados:',id, nombre, curso_nrc, nTrabajador);        
    //this.getEquipo(id,nombre,curso_nrc,nTrabajador);  
    /*
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mensage!',
      message: ' Equipo '+ nombre+' guardado.' ,
      buttons: [
        {
          text: 'ok',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.saveEquipo();
          }
        }
      ]
    });
    await alert.present();
    */
  }

// Guarda los parametros del equipo creado  
  saveEquipo(){
    this.datosService.saveEquipo(this.equipo)
    .subscribe(
      res => {
        console.log(res);                       
      },
      err => console.error(err)
    )
  }  
  getEquipos(){
    this.datosService.getEquipos().subscribe(
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
}
