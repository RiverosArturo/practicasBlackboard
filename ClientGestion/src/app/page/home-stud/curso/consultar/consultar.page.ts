import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { cursoEstudiante } from 'src/app/models/cursoEstudiante';
import { Curso } from 'src/app/models/Curso';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.page.html',
  styleUrls: ['./consultar.page.scss'],
})
export class ConsultarPage implements OnInit {

  cursoEs: cursoEstudiante = {  
    matricula: 0,
    nrc: 0,
    nTrabajador:0
  };
  course: Curso = {
    materia:'',
    nrc:0,
  }
  // course2: Curso = {
  //   materia:'',
  // }  
  // pCourse: ProfCourse = {
  //   nTrabajador:0,
  //   nrc:0,     
  // };

    
  courses:any = [];
  eCursos:any = [];
  user:number=0;

  constructor(private menu:MenuController, private datosService: DatosService, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { }

  OpenMenuStud(){
    this.menu.enable(true,'MenuStud');
    this.menu.open('MenuStud');
  }

  ngOnInit() {
    this.estudiantesCursos();
    this.getCourse();    
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user; 
    this.cursoEs.matricula = this.user;    
  }
  getCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.error(err)
    );
  }
  estudiantesCursos(){
    this.datosService.listaEstudianteCurso().subscribe(
      res => {
        this.eCursos = res;
      },
      err => console.error(err)
    );
  }  
}
