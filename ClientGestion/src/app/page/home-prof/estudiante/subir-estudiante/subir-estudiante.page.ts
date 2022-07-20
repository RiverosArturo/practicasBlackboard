import { Component, OnInit, Output } from '@angular/core';
import { MenuController, NavParams } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EventEmitter } from 'stream';
import { cursoEstudiante } from '../../../../models/cursoEstudiante';
import { User } from '../../../../models/User';
import { FormsModule } from '@angular/forms';
import { DatosService } from 'src/app/services/datos.service';
import { ConsultarEquipoPageModule } from '../../equipo/consultar-equipo/consultar-equipo.module';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-subir-estudiante',
  templateUrl: './subir-estudiante.page.html',
  styleUrls: ['./subir-estudiante.page.scss'],
})
export class SubirEstudiantePage implements OnInit {

  user:number;
  course:string='hola';

  params = this.activedRoute.snapshot.params;  
  nTrabajador:number=this.params.user;
  nrc:number=this.params.nrc;  
  getEs:any = [];
  getEsCur:any = [];

  courses:any=[];
  students:any=[];
  profStudent:any=[];
  estudiantes:any = [];
  
  subirEst: cursoEstudiante = {
    matricula: 0,
    nrc: this.nrc,
    nTrabajador: this.nTrabajador
  };

  constructor(public alertController:AlertController,private datosService: DatosService, private menu:MenuController, private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {    
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user;
    this.nrc = params.nrc;
    this.course = params.curso;
    this.nTrabajador = params.user;    
    this.getCourse();
    this.getStudent();    
  }
  getMAT(user, matricula, nrc){
    this.nTrabajador = user;
    console.log('user:', this.nTrabajador,'alumno:',matricula,'nrc', nrc);  

    this.datosService.getOneCursoEst(nrc, this.nTrabajador, matricula).subscribe(
      res => {
        this.profStudent = res;        
        if(matricula == 0){
          console.log('Selecciona un alumno');
          this.Alert3();
        }else{
          if(this.profStudent.nTrabajador == user && this.profStudent.matricula == matricula && this.profStudent.nrc == nrc){            
            console.log('El Alumno ya existe en este curso');
            this.Alert2(matricula);
          }else{
            this.subirEst.nrc = nrc;            
            console.log('Subiendo alumno al curso. ');
            this.AlertSave(matricula);
          }
        }        
      },
      err => console.error(err)
    );
  }
  getStudent(){
    this.datosService.getStudents().subscribe(
      res => {
        this.students = res;     
      },
      err => console.error(err)
    );
  } 
  async Alert3() {// Aplica cuando no he seleccionado un alumno
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: 'Message <strong> Selecciona un Alumno </strong> ',
      buttons: [
        {
          text: 'ok',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
  async Alert2(matricula: number) {//Aplica cuando el alumno ya esta registrado
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: 'Message <strong>El alumo </strong> '+ matricula +' ya existe en el curso!' ,
      buttons: [
        {
          text: 'ok',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
    async Alert(matricula: number) {// Aplica cuando el alumno ya ha sido registrado
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirmado!',
        message: 'Message <strong> Alumno </strong> '+ matricula +' registrado en el curso' ,
        buttons: [
          {
            text: 'ok',
            id: 'confirm-button',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present();
    }
    async AlertSave(matricula: number) {// aplica para guardar las parametros alumno
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirma!',
        message: 'Message <strong> Guardar alumno </strong> '+ matricula ,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Guardar',
            id: 'confirm-button',
            handler: () => {
              console.log('Confirma Okay');                                              
              console.log(this.subirEst);
              this.saveProfStud();
              this.Alert(matricula);
            }
          }
        ]
      });
      await alert.present();
    }
    saveProfStud(){
      this.datosService.crearCursoEst(this.subirEst)
      .subscribe(
        res => {
          console.log(res);    
          console.log('Alumno Registrado ');        
        },
        err => console.error(err)
      )
    }
//--------------------------------------------------------------------------------------------   
  getCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.error(err)
    );
  }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  onSubmit(){
    if(!isNaN(this.subirEst.matricula) && this.subirEst.matricula.toString().length==9){

      console.log("Paso 1ra condicion");
      this.datosService.getStudent(this.subirEst.matricula).subscribe(
        res => {
          this.getEs = res;
          //Verificamos que el estudiante exista en la BD
      if(this.getEs.matricula != undefined){
        console.log("Paso segunda condicion")
        // console.log(this.getEs.matricula);
        this.datosService.getOneCursoEst(this.subirEst.nrc, this.subirEst.nTrabajador, this.subirEst.matricula).subscribe(
          res => {
            this.getEsCur = res;
            //Verificamos que el estudiante no este subido a la lista del curso
        if(this.getEsCur.matricula == 0 ){
          alert("Estudiante subido con exito!!!");
          this.datosService.crearCursoEst(this.subirEst)
            .subscribe(
              res => {
                console.log(res);
              },
              err => console.error(err)
            )
        
      }else{
        alert("El estudiante ya se encuentra en este curso!!!");
      }
          }
        );
    }else{
      alert("El estudiante no se encuentra en la base de datos!!!");
    }
        }
      );
    }else{
      alert("La matricula debe ser un numero entero de 9 caracteres!!!");
      console.log(this.subirEst);
      console.log("cifra: " + this.subirEst.matricula.toString().length);
    }
  }

  funcEstud(){
    this.datosService.getStudents()
            .subscribe(
              res => {
                this.estudiantes = res;
              },
              err => console.error(err)
    );
  }

  // search = new FormControl('');

  // @Output('search') searchEmitter = new EventEmitter();

  // getNrc(user){

  // }

}
