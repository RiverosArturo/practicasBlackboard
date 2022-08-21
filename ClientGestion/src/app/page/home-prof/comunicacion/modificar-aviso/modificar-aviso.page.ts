import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Actividad } from 'src/app/models/Actividad';
import { DatosService } from 'src/app/services/datos.service';
import { Aviso } from '../../../../models/Aviso';

@Component({
  selector: 'app-modificar-aviso',
  templateUrl: './modificar-aviso.page.html',
  styleUrls: ['./modificar-aviso.page.scss'],
})
export class ModificarAvisoPage implements OnInit {

  avisoCurso:Aviso = {
    id: '',
    aviso: '',
    fecha: '',
    hora: '',
    noTrabajador: 0,
    nrc: 0,
    id_equipo: 0
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
    this.router.navigate(['/home-prof/home-prof/menu-prof',this.avisoCurso.noTrabajador,this.avisoCurso.nrc]);
  }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    this.avisoCurso.noTrabajador = params.noTrabajador;
    this.avisoCurso.nrc = params.nrc;
    if(params.id_equipo > 0 && params.id_equipo != null){
      //se obtiene la actividad de equipo
      console.log("Soy params: kk" + params.id + params.id_equipo + params.nrc + params.noTrabajador);
      this.condicionE = false;
      this.datosService.getOneAvisoEq(params.id,params.nrc,params.id_equipo,params.noTrabajador)
      .subscribe(
        res =>{
          console.log(res);
          this.avisoCurso = res;
          const fecha = String(this.avisoCurso.fecha);
          this.avisoCurso.fecha = fecha.substr(0,10);
        }
      );
    }else{
      console.log("Soy params ff: " + params.id + params.nrc + params.noTrabajador);
      //se obtiene la actividad para curso
      this.condicionE = true;
      this.datosService.getOneAviso(params.id,params.nrc,params.noTrabajador)
      .subscribe(
        res =>{
          console.log(res);
          this.avisoCurso = res;
          const fecha = String(this.avisoCurso.fecha);
          this.avisoCurso.fecha = fecha.substr(0,10);
        }
      );
    }
  }

  onSubmit(){
    if(this.avisoCurso.id_equipo > 0 && this.avisoCurso.id_equipo != null){
      alert("Actividad actualizada con exito!!!");
      this.datosService.actualizarAvEq(this.avisoCurso.id, this.avisoCurso.nrc, this.avisoCurso.noTrabajador, this.avisoCurso.id_equipo, this.avisoCurso)
            .subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/home-prof/home-prof/menu-prof',this.avisoCurso.noTrabajador,this.avisoCurso.nrc]);
                // window.location.reload();
              },
              err => console.error(err)
            )
    }else{
      alert("Actividad actualizada con exito!!!");
      this.datosService.actualizarAv(this.avisoCurso.id, this.avisoCurso.nrc, this.avisoCurso.noTrabajador, this.avisoCurso)
            .subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/home-prof/home-prof/menu-prof',this.avisoCurso.noTrabajador,this.avisoCurso.nrc]);
                //window.location.reload();
              },
              err => console.error(err)
            )
    }
  }

}
