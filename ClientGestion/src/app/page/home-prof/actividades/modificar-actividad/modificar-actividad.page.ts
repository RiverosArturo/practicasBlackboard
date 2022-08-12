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
    //this.router.navigate(['/home-prof/home-prof/menu-prof',this.actividadCurso.noTrabajador,this.actividadCurso.nrc]);
  }
  navProf(){
    this.router.navigate(['/home-prof/home-prof/menu-prof',this.actividadCurso.noTrabajador,this.actividadCurso.nrc]);
  }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    this.actividadCurso.noTrabajador = params.noTrabajador;
    this.actividadCurso.nrc = params.nrc;
    if(params.id_equipo > 0 && params.id_equipo != null){
      //se obtiene la actividad de equipo
      console.log("Soy params: kk" + params.id + params.id_equipo + params.nrc + params.noTrabajador);
      this.condicionE = false;
      this.datosService.getOneActividadEq(params.id,params.nrc,params.id_equipo,params.noTrabajador)
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
      console.log("Soy params ff: " + params.id + params.nrc + params.noTrabajador);
      //se obtiene la actividad para curso
      this.condicionE = true;
      this.datosService.getOneActividad(params.id,params.nrc,params.noTrabajador)
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
    if(this.actividadCurso.id_equipo > 0 && this.actividadCurso.id_equipo != null){
      alert("Actividad actualizada con exito!!!");
      this.datosService.actualizarActEq(this.actividadCurso.id, this.actividadCurso.nrc, this.actividadCurso.noTrabajador, this.actividadCurso.id_equipo, this.actividadCurso)
            .subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/home-prof/home-prof/menu-prof',this.actividadCurso.noTrabajador,this.actividadCurso.nrc]);
                // window.location.reload();
              },
              err => console.error(err)
            )
    }else{
      alert("Actividad actualizada con exito!!!");
      this.datosService.actualizarAct(this.actividadCurso.id, this.actividadCurso.nrc, this.actividadCurso.noTrabajador, this.actividadCurso)
            .subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/home-prof/home-prof/menu-prof',this.actividadCurso.noTrabajador,this.actividadCurso.nrc]);
                //window.location.reload();
              },
              err => console.error(err)
            )
    }
  }


}
