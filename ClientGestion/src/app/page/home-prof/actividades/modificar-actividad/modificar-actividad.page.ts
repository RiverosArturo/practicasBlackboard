import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Actividad } from 'src/app/models/Actividad';
import { DatosService } from '../../../../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  actividad:any = [];

  constructor(private menu:MenuController, private datosService: DatosService, private router: Router, private activedRoute:ActivatedRoute ) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    if(params.id_equipo != null || params.id_equipo == ''){
      //se obtiene la actividad de equipo
      this.condicionE = false;
      this.datosService.getOneActividadEq(params.id, params.id_equipo)
      .subscribe(
        res =>{
          console.log(res);
          this.actividad = res;
        }
      );
    }else{
      //se obtiene la actividad para curso
      this.condicionE = true;
      this.datosService.getOneActividad(params.id)
      .subscribe(
        res =>{
          console.log(res);
          this.actividad = res;
        }
      );
    }
  }

}
