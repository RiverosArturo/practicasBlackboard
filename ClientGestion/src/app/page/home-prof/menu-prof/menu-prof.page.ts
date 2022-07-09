import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfCourse } from '../../../models/ProfCourse';
import { Prof } from '../../../models/Prof';
import { Curso } from '../../../models/Curso';
import { User } from 'src/app/models/User';
import { DatosService } from '../../../services/datos.service';

@Component({
  selector: 'app-menu-prof',
  templateUrl: './menu-prof.page.html',
  styleUrls: ['./menu-prof.page.scss'],
})
export class MenuProfPage implements OnInit {

  user:number= 2013;
  curso:string = 'software';

  prof: Prof = {  
    nTrabajador:0    
  };
  course: Curso = {
    materia:'IA',
    nrc:0,    
  }
  pCourse: ProfCourse = {
    nTrabajador:0,
    nrc:0,       
  };

  pCourses:number;
  nTrabajador:number;
  nrc:number = 0;  
  nrc2:number = 0;
  nrc3:number = 0;

  constructor(private datosService: DatosService, private menu:MenuController, private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {    
    const params = this.activedRoute.snapshot.params;  
    console.log(params);
    this.user = params.user; 
    this.nrc  = params.nrc2; 
    this.nrc3 = params.pCourse;   
    console.log('user: ',this.user,'nrc: ',this.nrc);
    console.log('nrc: ',this.nrc);
    console.log('nrc3: ',this.nrc3);
    this.datosService.getCourse(this.nrc)
      .subscribe(
        res =>{
          console.log(res);
          this.course = res;     
          console.log('materia: ',this.course.materia);
          this.curso = this.course.materia;     
        },
        err => console.error(err)
      )
      
    //console.log(this.course.materia);
    //this.curso = this.course.materia;
  }
  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  openmenu0(){
    this.menu.enable(true,'end');
    this.menu.open('end')
  }

}
