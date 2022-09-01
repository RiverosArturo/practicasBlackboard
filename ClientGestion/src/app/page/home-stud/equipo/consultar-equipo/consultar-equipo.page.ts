import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { cursoEstudiante } from 'src/app/models/cursoEstudiante';

@Component({
  selector: 'app-consultar-equipo',
  templateUrl: './consultar-equipo.page.html',
  styleUrls: ['./consultar-equipo.page.scss'],
})
export class ConsultarEquipoPage implements OnInit {

  cursoEs: cursoEstudiante = {  
    matricula: 0,
    nrc: 0,
    nTrabajador:0
  };

  equipos:any = [];

  user:string;
  nrc:number;
  materia:string;
  id:number;
  nTrabajador:number;

  constructor( private menu:MenuController, private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;     
    this.user = params.user;  
    this.nrc = params.nrc;
    this.materia = params.materia;
    this.id = params.id;
    this.getequipoAlumno();
  }
  getequipoAlumno(){
    this.datosService.getOneEquipo(this.id)
      .subscribe(
        res =>{       
          this.equipos = res;           
          console.log(this.equipos.nTrabajador);
          this.nTrabajador = this.equipos.nTrabajador;
          //console.log(this.nTrabajador);
        },
        err => console.error(err)
      )
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
