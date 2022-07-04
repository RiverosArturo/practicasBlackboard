import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfCourse } from '../../../models/ProfCourse'
import { Prof } from '../../../models/Prof'
import { Curso } from '../../../models/Curso'

@Component({
  selector: 'app-menu-prof',
  templateUrl: './menu-prof.page.html',
  styleUrls: ['./menu-prof.page.scss'],
})
export class MenuProfPage implements OnInit {

  user:number= 2013;
  curso:string = 'IA';

  prof: Prof = {  
    nTrabajador:0    
  };
  course: Curso = {
    nrc:0,
  }
  pCourse: ProfCourse = {
    nTrabajador:0,
    nrc:0,       
  };

  pCourses:number;
  nTrabajador:number;

  constructor(private menu:MenuController, private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    //const params = this.activedRoute.snapshot.params;  
    //this.user = params.user;
    console.log('User: ',this.user);
    
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
