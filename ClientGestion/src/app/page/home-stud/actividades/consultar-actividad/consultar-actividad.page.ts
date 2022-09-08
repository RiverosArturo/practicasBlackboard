import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-consultar-actividad',
  templateUrl: './consultar-actividad.page.html',
  styleUrls: ['./consultar-actividad.page.scss'],
})
export class ConsultarActividadPage implements OnInit {

  user:number;
  nrc:number;
  nTrabajador:number;
  id_equipo:number;
  actividades: any = [];
  actividadesE: any = [];
  equipos: any = [];
  previsualizacion:string;
  loading:boolean;

  constructor( private sanitizer: DomSanitizer ,private menu:MenuController, private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;     
    this.user = params.user;  
    this.nrc = params.nrc;
    this.nTrabajador = params.nTrabajador;
    this.id_equipo = params.id_equipo;
    this.obtenerActividades();
    this.obtenerActividadesE();


  }

  obtenerActividades(){
    this.datosService.getActivityEs(this.nrc, this.nTrabajador, this.user).subscribe(
      res => {
          this.actividades = res;     
          for(let i = 0; i<=this.actividades.length;i++){
            const fecha = String(this.actividades[i].fecha);
            this.actividades[i].fecha = fecha.substr(0,10);
            const fecha2 = String(this.actividades[i].fechaEntrega);
            this.actividades[i].fechaEntrega = fecha2.substr(0,10);
          }
      },
      err => console.error(err)
    );
  }

  obtenerActividadesE(){
    this.datosService.getActivityEqEs(this.nrc, this.nTrabajador, this.user, this.id_equipo).subscribe(
      res => {
          this.actividadesE = res;  
          for(let i = 0; i<=this.actividadesE.length;i++){
            const fecha = String(this.actividadesE[i].fecha);
            this.actividadesE[i].fecha = fecha.substr(0,10);
            const fecha2 = String(this.actividadesE[i].fechaEntrega);
            this.actividadesE[i].fechaEntrega = fecha2.substr(0,10);
            if(this.actividadesE[i].id_equipo != null){
              this.datosService.getid(this.actividadesE[i].id_equipo).subscribe(
                res => {
                  this.equipos[this.actividadesE[i].id_equipo] = res; 
                  //console.log(this.equipos[this.activitys[i].id_equipo].nombre);
                  // this.equiposR = this.equipos.filter(function(x) {
                  //   return x !== undefined;
                  // });
                },
                err => console.error(err)
              );
            }
          }
      },
      err => console.error(err)
    );
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
