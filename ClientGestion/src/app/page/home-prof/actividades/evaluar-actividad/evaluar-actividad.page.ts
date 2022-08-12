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

  actividad:Actividad = {
    id: '',
    nombre: '',
    descripcion: '',
    fecha: '',
    fechaEntrega: '',
    horaEntrega: '',
    noTrabajador: 0,
    nrc: 0,
    id_equipo: null,
    calificacion: 0,
    matricula: 0
  }
  nTrabajador: number = 1234;
  nrc: number = 1234
  actividads:any= [];
  
  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
    this.getStudCourse();
    const params = this.activedRoute.snapshot.params;
    this.nrc = params.nrc;
    this.nTrabajador = params.user;
  }

  navProf(){
    this.router.navigate(['/home-prof/home-prof/menu-prof',this.nTrabajador,this.nrc]);
  }

  getStudCourse(){
    this.datosService.getActivity().subscribe(
      res => {
        this.actividads = res;        
      },
      err => console.error(err)
    );
  }

  getStudCourse2(){
    this.datosService.getActivity().subscribe(
      res => {
        this.actividads = res;        
      },
      err => console.error(err)
    );
  }
}
