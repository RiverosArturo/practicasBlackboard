import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  dat:{
    user10:number,
    nrc20:number,
    nrc30:number,
  };

  pCourses:number;
  nTrabajador:number;

  user:number= 2013;
  curso:string = 'software';
  nrc:number = 10;  
  nrc2:number = 10;
  nrc3:number = 10;
  
  constructor(private datosService: DatosService, private menu:MenuController, private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {         
    const params = this.activedRoute.snapshot.params;  

    this.user = params.user;
    this.nrc2 = params.nrc2;

    console.log('params:', params);
    console.log('user:',this.user);
    console.log('nrc2:',this.nrc2);
    console.log('nrc3:',this.nrc3);
    
    this.datosService.getCourse(this.nrc2)
      .subscribe(
        res =>{       
          this.course = res;               
          this.curso = this.course.materia;     
        },
        err => console.error(err)
      )
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
