import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.page.html',
  styleUrls: ['./avisos.page.scss'],
})
export class AvisosPage implements OnInit {

  alerta:string;
  boton:number=0;
  boton2:boolean=true;
  avisos:any=[];
  equipos:any = [];
  avisosEq:any = [];
  user:number;
  nrc:number;
  curso:string;
  nTrabajador:number;
  id_equipo:number;

  constructor( private datosService: DatosService, private menu:MenuController, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user; 
    this.nrc = params.nrc; 
    this.nTrabajador = params.nTrabajador;  
    this.curso = params.curso;
    this.id_equipo = params.id_equipo;
    this.getAviso();
    this.getAvisoEq();
    this.getEquipos(this.user,this.nrc); 
  }

  navStud(){
    this.router.navigate(['/home-stud/menu-student/menu-student',this.user,this.nrc, this.curso, this.nTrabajador]);
    // this.boton = 0;
  }

  getAviso(){
    //console.log(this.boton)
    this.datosService.getAviso(this.nrc, this.nTrabajador).subscribe(
      res => {
        this.avisos = res;  
        //console.log(this.avisos[1]);
        if(this.avisos.length > 0){
          console.log("si hay avisos para mostrar!!!");
          for(let i = 0; i<=this.avisos.length;i++){
            const fecha = String(this.avisos[i].fecha);
            this.avisos[i].fecha = fecha.substr(0,10);
            //console.log(this.avisos[i])
          }
        }else{
          //console.log("No hay avisos para mostrar");
          this.alerta = "No hay avisos para mostrar...";
        }
      },
      err => console.error(err)
    );
  }
  
  getEquipos(nrc:number,nTrabajador:number){
    this.datosService.getEquipos1(nrc, nTrabajador).subscribe(
      res => {
        this.equipos = res; 
      },
      err => console.error(err)
    );
  }

  getAvisoEq(){
    this.datosService.getAvisoEqAl(this.nrc, this.nTrabajador, this.id_equipo).subscribe(
      res => {
        this.avisosEq = res;  
        //console.log(this.id_equipo);
        if(this.avisosEq.length > 0){
          console.log("si hay avisos para mostrar!!!");
          //console.log(this.avisosEq);
          for(let i = 0; i<=this.avisosEq.length;i++){
            const fecha = String(this.avisosEq[i].fecha);
            this.avisosEq[i].fecha = fecha.substr(0,10);
            //console.log(this.avisos[i])
            if(this.avisosEq[i].id_equipo != null){
              //console.log(this.avisos[i]);
              this.datosService.getid(this.avisosEq[i].id_equipo).subscribe(
                res => {
                  this.equipos[this.avisosEq[i].id_equipo] = res; 
                },
                err => console.error(err)
              );
            }else{
              console.log("Es aviso para curso");
            }
          }
        }else{
          //console.log("No hay avisos para mostrar");
          this.alerta = "No hay avisos para mostrar...";
        }      
      },
      err => console.error(err)
    );
  }

  actualizar(){
    this.boton=0;
    this.boton2=true;
  }
  condicion1(){
    this.boton2 = false;
    this.boton = 2;
  }
  condicion2(){
    this.boton2 = false;
    this.boton = 1;
  }

  OpenMenuStud(){
    this.menu.enable(true,'MenuStud');
    this.menu.open('MenuStud');
  }
  openmenu0(){
    this.menu.enable(true,'end');
    this.menu.open('end')
  }

}
