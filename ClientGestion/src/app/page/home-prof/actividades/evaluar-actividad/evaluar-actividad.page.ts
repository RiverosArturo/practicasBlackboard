import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { Actividad } from '../../../../models/Actividad';

@Component({
  selector: 'app-evaluar-actividad',
  templateUrl: './evaluar-actividad.page.html',
  styleUrls: ['./evaluar-actividad.page.scss'],
})

export class EvaluarActividadPage implements OnInit {

  constructor(private datosService:DatosService, private menu:MenuController) { }

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
  actividads:any= [];
  
  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
    this.getStudCourse();
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
