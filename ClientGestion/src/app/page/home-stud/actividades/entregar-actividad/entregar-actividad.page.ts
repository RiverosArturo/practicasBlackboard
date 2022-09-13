import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Actividad } from 'src/app/models/Actividad';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-entregar-actividad',
  templateUrl: './entregar-actividad.page.html',
  styleUrls: ['./entregar-actividad.page.scss'],
})
export class EntregarActividadPage implements OnInit {

  actividad:Actividad;
  user:number;
  curso:any;
  actividadE:Actividad;

  constructor(private sanitizer: DomSanitizer ,private menu:MenuController, private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    this.user = params.user;
    this.curso = params.curso;
    this.actividad = {
      id: params.id,
      nombre: params.nombre,
      descripcion: params.descripcion,
      fecha: params.fecha,
      fechaEntrega: params.fechaEntrega,
      horaEntrega: params.horaEntrega,
      noTrabajador: params.nTrabajador,
      nrc: params.nrc,
      id_equipo: null,
      calificacion: params.calificacion,
      matricula: params.user,
      urlProfesor: params.urlProfesor,
      urlEstudiante: params.urlEstudiante,
      fechaEstudiante: params.fechaEstudiante,
      comentarioProfesor: params.comentarioProfesor,
      horaEstudiante: params.horaEstudiante
    }
    this.actividadE = {
      id_equipo: params.id_equipo
    }
    // console.log(this.actividad.id_equipo);
    // console.log(this.actividadE.id_equipo);
  }

  onSubmit(){
    if(this.actividad.id_equipo > 0 && this.actividad.id_equipo != null){
      let hoy = new Date();
      let dia = hoy.getDate();
      let mes = hoy.getMonth() + 1;
      let agnio = hoy.getFullYear();
      let dia2 = ('0' + dia).slice(-2);
      let mes2 = ('0' + mes).slice(-2);
      let horas = hoy.getHours();
      let minutos = hoy.getMinutes();

      console.log("Fecha: " + `${agnio}-${mes2}-${dia2}`);
      console.log("Hora: " + `${horas}:${minutos}`);

      this.actividad.fechaEntrega = `${dia2}-${mes2}-${agnio}`;
      this.actividad.horaEstudiante = `${horas}:${minutos}`;
      alert("Actividad actualizada con exito!!!");
      this.datosService.actualizarActEqAl(this.actividad.id, this.actividad.nrc, this.actividad.noTrabajador, this.actividadE.id_equipo, this.user, this.actividad)
            .subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/home-stud/menu-student/menu-student',this.user,this.actividad.nrc, this.curso, this.actividad.noTrabajador]);
                // window.location.reload();
              },
              err => console.error(err)
            );
    }else{
      this.actividadE.fechaEntrega = 'x';
      this.actividadE.horaEstudiante = 'x';
      alert("Actividad actualizada con exito!!!");
      this.datosService.actualizarActAl(this.actividad.id, this.actividad.nrc, this.actividad.noTrabajador, this.user, this.actividad)
            .subscribe(
              res => {
                console.log(res);
                this.router.navigate(['/home-stud/menu-student/menu-student',this.user,this.actividad.nrc, this.curso, this.actividad.noTrabajador]);
                //window.location.reload();
              },
              err => console.error(err)
            );
    }
  }

  navStud(){
    this.router.navigate(['/home-stud/menu-student/menu-student',this.user,this.actividad.nrc, this.curso, this.actividad.noTrabajador]);
  }
  OpenMenuStud(){
    this.menu.enable(true,'MenuStud');
    this.menu.open('MenuStud');
  }
  openmenu0(){
    this.menu.enable(true,'end');
    this.menu.open('end')
  }

}
