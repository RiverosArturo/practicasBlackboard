import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { Student } from 'src/app/models/Student';
import { Curso } from 'src/app/models/Curso';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user:string;
  matricula:number;
  nrc:number;
  nTrabajador:number;
  curso:string;
  
  perfil:boolean = false;
  EditPerfil:boolean = false;
  EditPassword:boolean = false;

  student: Student = {
    password: '',
  };
  students:any = [];

  course: Curso = {
    materia:'IA',
    nrc:0,    
  }

  password:string ;
  password2:string;

  constructor(public alertController:AlertController, private menu:MenuController, private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;     
    this.user = params.user;  
    this.nrc = params.nrc;
    this.user = params.user;
    this.nrc = params.nrc;
    this.nTrabajador = params.nTrabajador;
    this.matricula = params.user;
    this.getAlumno(this.matricula);
    this.perfil = true;
    this.getCurso();
  }
  //-------------------------------- Funciones -----------------------------------
  getCurso(){
    this.datosService.getCourse(this.nrc)
      .subscribe(
        res =>{       
          this.course = res;    
          this.curso = this.course.materia;               
        },
        err => console.error(err)
      )
  }
  getAlumno(matricula:number){
    this.datosService.getStudent(matricula)
      .subscribe(
        res =>{          
          this.student = res;        
        },
        err => console.error(err)
      )
  }
  updateStudent(){
    this.datosService.updateStudent(this.student.matricula, this.student)
    .subscribe(
      res =>{
        console.log(res);
        this.getStudent();        
      },
      err => console.error(err)
    )
  }
  getStudent(){
    this.datosService.getStudents().subscribe(
      res => {
        this.students = res;     
      },
      err => console.error(err)
    );
  }

  editPerfil(){
    this.EditPerfil = true;    
    this.EditPassword = false;
    this.perfil = false;
  }
  editPassword(){
    this.EditPassword = true;
    this.EditPerfil = false;
    this.perfil = false;
  }
  close(){
    this.EditPerfil = false;
    this.EditPassword = false;
  }
  //------ funciones Alert------------------------
  async AlertPassword() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: ' Mensaje ',
      message: 'Parametros vacios ó Nueva contraseña y Confirmar contraseña deben ser iguales ',      
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
  async AlertPassword2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: ' Mensaje ',
      message: 'Nueva contraseña actualizada',      
      buttons: [
        {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');    
            //this.updateStudent();        
          }
        }
      ]
    });
    await alert.present();
  }
  //---------------------------------------------------------------------------------
  OpenMenuStud(){
    this.menu.enable(true,'MenuStud');
    this.menu.open('MenuStud');
  }
  openmenu0(){
    this.menu.enable(true,'end');
    this.menu.open('end')
  }

}
