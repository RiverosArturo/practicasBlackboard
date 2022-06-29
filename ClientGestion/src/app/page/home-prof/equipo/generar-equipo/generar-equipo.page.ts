import { Component,HostBinding, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Equipo } from '../../../../models/Equipo';
import { Curso } from '../../../../models/Curso';
import { DatosService } from '../../../../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generar-equipo',
  templateUrl: './generar-equipo.page.html',
  styleUrls: ['./generar-equipo.page.scss'],
})
export class GenerarEquipoPage implements OnInit {

  equipo:Equipo = {
    id:0 ,
    nombre:'',
    curso_nrc:0,
  }
  course: Curso = {
    nrc:0,
  }
  equipos:any=[];
  courses:any=[];

  constructor(private menu:MenuController, private datosService:DatosService, private router:Router, private activated:ActivatedRoute) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
    this.getCourse();
  }
  getEquipo(){
    this.datosService.getEquipos().subscribe(
      res => {
        this.equipos = res;
      },
      err => console.error(err)
    );
  }
  saveEquipo(){
    this.datosService.saveEquipo(this.equipos)
    .subscribe(
      res => {
        console.log(res);              
        this.router.navigate(['/']);
      },
      err => console.error(err)
    )
  }
  getCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.error(err)
    );
  }

}
