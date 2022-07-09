
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { ProfCourse } from 'src/app/models/ProfCourse';
import { Curso } from 'src/app/models/Curso';
import { Prof } from 'src/app/models/Prof';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/User';
import { Student } from 'src/app/models/Student';


@Component({
  selector: 'app-consultar-estudiante',
  templateUrl: './consultar-estudiante.page.html',
  styleUrls: ['./consultar-estudiante.page.scss'],
})
export class ConsultarEstudiantePage implements OnInit {

  alumno: Student = {
    matricula:0,
    nombre:'',
  }    
  course: Curso = {    
    nrc:0,     
  };

    
  students:any = [];
  courses:any = [];
  


  constructor(private menu:MenuController, private datosService: DatosService, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { }



  ngOnInit() {
    
  }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

}
