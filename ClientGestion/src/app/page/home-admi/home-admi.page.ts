import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';


import * as XLSX from 'xlsx';
import { Student } from '../../models/Student';
import { Prof } from '../../models/Prof';
import { Curso } from '../../models/Curso';
import { Response } from 'express';



@Component({
  selector: 'app-home-admi',
  templateUrl: './home-admi.page.html',
  styleUrls: ['./home-admi.page.scss'],
})
export class HomeAdmiPage implements OnInit {
  //Variables para insertar excel
  estudiante: Student = {
    matricula: 0, 
    password: '',
    nombre: '',
    correo: ''
  };
  profesor: Prof = {
    nTrabajador: 0, 
    password: '',
    nombre: '',
    correo: ''
  };
  curso: Curso = {
    materia: '',
    nrc: 0,
    clave: '',
    seccion: '',
    horario: ''
  };
  convertedJson!:string;
  objetoJson!:object;
  data!:any;

  //Variables para validacion:
  cursoV:any = [];
  estudianteV:any = [];
  profesorV:any = [];
  verificacion:number=0;
  boton:boolean=false;
  courses:any = {};

  constructor(private datosService: DatosService) { }

  ngOnInit() {
    this.getCourse();
  }

  getCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.error(err)
    );
  }

  fileUpload(event:any) {
    this.boton = false;
    console.log('Soy fileUpload');
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
        console.log(event);
        let binaryData = event.target.result;
        let workbook = XLSX.read(binaryData, {type:'binary'});
        workbook.SheetNames.forEach(sheet => {
          this.data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          this.convertedJson = JSON.stringify(this.data, undefined, 4);
          this.objetoJson = JSON.parse(this.convertedJson);
          console.log(this.objetoJson);
        })
    }
  }

  Estudiante(){
    console.log(this.objetoJson[0].Matricula);
      if(this.objetoJson[0].Matricula != undefined){
        for( let i = 0; i < this.data.length; i++ ){
          console.log("Matricula: " + this.objetoJson[i].Matricula + ", Contrasena: " +  this.objetoJson[i].Contraseña + ", Nombre: " +  this.objetoJson[i].Nombre + ", Correo: " +  this.objetoJson[i].Correo);
          ////////////////////////////////////////////////////////////////////////////////////////////
          this.estudiante.matricula = this.objetoJson[i].Matricula;
          this.estudiante.password = this.objetoJson[i].Contraseña;
          this.estudiante.nombre = this.objetoJson[i].Nombre;
          this.estudiante.correo = this.objetoJson[i].Correo;
          console.log(this.estudiante);

          this.datosService.saveEst(this.estudiante)
            .subscribe(
              res => {
                console.log(res);
              },
              err => console.error(err)
            )
        ///////////////////////////////////////////////////////////////////////////////
          if(i == this.data.length-1){
            window.alert('Insercion de estudiantes finalizada con exito!!!');
            this.boton = false;
          }
        }
      }else if(this.objetoJson[0].nTrabajador != undefined){
        window.alert('Por favor elija un archivo de ESTUDIANTES y no de profesores!!!');
      }else if(this.objetoJson[0].Materia != undefined){
        window.alert('Por favor elija un archivo de ESTUDIANTES y no de cursos!!!');
      }
  }

  Profesor(){
    console.log(this.objetoJson[0].nTrabajador);

    if(this.objetoJson[0].nTrabajador != undefined){
      for( let i = 0; i < this.data.length; i++ ){
        console.log("Numero de trabajador: " + this.objetoJson[i].nTrabajador + ", Contrasena: " +  this.objetoJson[i].Contraseña);
        
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        this.profesor.nTrabajador = this.objetoJson[i].nTrabajador;
        this.profesor.password = this.objetoJson[i].Contraseña;
        this.profesor.nombre = this.objetoJson[i].Nombre;
        this.profesor.correo = this.objetoJson[i].Correo;
        console.log(this.profesor);

        this.datosService.saveProf(this.profesor)
          .subscribe(
            res => {
              console.log(res);
            },
            err => console.error(err)
          )
        

        ///////////////////////////////////////////////////////////////////////////////
        if(i == this.data.length-1){
          window.alert('Insercion de profesores finalizada con exito!!!');
          this.boton = false;
        }
      }
    }else if(this.objetoJson[0].Matricula != undefined){
      window.alert('Por favor elija un archivo de PROFESORES y no de estudiantes!!!');
    }else if(this.objetoJson[0].Materia != undefined){
      window.alert('Por favor elija un archivo de PROFESORES y no de cursos!!!');
    }
  }
  
  Curso(){
    console.log(this.objetoJson[0].Materia);

    if(this.objetoJson[0].Materia != undefined){
      for( let i = 0; i < this.data.length; i++ ){
        console.log("Materia: " + this.objetoJson[i].Materia + ", Nrc: " +  this.objetoJson[i].Nrc + ", Clave: " +  this.objetoJson[i].Clave + ", Sección: " +  this.objetoJson[i]["Sección"] + ", Horario: " +  this.objetoJson[i].Horario);
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        this.curso.materia = this.objetoJson[i].Materia;
        this.curso.nrc = this.objetoJson[i].Nrc;
        this.curso.clave = this.objetoJson[i].Clave;
        this.curso.seccion = this.objetoJson[i]["Sección"];
        this.curso.horario = this.objetoJson[i].Horario;

        console.log(this.curso);

        this.datosService.saveCurso(this.curso)
          .subscribe(
            res => {
              console.log(res);
            },
            err => console.error(err)
          )
        

        ///////////////////////////////////////////////////////////////////////////////
        
        
        if(i == this.data.length-1){
          window.alert('Insercion de cursos finalizada con exito!!!');
          this.boton = false;
        }
      }
    }else if(this.objetoJson[0].Matricula != undefined){
      window.alert('Por favor elija un archivo de CURSOS y no de estudiantes!!!');
    }else if(this.objetoJson[0].nTrabajador != undefined){
      window.alert('Por favor elija un archivo de CURSOS y no de profesores!!!');
    }
  }

  validacion(){
    if(this.objetoJson[0].Materia != undefined){
      for( let i = 0; i < this.data.length; i++ ){
        
        this.datosService.verifica(this.objetoJson[i].Nrc).subscribe(
          res => {
            this.cursoV = res;
            
            if( this.cursoV.nrc === this.objetoJson[i].Nrc){
              this.verificacion = this.verificacion + 1;
              if( i == this.data.length-1 ){
                if(this.verificacion > 0){
                  if(this.verificacion == 1){
                    window.alert("Tienes " + this.verificacion + " curso que ya esta en la BD, eliminalo o modificalo!!!");
                    this.verificacion = 0;
                    this.boton = false;
                  }else{
                    window.alert("Tienes " + this.verificacion + " cursos que ya estan en la BD, eliminalos o modificalos!!!");
                    this.verificacion = 0;
                    this.boton = false;
                  }
                }else{
                  window.alert("Tu archivo esta correcto!!!");
                  this.boton = true;
                }
              }
            }else if(this.cursoV.nrc == undefined){
              if( i == this.data.length-1 ){
                if(this.verificacion > 0){
                  if(this.verificacion == 1){
                    window.alert("Tienes " + this.verificacion + " curso que ya esta en la BD, eliminalo o modificalo!!!");
                    this.verificacion = 0;
                    this.boton = false;
                  }else{
                    window.alert("Tienes " + this.verificacion + " cursos que ya estan en la BD, eliminalos o modificalos!!!");
                    this.verificacion = 0;
                    this.boton = false;
                  }
                }else{
                  window.alert("Tu archivo esta correcto!!!");
                  this.boton = true;
                }
              }
            }
          },
          err => console.error(err)
        );
      }
    }else if(this.objetoJson[0].Matricula != undefined){
      for( let i = 0; i < this.data.length; i++ ){
        
        this.datosService.getStudent(this.objetoJson[i].Matricula).subscribe(
          res => {
            this.estudianteV = res;
            
            if( this.estudianteV.matricula === this.objetoJson[i].Matricula){
              this.verificacion = this.verificacion + 1;
              if( i == this.data.length-1 ){
                if(this.verificacion > 0){
                  if(this.verificacion == 1){
                    window.alert("Tienes " + this.verificacion + " estudiante que ya esta en la BD, eliminalo o modificalo!!!");
                    this.verificacion = 0;
                    this.boton = false;
                  }else{
                    window.alert("Tienes " + this.verificacion + " estudiantes que ya estan en la BD, eliminalos o modificalos!!!");
                    this.verificacion = 0;
                    this.boton = false;
                  }
                }else{
                  window.alert("Tu archivo esta correcto!!!");
                  this.boton = true;
                }
              }
            }else if(this.estudianteV.matricula == undefined){
              if( i == this.data.length-1 ){
                if(this.verificacion > 0){
                  if(this.verificacion == 1){
                    window.alert("Tienes " + this.verificacion + " estudiante que ya esta en la BD, eliminalo o modificalo!!!");
                    this.verificacion = 0;
                    this.boton = false;
                  }else{
                    window.alert("Tienes " + this.verificacion + " estudiantes que ya estan en la BD, eliminalos o modificalos!!!");
                    this.verificacion = 0;
                    this.boton = false;
                  }
                }else{
                  window.alert("Tu archivo esta correcto!!!");
                  this.boton = true;
                }
              }
            }
          },
          err => console.error(err)
        );
      }
    }else if(this.objetoJson[0].nTrabajador != undefined){
      for( let i = 0; i < this.data.length; i++ ){
        
        this.datosService.getProf(this.objetoJson[i].nTrabajador).subscribe(
          res => {
            this.profesorV = res;
            
            if( this.profesorV.nTrabajador == this.objetoJson[i].nTrabajador){
              this.verificacion = this.verificacion + 1;
              if( i == this.data.length-1 ){
                if(this.verificacion > 0){
                  if(this.verificacion == 1){
                    window.alert("Tienes " + this.verificacion + " profesor que ya esta en la BD, eliminalo o modificalo!!!");
                    this.verificacion = 0;
                    this.boton = false;
                  }else{
                    window.alert("Tienes " + this.verificacion + " profesores que ya estan en la BD, eliminalos o modificalos!!!");
                    this.verificacion = 0;
                    this.boton = false;
                  }
                }else{
                  window.alert("Tu archivo esta correcto!!!");
                  this.boton = true;
                }
              }
            }else if(this.profesorV.nTrabajador == undefined){
              if( i == this.data.length-1 ){
                if(this.verificacion > 0){
                  if(this.verificacion == 1){
                    window.alert("Tienes " + this.verificacion + " profesor que ya esta en la BD, eliminalo o modificalo!!!");
                    this.verificacion = 0;
                    this.boton = false;
                  }else{
                    window.alert("Tienes " + this.verificacion + " profesores que ya estan en la BD, eliminalos o modificalos!!!");
                    this.verificacion = 0;
                    this.boton = false;
                  }
                }else{
                  window.alert("Tu archivo esta correcto!!!");
                  this.boton = true;
                }
              }
            }
          },
          err => console.error(err)
        );
      }
  }else{
          window.alert("Tu archivo esta mal estructurado!!!");
          this.boton = false;
        }}

}