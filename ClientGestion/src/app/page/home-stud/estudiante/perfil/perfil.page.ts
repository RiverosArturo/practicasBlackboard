import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';
import { Student } from 'src/app/models/Student';




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


  constructor( private menu:MenuController, private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute ) { }

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
  }
  //-------------------------------- Funciones -----------------------------------
  
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
