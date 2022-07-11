import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Actividad } from '../../../../models/Actividad';

@Component({
  selector: 'app-alta-actividad',
  templateUrl: './alta-actividad.page.html',
  styleUrls: ['./alta-actividad.page.scss'],
})
export class AltaActividadPage implements OnInit {

  constructor(private menu:MenuController) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  nrc:number = 0;
  nTrabajador:number = 0

  actividadCurso: Actividad = {
    nombre: '',
    descripcion: '',
    fecha: '',
    fechaEntrega: '',
    horaEntrega: '',
    noTrabajador: this.nTrabajador,
    nrc: this.nrc
  }

  actividadEquipo: Actividad = {
    nombre: '',
    descripcion: '',
    fecha: '',
    fechaEntrega: '',
    horaEntrega: '',
    noTrabajador: this.nTrabajador,
    nrc: this.nrc,
    idEquipo: 0
  }

  ngOnInit() {
  }

  onSubmit(){
    alert("Crick");
  }

}
