import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute} from '@angular/router';
import { Student } from 'src/app/models/Student';
import { Equipo } from 'src/app/models/Equipo';

@Component({
  selector: 'app-consultar-equipo',
  templateUrl: './consultar-equipo.page.html',
  styleUrls: ['./consultar-equipo.page.scss'],
})
export class ConsultarEquipoPage implements OnInit {

  student: Student = {
    matricula:0,
  } 

  courses:any = [];  
  equipos:any = [];
  oneEquipos:any = [];//Alumnos integrantes del equipo

  equipo:Equipo ={
    id: 0,
    nombre:'',
    curso_nrc:0,
    nTrabajador:0

  };
  
  studentEquipo:any = {// estructura del alumno integrante del equipo
    matricula:0,
    id_equipo:0,
    nrc:0,
    nTrabajador:0,
  };

  user:number= 2013;
  nrc:number = 0;
  nTrabajador:number=0;
  curso:string='cur';
  check:boolean=true;

  add:boolean = false;
  query:boolean = false;
  equi:boolean = false;
  edit:boolean = false;
  deleteEqui:boolean = false;
  delete2:boolean = false;
  nomb:string;
  addStud:boolean = false;

  students:any = [];//Alumnos de la base para nombre del alumno  
  studCourses:any = [];//Alumnos del curso
  listEquipos:any = [];//lista completa de la tabla estudiante_equipo

  constructor(private activedRoute:ActivatedRoute,private menu:MenuController, private datosService: DatosService, public alertController:AlertController, private router: Router) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;      
    this.user = params.user;
    this.nrc = params.nrc;
    this.curso = params.curso;
    this.nTrabajador = params.user;

    this.getCourse();
    this.getEquipos1(this.nrc, this.nTrabajador); 
    this.getStudCourse(this.nrc,this.nTrabajador); 
    this.getStudent();

  }
  navProf(){
    this.router.navigate(['/home-prof/home-prof/menu-prof',this.user,this.nrc]);
  }
  editEquipo(id:number, nombre:string){//muestra la interfaz de editar equipo
    this.add = false;
    this.query = false;
    this.edit = true;
    this.nomb =nombre;        
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
              //this.AlerteditOKEquipo(nombre);
            },
            err => console.error(err)
            )
          }
        }                 
        
      },
      err => console.error(err)
    );
  }
  notEdit(){
    this.edit = false;
  }
  queryEquipo(id:number, nombre:string){
    this.add = false;
    this.edit = false;
    this.query = true;
    this.nomb =nombre;   
    console.log('::>', id, this.nrc, this.nTrabajador);
    this.get1Equipo(id); 
  }
  notQuery(){
    this.query = false;
  }
  addStudent(nombre:string){
    this.notQuery();
    this.add = true;
    this.nomb =nombre;    
  }
  notAdd(){
    this.add = false;
  }
  saveStudentEquipo(id:number, matricula:number, nombre:string, nTrabajador:number ){//funcion que agrega alumnos al equipo
    this.add = false;    
    this.studentEquipo.id_equipo = id;
    this.studentEquipo.nrc = this.nrc;
    this.studentEquipo.nTrabajador = this.nTrabajador;
    console.log('-->',matricula, id, this.nrc, nTrabajador, nombre);
    // codigo comprueba si el alumno ya ha sido agregado a un equipo   
          
      this.datosService.getEquiposE().subscribe(
        res => {        
          this.listEquipos = res;      
          console.log('dat ', this.listEquipos);
          for(let i=0;i<this.listEquipos.length;i++){
            if( matricula == this.listEquipos[i].matricula){
              if(this.listEquipos[i].nrc == this.nrc){
                if(this.listEquipos[i].id_equipo == id){
                  this.addStud = false;
                  console.log('Alumno ya existe en un equipo.',i,this.addStud);                  
                }else{
                  this.addStud = true;
                }     
              }                                 
            }else{           
              //this.addStud = true;
              console.log('Agregando alumno al equipo.',i,this.addStud);  
              if(this.addStud == true){
                console.log('Agregando alumno al equipo.',i);  
                this.datosService.saveStudentEquipo(this.studentEquipo).subscribe(
                res => {
                  console.log(res);  
                  this.add = false; 
                  this.addStud = false;
                  //this.AlertAdd(matricula, nombre);
                },
                err => console.error(err)
              )
              }                                   
            }
          }        
          },
          err => console.error(err)
        );            
  }
  addStudentEquipo(matricula:number, nombre:string){
    this.datosService.saveStudentEquipo(this.studentEquipo).subscribe(
      res => {
        console.log(res);  
        this.add = false; 
        this.addStud = false;
        //this.AlertAdd(matricula, nombre);
      },
      err => console.error(err)
    )

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
  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }
  getCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.error(err)
    );
  }
 //-------------------------------------------------------- 
  deleteStudentsEquipo(id:number, nrc:number, nTrabajador:number){    
    this.datosService.deleteStudentsEquipo(id, nrc, nTrabajador ).subscribe(
      res => {
        console.log(res);              
      },
      err => console.error(err)
    )
  }
  deleteStudentEquipo(matricula:number, id:number, nrc:number, nTrabajador:number){        
    this.datosService.deleteStudentEquipo(matricula, id, nrc, nTrabajador).subscribe(
      res => {
        console.log(res); 
        this.get1Equipo(id);
      },
      err => console.error(err)
    )
  }
  deleteEquipo(id:number, nrc:number, nTrabajador:number){        
    this.deleteEqui = true;
    this.datosService.deleteEquipo(id, nrc, nTrabajador).subscribe(
      res => {
        console.log(res);    
        this.getEquipos1(this.nrc, this.nTrabajador); 
        //this.getEquipos1(this.nrc, this.nTrabajador);            
      },
      err => console.error(err)
    )
  }
  deleteActsEq(id_equipo:number, nrc:number, nTrabajador:number){        
    this.deleteEqui = true;
    this.datosService.deleteActividadEqs(id_equipo, nrc, nTrabajador).subscribe(
      res => {
        console.log(res);               
      },
      err => console.error(err)
    )
  }
  deleteAllEquipos(nrc:number, nTrabajador:number){
    this.datosService.deleteAllEquipos(nrc, nTrabajador).subscribe(
      res => {
        console.log(res);    
        //this.getEquipos1(this.nrc, nTrabajador);    
      },
      err => console.error(err)
    )
  }
//---- funciones de alert-------  
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
  
  async AlertAdd(matricula:number, nombre:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: ' ',
      message: 'Alumno '+ matricula + ' agregado a ' + nombre,
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

  async AlertDeleteStudentEquipo(matricula: number, id:number, nrc:number, nTrabajador:number) {    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirma',
      message: '<strong>Eliminar </strong>!!! '+ matricula ,
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
  async AlertDeleteEquipo(id: number,nombre:string, curso_nrc:number, nTrabajador:number) {    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirma',
      message: '<strong>Eliminar </strong>!!! '+ nombre ,
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
            this.deleteActsEq(id,curso_nrc,nTrabajador);
            this.deleteStudentsEquipo(id, curso_nrc, nTrabajador);            
            this.deleteEquipo(id, curso_nrc, nTrabajador); 
            this.query = false; 
          }
        }
      ]
    });
    await alert.present();
  }

  async AlertDeleteAll(nrc:number, nTrabajador:number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Deseas eliminar todos los equipo? ',
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
            this.deleteAllEquipos(nrc,nTrabajador);
          }
        }
      ]
    });
    await alert.present();
  }

}
