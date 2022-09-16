import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { cursoEstudiante } from 'src/app/models/cursoEstudiante';
import { Curso } from 'src/app/models/Curso';
import { Equipo } from 'src/app/models/Equipo';

@Component({
  selector: 'app-calificacion-promedio',
  templateUrl: './calificacion-promedio.page.html',
  styleUrls: ['./calificacion-promedio.page.scss'],
})
export class CalificacionPromedioPage implements OnInit {

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

  

  user:number;
  nrc:number;
  curso:string;
  id:number;

  nTrabajador:number;
  lista:boolean = true;
  reporte:boolean = false;
  
  prom:number = 0;
  num:number = 0;
  
  suma:number = 0;
  promedio:number = -1;

  actividades:any=[];
  actividadesE:any=[];
  equipos:Equipo[] = [];
  calificacionA:number = 0;
  calificacionAE:number = 0;
  actA:number = 0;
  actAE:number = 0;
  actC:number = 0;
  actCE:number = 0;

  fecha4:any=[];
  fecha5:any=[];
  constructor( private menu:MenuController, private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;     
    this.user = params.user;  
    this.nrc = params.nrc;
    this.curso = params.materia;
    this.id = params.id;
    console.log(this.id);
    this.nTrabajador = params.nTrabajador;

    this.obtenerActividades();
    this.obtenerActividadesE();

    this.getCourse();
    this.estudiantesCursos();
    this.getAtividad();    
    this.getequipoAlumno(this.id);
    
  }
//-------------------------------------------------------------------
//         funciones
//-------------------------------------------------------------------

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

obtenerActividades(){
  this.datosService.getActivityEs(this.nrc, this.nTrabajador, this.user).subscribe(
    res => {
        this.actividades = res;     
        for(let i = 0; i<this.actividades.length;i++){
          const fecha = String(this.actividades[i].fecha);
          this.actividades[i].fecha = fecha.substr(0,10);

          const fecha2 = String(this.actividades[i].fechaEntrega);
          this.actividades[i].fechaEntrega = fecha2.substr(0,10);
          const fecha3 = String(this.actividades[i].fechaEstudiante);
          this.actividades[i].fechaEstudiante = fecha3.substr(0,10);

          this.calificacionA = this.calificacionA + this.actividades[i].calificacion;
          this.actA = this.actividades.length;
          if(this.actividades[i].calificacion != 0 ){
            this.actC = this.actC +1;
          }

          // console.log(this.actividades[i].fechaEstudiante)

          // const fecha4 = new Date(this.actividades[i].fechaEntrega);
          // const fecha5 = new Date(this.actividades[i].fechaEsudiante);
          // if(this.actividades[i].fechaEstudiante != '0000-00-00'){
          //   this.actividades[i].fechaEntrega = Number(Math.abs(fecha4.getTime()));
          //   this.actividades[i].fechaEstudiante = Number(Math.abs(fecha5.getTime()));
          //   console.log("Holaaaa: " + this.actividades[i].fechaEntrega);
          // }
        }
    },
    err => console.error(err)
  );
}

obtenerActividadesE(){
  this.datosService.getActivityEqEs(this.nrc, this.nTrabajador, this.user, this.id).subscribe(
    res => {
        this.actividadesE = res;  
        for(let i = 0; i<this.actividadesE.length;i++){

          const fecha = String(this.actividadesE[i].fecha);
          this.actividadesE[i].fecha = fecha.substr(0,10);
          const fecha2 = String(this.actividadesE[i].fechaEntrega);
          this.actividadesE[i].fechaEntrega = fecha2.substr(0,10);
          const fecha3 = String(this.actividadesE[i].fechaEstudiante);
          this.actividadesE[i].fechaEstudiante = fecha3.substr(0,10);
          this.calificacionAE = this.calificacionAE + this.actividadesE[i].calificacion;
          this.actAE = this.actividadesE.length;
          if(this.actividadesE[i].calificacion != 0 ){
            this.actCE = this.actCE +1;
          }
          this.datosService.getid(this.actividadesE[0].id_equipo).subscribe(
            res => {
              this.equipos[this.actividadesE[0].id_equipo] = res; 
              //console.log(this.equipos[this.activitys[i].id_equipo].nombre);
              // this.equiposR = this.equipos.filter(function(x) {
              //   return x !== undefined;
              // });
            },
            err => console.error(err)
          );
        }
    },
    err => console.error(err)
  );
}

getAtividad(){
  this.datosService.getActividad().subscribe(
    res => {
      this.actividads = res;
      for(let i=0;i<this.actividads.length;i++){   
        if(this.user == this.actividads[i].matricula && this.id == this.actividads[i].id_equipo){
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
