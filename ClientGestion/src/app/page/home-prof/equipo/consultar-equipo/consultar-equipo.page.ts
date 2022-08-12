import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute} from '@angular/router';
import { Student } from 'src/app/models/Student';
import {  } from 'src/app/models/StudentEquipo';

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

  add:boolean = false;
  query:boolean = false;
  equi:boolean = false;
  edit:boolean = false;
  nomb:string;
  

  students:any = [];//Alumnos de la base para nombre del alumno  
  studCourses:any = [];//Alumnos del curso

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
  editEquipo(id:number, nombre:string){
    this.add = false;
    this.query = false;
    this.edit = true;
    this.nomb =nombre;
   // this.get1Equipo(id);
  }
  editEquipoButton(){
    console.log('Nombre del equipo actualizado');
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
  saveStudentEquipo(id:number){
    this.add = false;
    console.log(id);
    this.studentEquipo.id_equipo = id;
    this.studentEquipo.nrc = this.nrc;
    this.studentEquipo.nTrabajador = this.nTrabajador;    

    //console.log('Equipo::> ',this.studentEquipo);
    
    this.datosService.saveStudentEquipo(this.studentEquipo)
    .subscribe(
      res => {
        console.log(res);  
        this.add = false;                     
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
  get1Equipo(id:number){    
    this.datosService.getOneEquipo(id).subscribe(
      res => {
        this.oneEquipos = res;    
        //console.log('Equipo::> ',res);    
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
  deleteStudentsEquipo(id:number, nrc:number, nTrabajador:number){       
    this.datosService.deleteStudentsEquipo(id, nrc, nTrabajador).subscribe(
      res => {
        console.log(res); 
        //this.get1Equipo(id, nrc, nTrabajador);
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
  deleteEquipo(id:number, nombre:string, nrc:number, nTrabajador:number){        
    console.log('dat::> ',id, nombre, nrc, nTrabajador);    
    this.datosService.deleteEquipo(id, nombre, nrc, nTrabajador).subscribe(
      res => {
        console.log(res); 
        //this.getEquipos1(this.nrc, nTrabajador);       
      },
      err => console.error(err)
    )
  }
  deleteAllEquipos(nrc:number, nTrabajador:number){
    this.datosService.deleteAllEquipos(nrc, nTrabajador).subscribe(
      res => {
        console.log(res);    
        this.getEquipos1(this.nrc, nTrabajador);    
      },
      err => console.error(err)
    )
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
            //this.deleteStudentsEquipo(id, this.nrc, nTrabajador);            
            this.deleteEquipo(id, nombre, curso_nrc, nTrabajador);  
            this.getEquipos1(this.nrc, this.nTrabajador);
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
