import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Actividad } from 'src/app/models/Actividad';
import { DatosService } from '../../../../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';
//import moment from 'moment';

@Component({
  selector: 'app-modificar-actividad',
  templateUrl: './modificar-actividad.page.html',
  styleUrls: ['./modificar-actividad.page.scss'],
})
export class ModificarActividadPage implements OnInit {

  actividadCurso:Actividad = {
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

  condicionE:boolean = true;

  //actividad:any = [];

  constructor(private menu:MenuController, private datosService: DatosService, private router: Router, private activedRoute:ActivatedRoute ) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    console.log("Soy params: " + params.id + params.id_equipo + params.nrc + params.noTrabajador);
    if(params.id_equipo > 0 && params.id_equipo != null){
      console.log("Soy equipo");
      console.log("Soy params: " + params.id_equipo);
      //se obtiene la actividad de equipo
      this.condicionE = false;
      this.datosService.getOneActividadEq(params.id, params.id_equipo, params.nTrabajador, params.nrc)
      .subscribe(
        res =>{
          console.log(res);
          this.actividadCurso = res;
          const fecha = String(this.actividadCurso.fecha);
          this.actividadCurso.fecha = fecha.substr(0,10);
          const fecha2 = String(this.actividadCurso.fechaEntrega);
          this.actividadCurso.fechaEntrega = fecha2.substr(0,10);

          console.log(fecha.substr(0,10));
        }
      );
    }else{
      console.log("Soy params: " + params.id_equipo);
      //se obtiene la actividad para curso
      this.condicionE = true;
      this.datosService.getOneActividad(params.id, params.nTrabajador, params.nrc)
      .subscribe(
        res =>{
          console.log(res);
          this.actividadCurso = res;
          const fecha = String(this.actividadCurso.fecha);
          this.actividadCurso.fecha = fecha.substr(0,10);
          const fecha2 = String(this.actividadCurso.fechaEntrega);
          this.actividadCurso.fechaEntrega = fecha2.substr(0,10);
        }
      );
    }
  }

  onSubmit(){
    // if(this.actividadCurso.id_equipo > 0 && this.actividadCurso.id_equipo != null){
    //   this.datosService.modificarAct(this.actividadCurso.id, this.actividadCurso.id_equipo)
    //         .subscribe(
    //           res => {
    //             console.log(res);
    //           },
    //           err => console.error(err)
    //         )
    // }

  }
}
