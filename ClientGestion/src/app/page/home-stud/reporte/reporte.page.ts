import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { cursoEstudiante } from 'src/app/models/cursoEstudiante';
import { Curso } from 'src/app/models/Curso';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {

  cursoEs: cursoEstudiante = {  
    matricula: 0,
    nrc: 0,
    nTrabajador:0
  };
  course: Curso = {
    materia:'',
    nrc:0,
  }
    
  courses:any = [];
  eCursos:any = [];
  actividads:any =[];
  equipo:any = [];
  

  user:string;
  nrc:number;
  nTrabajador:number;
  lista:boolean = true;
  reporte:boolean = false;
  curso:string;
  fech:Date;
  prom:number = 0;
  num:number = 0;
  id:number;
  NombreEquipo:string = 'IA'; 
  suma:number = 0;
  promedio:number = -1;

  constructor( private menu:MenuController, private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;     
    this.user = params.user;  
    this.nrc = params.nrc;
    this.curso = params.materia;
    this.id = params.id;
    this.getCourse();
    this.estudiantesCursos();
    this.getAtividad();    
    this.getequipoAlumno(this.id);
    this.date();
  }
//-------------------------------------------------------------------
//         funciones
//-------------------------------------------------------------------
date(){

}

report(x:number,m:string,y:number){
  this.reporte = true;
  this.lista =false;
  this.nrc = x;
  this.curso = m;
  this.nTrabajador = y;
}
close(){
  this.reporte = false;
  this.lista = true;
}
getAtividad(){
  this.datosService.getActividad().subscribe(
    res => {
      this.actividads = res;
      for(let i=0;i<this.actividads.length;i++){   
        if(this.user == this.actividads[i].matricula && this.id == this.actividads[i].id_equipo){
          //console.log(i,this.actividads[i].matricula, this.actividads[i].calificacion);  
          this.suma = this.suma + this.actividads[i].calificacion;
          this.num = this.num + 1;
        }                  
      }      
      if(this.num == 0){
        this.promedio = 0;
      }else{
        this.promedio = this.suma / this.num;
      }
    },
    err => console.error(err)
  );
}
getequipoAlumno(id:number){  
    this.datosService.getid(this.id)
    .subscribe(
        res =>{       
        this.equipo = res;                          
     },
      err => console.error(err)
    ) 
}
getCourse(){// Optiene los datos curso
  this.datosService.getCourses().subscribe(
    res => {
      this.courses = res;    
        
    },
    err => console.error(err)
  );
}
estudiantesCursos(){// datos relacion curso alumno
  this.datosService.listaEstudianteCurso().subscribe(
    res => {
      this.eCursos = res;      
    },
    err => console.error(err)
  );
}

//-------------------------------------------------------------------
//         funcion menu
//-------------------------------------------------------------------  

  OpenMenuStud(){
    this.menu.enable(true,'MenuStud');
    this.menu.open('MenuStud');
  }
  openmenu0(){
    this.menu.enable(true,'end');
    this.menu.open('end')
  }

}
