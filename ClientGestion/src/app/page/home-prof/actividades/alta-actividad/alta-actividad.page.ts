import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Actividad } from '../../../../models/Actividad';
import { DatosService } from '../../../../services/datos.service';

@Component({
  selector: 'app-alta-actividad',
  templateUrl: './alta-actividad.page.html',
  styleUrls: ['./alta-actividad.page.scss'],
})
export class AltaActividadPage implements OnInit {

  constructor(private datosService:DatosService, private menu:MenuController) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  nrc:number = 15437;
  nTrabajador:number = 202015110;
  getActividad:any = [];

  actividadCurso: Actividad = {
    id: '',
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
    console.log(this.actividadCurso);
    this.datosService.getOneActividad(this.actividadCurso.id).subscribe(
      res => {
        this.getActividad = res;

        if( this.getActividad.id == ""){
          alert("Actividad agregada con exito!!!");
          this.datosService.saveActividad(this.actividadCurso).subscribe(
            res => {
              console.log(res);
            },
            err => console.error(err)
          );
        }else{
          alert("El ID de la actividad ya existe, ingresa uno nuevo!!!");
        }
      });
  }

}
