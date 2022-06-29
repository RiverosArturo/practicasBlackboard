
import { MenuController } from '@ionic/angular';

import { Component, HostBinding, OnInit } from '@angular/core';
import { Prof } from 'src/app/models/Prof';
import { DatosService } from '../../../../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/models/Curso';
import { ProfCourse } from 'src/app/models/ProfCourse';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.page.html',
  styleUrls: ['./crear-curso.page.scss'],
})
export class CrearCursoPage implements OnInit {
  user:number=201347656;

  @HostBinding('class') classes = 'row';

  pCourse: ProfCourse = {
    nrc:0,
  };
  course: Curso = {
    nrc:0,
  }
  prof: Prof = {
    password: '',
  };
  pCourses:any=[];
  profs:any = [];
  courses:any = [];

  edit:boolean = false;

  constructor(private menu:MenuController, private datosService: DatosService, private router:Router,private activedRoute:ActivatedRoute) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
    this.getCourse();
    this.getProf();  
  }
  getCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.error(err)
    );
  }
  getProf(){
    this.datosService.getProfs().subscribe(
      res => {
        this.profs = res;
      },
      err => console.error(err)
    );
  }
  getProfCourses(){
    this.datosService.getProfCourses().subscribe(
      res => {
        this.pCourses = res;
      },
      err => console.error(err)
    );
  }
  saveProfCourse(){
    this.datosService.saveProfCourse(this.pCourse)
    .subscribe(
      res => {
        console.log(res);    
        this.getProfCourses()          
        this.router.navigate(['/home-prof']);
      },
      err => console.error(err)
    )
  }  

}

//[routerLink]="['../../home-prof']"
