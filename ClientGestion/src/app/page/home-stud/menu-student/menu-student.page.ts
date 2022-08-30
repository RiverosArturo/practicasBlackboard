import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from 'src/app/services/datos.service';
import { Curso } from 'src/app/models/Curso';
import { cursoEstudiante } from 'src/app/models/cursoEstudiante';

@Component({
  selector: 'app-menu-student',
  templateUrl: './menu-student.page.html',
  styleUrls: ['./menu-student.page.scss'],
})
export class MenuStudentPage implements OnInit {

  cursoEs: cursoEstudiante = {  
    matricula: 0,
    nrc: 0,
    nTrabajador:0
  };

  user:string;
  nrc:number;
  course: Curso = {
    materia:'IA',
    nrc:0,    
  }
  materia:string = 'Materia';

  constructor( private menu:MenuController, private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;     
    this.user = params.user;  
    this.nrc = params.nrc;
    this.materia = params.materia; 
    this.getCurso();       
  }

  OpenMenuStud(){
    this.menu.enable(true,'MenuStud');
    this.menu.open('MenuStud');
  }
  openmenu0(){
    this.menu.enable(true,'end');
    this.menu.open('end')
  }

  getCurso(){
    this.datosService.getCourse(this.nrc)
      .subscribe(
        res =>{       
          this.course = res;                   
        },
        err => console.error(err)
      )
  }

}
