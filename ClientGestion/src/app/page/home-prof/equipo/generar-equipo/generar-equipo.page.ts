
import { Equipo } from '../../../../models/Equipo';
import { FormsModule } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { ProfCourse } from 'src/app/models/ProfCourse';
import { Curso } from 'src/app/models/Curso';
import { Prof } from 'src/app/models/Prof';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/User';
import { Student } from 'src/app/models/Student';



@Component({
  selector: 'app-generar-equipo',
  templateUrl: './generar-equipo.page.html',
  styleUrls: ['./generar-equipo.page.scss'],
})
export class GenerarEquipoPage implements OnInit {

  user:number= 2013;
  nrc:number = 0;
  cursoA:string = '';
  nTrabajador:number= 0;

  equipo:Equipo = {
    id: 0,
    nombre:'',
    curso_nrc: this.nrc
  }

  getEquipoId:any = [];
  getEquipoN:any = [];  

  constructor(private menu:MenuController, private datosService:DatosService, private router:Router, private activedRoute:ActivatedRoute) { }

  OpenMenuProf(){  
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;  
    console.log(params);

    this.user = params.user;   
    this.nTrabajador = params.user; 
    this.nrc = params.nrc;  
    this.cursoA = params.curso;
    
  }

  onSubmit(){
    if(!isNaN(this.equipo.id) && this.equipo.id.toString().length==9){
      this.equipo.nombre=this.equipo.nombre.split(" ").join("");
      console.log(this.equipo);
      this.datosService.getOneEquipo(this.equipo.id).subscribe(
        res => {
          this.getEquipoId = res;
          console.log(this.getEquipoId);
          if(this.getEquipoId.id == 0 ){
            console.log(this.equipo.nombre);
            this.datosService.getOneEquipoN(this.equipo.id, this.equipo.nombre.split(" ").join("")).subscribe(
              res => {
                this.getEquipoN = res;
                console.log(this.getEquipoN);
                if(this.getEquipoN.nombre == ''){
                  alert("Equipo generado con exito!!!");
                  this.datosService.saveEquipo(this.equipo)
                    .subscribe(
                      res => {
                        console.log(res);
                      },
                      err => console.error(err)
                  );
                }else{
                  alert("El nombre de equipo ya existe!!!")
                }
            });
          }else{
            alert("El id del equipo ya existe!!!")
          }
      });
    }else{
      alert("El id del equipo tiene que ser un número de 9 digitos!!!");
    }
  }
}
