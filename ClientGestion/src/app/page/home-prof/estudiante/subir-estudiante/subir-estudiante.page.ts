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

@Component({
  selector: 'app-subir-estudiante',
  templateUrl: './subir-estudiante.page.html',
  styleUrls: ['./subir-estudiante.page.scss'],
})
export class SubirEstudiantePage implements OnInit {

  user:number;
  nrc:number=0;  
  course:string='hola';

  params = this.activedRoute.snapshot.params;  
  nTrabajador:number=this.params.user;
  getEs:any = [];
  getEsCur:any = [];
  courses:any=[];
  
  subirEst: cursoEstudiante = {
    matricula: 0,
    nrc: this.nrc,
    nTrabajador: this.nTrabajador
  };

  constructor(private datosService: DatosService, private menu:MenuController, private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {    
    const params = this.activedRoute.snapshot.params;  
    console.log(params);

    this.user = params.user;
    this.nrc = params.nrc;
    this.course = params.curso;

    this.nTrabajador = params.user;
    console.log(this.nrc);
    this.getCourse();
    //this.search.valueChanges.subscribe(value => this.searchEmitter.emit(value));
  }
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

  // search = new FormControl('');

  // @Output('search') searchEmitter = new EventEmitter();

  // getNrc(user){

  // }

}
