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
  auxs:any = [];

  getEquipoId:any = [];
  getEquipoN:any = [];

  constructor( public alertController:AlertController,private activedRoute:ActivatedRoute,private menu:MenuController, private datosService:DatosService, private router:Router, private activated:ActivatedRoute) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;  
    console.log(params);
    this.user = params.user;
    this.nrc = params.nrc;
    this.course = params.curso;
    this.nTrabajador = params.user;

    this.equipo.curso_nrc = this.nrc;
    this.equipo.nTrabajador = this.nTrabajador;
    this.getEquipos();
  }
  Save(id, nombre, curso_nrc, nTrabajador){
    console.log(id, nombre, curso_nrc, nTrabajador);  
    this.datosService.getEquipo(id, nombre, curso_nrc, nTrabajador).subscribe(
      res => {
        this.equipo = res;
        console.log(this.equipo);
        if(id == null || nombre == null){
          console.log('Llena los parametros');
          //this.Alert3();
        }else{
          if(this.equipo.nTrabajador == nTrabajador && this.equipo.curso_nrc == curso_nrc){
            console.log('El curso ya existe');
            //this.Alert2(nrc);
          }else{
            console.log('Guardando curso');
            //this.AlertSave(nrc);
          }
        }        
      },
      err => console.error(err)
    );
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
