
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
  selector: 'app-eliminar-estudiante',
  templateUrl: './eliminar-estudiante.page.html',
  styleUrls: ['./eliminar-estudiante.page.scss'],
})
export class EliminarEstudiantePage implements OnInit {

  student: Student = {
    matricula:0,
    nombre:'',
  }    
  course: Curso = {    
    nrc:0,     
  };
    
  students:any = [];
  courses:any = [];
  studCourses:any = [];

  user:number = 0;
  nrc:number = 0;
  curso:string = '';
  nTrabajador:number = 0;

  constructor(private menu:MenuController, private datosService: DatosService, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;  

    this.user = params.user;
    this.nrc = params.nrc;    
    this.curso = params.curso;
    this.nTrabajador = params.user;
    console.log(this.nTrabajador);
  }

}
