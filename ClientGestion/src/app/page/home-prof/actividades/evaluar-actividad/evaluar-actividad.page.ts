import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { Actividad } from '../../../../models/Actividad';

@Component({
  selector: 'app-evaluar-actividad',
  templateUrl: './evaluar-actividad.page.html',
  styleUrls: ['./evaluar-actividad.page.scss'],
})

export class EvaluarActividadPage implements OnInit {

  constructor(private datosService:DatosService, private menu:MenuController, private router: Router, private activedRoute:ActivatedRoute) { }

  boton:number = 3;
  nTrabajador: number = 1234;
  nrc: number = 1234
  actividades:any= [];
  actividadesE:any= [];
  actividades2:any=[];
  actividades2E:any=[];
  
  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    this.nrc = params.nrc;
    this.nTrabajador = params.user;
    this.getActividad();
    this.getActividadE();
  }

  navProf(){
    this.router.navigate(['/home-prof/home-prof/menu-prof',this.nTrabajador,this.nrc]);
    this.boton = 0;
  }

  condicion1(){
    this.boton=1;
    this.getActividad();
  }

  condicion2(){
    this.boton=3;
    this.getActividadE();
  }

  atras(){
    this.boton = 0;
  }

  atras2(){
    this.boton = 1;
  }

  atras3(){
    this.boton = 3;
  }

  getActividad(){
    this.datosService.getActivity(this.nrc, this.nTrabajador).subscribe(
      res => {
        this.actividades = res;       
      },
      err => console.error(err)
    );
  }

  getActividadE(){
    this.datosService.getActivityEq(this.nrc, this.nTrabajador).subscribe(
      res => {
        this.actividadesE = res;        
      },
      err => console.error(err)
    );
  }

  act(nrc:number, noTrabajador:number, id:string){
    this.boton=2;
    this.datosService.act(nrc, noTrabajador, id).subscribe(
      res => {
        this.actividades2 = res;        
      },
      err => console.error(err)
    );
  }
  actE(nrc:number, noTrabajador:number, id:string, id_equipo:number){
    this.boton=4;
    this.datosService.actE(nrc, noTrabajador, id, id_equipo).subscribe(
      res => {
        this.actividades2E = res;        
      },
      err => console.error(err)
    );
  }
}
