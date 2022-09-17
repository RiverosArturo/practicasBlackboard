import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { Student } from 'src/app/models/Student';
import { Prof } from 'src/app/models/Prof';
import { Curso } from 'src/app/models/Curso';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user:number;
  matricula:number;
  nrc:number;
  nTrabajador:number;
  curso:string;
  id:number;
  
  perfil:boolean = false;
  EditPerfil:boolean = false;
  EditPassword:boolean = false;

  prof: Prof = {
    password: '',
  };
  profs:any = [];

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
    this.nTrabajador = params.user;
    this.nrc = params.nrc;
    this.curso = params.curso;          
     
    console.log(this.user);
    this.perfil = true;
    this.getProfe();    
    this.getCurso();
  }
  //-------------------------------- Funciones -----------------------------------
  
  getProfe(){
    this.datosService.getProf(this.nTrabajador)
      .subscribe(
        res =>{          
          this.prof = res;   
          console.log(this.prof);           
        },
        err => console.error(err)
      )
  }
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
//-------------------------------------------------------------------------------  

updateProf(){  
  this.prof.password = this.password; 
  console.log(this.prof.nTrabajador, this.prof.nombre, this.prof.correo, this.prof.password);            

  this.datosService.updateProf(this.prof.nTrabajador, this.prof)
    .subscribe(
      res =>{
        console.log(res);
        this.getProfe();        
      },
      err => console.error(err)
    )
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
  async AlertPassword2(password:string) {
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
            this.updateProf();        
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
