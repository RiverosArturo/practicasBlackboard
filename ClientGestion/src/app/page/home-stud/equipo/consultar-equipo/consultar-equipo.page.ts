import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { cursoEstudiante } from 'src/app/models/cursoEstudiante';
import { Equipo } from 'src/app/models/Equipo';
import { Student } from 'src/app/models/Student';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-consultar-equipo',
  templateUrl: './consultar-equipo.page.html',
  styleUrls: ['./consultar-equipo.page.scss'],
})
export class ConsultarEquipoPage implements OnInit {

  cursoEs: cursoEstudiante = {  
    matricula: 0,
    nrc: 0,
    nTrabajador:0
  };

  user:string;
  nrc:number;
  materia:string = 'IA';
  id:number;
  nTrabajador:number;

  edit:boolean = false;
//-------------------------------------------------------------------
student: Student = {
  matricula:0,
} 

courses:any = [];  
equipos:any = [];
oneEquipos:any = [];//Alumnos integrantes del equipo
Eequipos:any = [];

Eequipo:Equipo ={
  id: 0,
  nombre:'Equipo IA',
  curso_nrc:0,
  nTrabajador:0

};
equipo:Equipo ={
  id: 0,
  nombre:'Equipo IA',
  curso_nrc:0,
  nTrabajador:0

};

studentEquipo:any = {// estructura del alumno integrante del equipo
  matricula:0,
  id_equipo:0,
  nrc:0,
  nTrabajador:0,
};

curso:string='cur';
check:boolean=true;

add:boolean = false;
query:boolean = false;
equi:boolean = false;

deleteEqui:boolean = false;
delete2:boolean = false;
nomb:string;
nombreEquipo:string = 'equi';



students:any = [];//Alumnos de la base para nombre del alumno  
studCourses:any = [];//Alumnos del curso

  constructor(public alertController:AlertController, private menu:MenuController, private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;     
    this.user = params.user;  
    this.nrc = params.nrc;
    this.materia = params.materia;
    this.id = params.id;
    this.nTrabajador = params.nTrabajador;
    this.getequipoAlumno();
    this.getStudent();
    this.getEquipo(this.id);
    console.log('params ',params.materia);
  }
  editar(){
    this.edit = true;
  }
  close(){
    this.edit = false;
  }
  getEquipo(id:number){// Optiene datos de un solo equipo    
    this.datosService.getEquipos().subscribe(
      res => {
        this.Eequipos = res;   
        console.log('id:',id);
        for(let i = 0; i<this.Eequipos.length;i++){
          if(id == this.Eequipos[i].id){
            this.nombreEquipo = this.Eequipos[i].nombre;
          }
        }               
      },
      err => console.error(err)
    );
  }
  getequipoAlumno(){// Optiene alumnos integrantes del equipo
    this.datosService.getOneEquipo(this.id)
      .subscribe(
        res =>{       
          this.equipos = res;      
          //console.log(':::>',this.equipos);         
        },
        err => console.error(err)
      )
  }
  
  editEquipoButton(id:number, nombre:string, nrc:number, nTrabajador:number){//verifica si el nombre has si usado y edita el nombre del equipo
    console.log("Inicia funcion");      
    this.datosService.getEquipos1(nrc, nTrabajador).subscribe(
      res => {
        this.oneEquipos = res;        
        for(let i=0;i<this.oneEquipos.length;i++){          
          if(this.oneEquipos[i].nombre == nombre){            
            this.check = false;
          }
          else if(i==this.oneEquipos.length-1 && this.check==false){
            this.AlertYaExisteEquipo(nombre);
            this.edit = true;
            this.check = true;
          }
          else if(i==this.oneEquipos.length-1 && this.check==true){            
            this.equipo.id = id;
            this.equipo.curso_nrc = nrc;
            this.equipo.nTrabajador = this.nTrabajador;
            this.equipo.nombre = nombre;            

            this.datosService.updateEquipo(this.equipo.id, this.equipo.curso_nrc, this.equipo.nTrabajador, this.equipo)
            .subscribe(
              res =>{
              console.log(res);                
              this.edit = true;
              this.check = true;
              this.getEquipos1(nrc,nTrabajador);
              console.log('Nombre cambiado.');
              this.AlerteditOKEquipo(nombre);
            },
            err => console.error(err)
            )
          }
        }                 
        
      },
      err => console.error(err)
    );
  }
  getStudCourse(nrc:number, nTrabajador:number){//optine  los alumnos del curso
    this.datosService.getStudCourse(nrc,nTrabajador).subscribe(
      res => {
        this.studCourses = res;                          
      },
      err => console.error(err)
    );
  }
  getStudent(){//optiene los alumnos inscritos en el sistema
    this.datosService.getStudents().subscribe(
      res => {
        this.students = res;           
      },
      err => console.error(err)
    );
  }
  get1Equipo(id:number){// Optiene datos de un solo equipo    
    this.datosService.getOneEquipo(id).subscribe(
      res => {
        this.oneEquipos = res;   
        //console.log(this.oneEquipos);         
      },
      err => console.error(err)
    );
  }
  getEquipos1(nrc:number, nTrabajador:number){    
    this.datosService.getEquipos1(nrc, nTrabajador).subscribe(
      res => {
        this.equipos = res;        
      },
      err => console.error(err)
    );
  }
  deleteStudentEquipo(matricula:number, id:number, nrc:number, nTrabajador:number){        
    this.datosService.deleteStudentEquipo(matricula, id, nrc, nTrabajador).subscribe(
      res => {
        console.log(res); 
        this.getequipoAlumno();  
        this.getStudent();      
      },
      err => console.error(err)
    )
  }
//--------------------------------------------------------------------------  
//                          funciones de alert
//--------------------------------------------------------------------------
      
async AlertDeleteStudentEquipo(matricula: number, id:number, nrc:number, nTrabajador:number) {  
  console.log(matricula, id, nrc, nTrabajador);  
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirma',
    message: '<strong>Eliminar </strong>!!! '+ matricula + ' del equipo?' ,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        id: 'cancel-button',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        id: 'confirm-button',
        handler: () => {
          console.log('Confirm Okay');
          this.deleteStudentEquipo(matricula, id, nrc, nTrabajador);            
        }
      }
    ]
  });
  await alert.present();
}

async AlerteditOKEquipo( nombre:string ) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: ' ',
    message: 'Nombre del equipo ha sido cambiado por '+ nombre,      
    buttons: [
      {
        text: 'Ok',
        id: 'confirm-button',
        handler: () => {
          console.log('Confirm Okay');            
        }
      }
    ]
  });
  await alert.present();
}
  async AlertYaExisteEquipo( nombre:string ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: ' ',
      message: 'Nombre '+ nombre + ' ya existe en un equipo, intenta con otro nombre. ',      
      buttons: [
        {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');            
          }
        }
      ]
    });
    await alert.present();
  }  

  async AlertYaExiste(matricula:number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: ' ',
      message: 'Alumno '+ matricula + ' ya existe en un equipo ',
      buttons: [
        {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');            
          }
        }
      ]
    });
    await alert.present();
  }
  
 //------------------------------------------------------------------------------- 
  OpenMenuStud(){
    this.menu.enable(true,'MenuStud');
    this.menu.open('MenuStud');
  }
  openmenu0(){
    this.menu.enable(true,'end');
    this.menu.open('end')
  }

}
