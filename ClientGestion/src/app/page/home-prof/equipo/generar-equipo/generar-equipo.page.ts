import { Component,HostBinding, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Equipo } from '../../../../models/Equipo';
import { DatosService } from '../../../../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-generar-equipo',
  templateUrl: './generar-equipo.page.html',
  styleUrls: ['./generar-equipo.page.scss'],
})
export class GenerarEquipoPage implements OnInit {

  nrc:number = 15437;
  equipo:Equipo = {
    id: 0,
    nombre:'',
    curso_nrc: this.nrc
  }

  equipo1:Equipo = {
    id: 0,
    nombre:'',
    curso_nrc: 0
  }
  equipos:any = [];

  getEquipoId:any = [];
  getEquipoN:any = [];
  

  constructor(private menu:MenuController, private datosService:DatosService, private router:Router, private activated:ActivatedRoute) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
    
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

  obtenEquipos(){
    this.datosService.getEquipos().subscribe(
        res => {
          this.equipos = res;
        },
        err => console.error(err)
    );
  }
}
