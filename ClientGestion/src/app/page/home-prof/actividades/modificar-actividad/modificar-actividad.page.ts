import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Actividad } from 'src/app/models/Actividad';

@Component({
  selector: 'app-modificar-actividad',
  templateUrl: './modificar-actividad.page.html',
  styleUrls: ['./modificar-actividad.page.scss'],
})
export class ModificarActividadPage implements OnInit {

  activity:Actividad = {
    id: '',
    nombre: '',
    descripcion: '',
    fecha: '',
    fechaEntrega: '',
    horaEntrega: '',
    noTrabajador: 0,
    nrc: 0,
    id_equipo: 0,
  }

  constructor(private menu:MenuController) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
  }

}
