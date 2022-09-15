import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-eliminar-actividad',
  templateUrl: './eliminar-actividad.page.html',
  styleUrls: ['./eliminar-actividad.page.scss'],
})
export class EliminarActividadPage implements OnInit {

  activitys:any =[];
  activitysEq:any = [];
  equipos:any = [];
  equiposR:any = [];
  boton:number=0;
  boton2:boolean=true;
  nTrabajador:number=0;
  nrc:number=0;

  constructor(private menu:MenuController, private datosService: DatosService, public alertController:AlertController, private activedRoute:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;  
    this.nTrabajador = params.user;
    this.nrc = params.nrc;

    this.getActivity();
    this.getActivityEq();
    this.getEquipos();
  }

  navProf(){
    this.router.navigate(['/home-prof/home-prof/menu-prof',this.nTrabajador,this.nrc]);
    this.boton2 = true;
    this.boton=0;
  }

  getActivity(){
    this.datosService.getActivity(this.nrc, this.nTrabajador).subscribe(
      res => {
        this.activitys = res;  
        for(let i = 0; i<this.activitys.length;i++){
          const fecha = String(this.activitys[i].fecha);
          this.activitys[i].fecha = fecha.substr(0,10);
          const fecha2 = String(this.activitys[i].fechaEntrega);
          this.activitys[i].fechaEntrega = fecha2.substr(0,10);
        }  
      },
      err => console.error(err)
    );
  }
  
  getEquipos(){
    this.datosService.getEquipos1(this.nrc, this.nTrabajador).subscribe(
      res => {
        this.equipos = res; 
      },
      err => console.error(err)
    );
  }
  getActivityEq(){
    this.datosService.getActivityEq(this.nrc, this.nTrabajador).subscribe(
      res => {
        this.activitysEq = res;  
        
        for(let i = 0; i<this.activitysEq.length;i++){
          const fecha = String(this.activitysEq[i].fecha);
          this.activitysEq[i].fecha = fecha.substr(0,10);
          const fecha2 = String(this.activitysEq[i].fechaEntrega);
          this.activitysEq[i].fechaEntrega = fecha2.substr(0,10);
          if(this.activitysEq[i].id_equipo != null){
            this.datosService.getid(this.activitysEq[i].id_equipo).subscribe(
              res => {
                this.equipos[this.activitysEq[i].id_equipo] = res; 
              },
              err => console.error(err)
            );
          }
        }      
      },
      err => console.error(err)
    );
  }

  deleteActividadEq(id:string, nrc:number, id_equipo:number, noTrabajador: number){
    this.datosService.deleteActividadEq(id, nrc, id_equipo, noTrabajador).subscribe(
      res => {
        console.log(res);
        this.getActivityEq();
      },
      err => console.error(err)
    )
  }
  deleteActividad(id:string, nrc:number, noTrabajador: number){
    this.datosService.deleteActividad(id, nrc, noTrabajador).subscribe(
      res => {
        console.log(res);
        this.getActivity();
      },
      err => console.error(err)
    )

  }
  async eliminar(id:string, nrc:number, noTrabajador:number, id_equipo?:number) {
    console.log('Soy la funcion eliminar');
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>Deseas eliminar la actividad: </strong>'+ id + '!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            // console.log('Confirm Okay');
            // console.log(id+"   "+id_equipo)
            if(id_equipo!=null){
              this.deleteActividadEq(id, nrc, id_equipo, noTrabajador);
            }else{
              this.deleteActividad(id, nrc, noTrabajador);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  actualizar(){
    this.boton=0;
    this.boton2=true;
  }
  condicion1(){
    this.getActivity();
    this.boton2 = false;
    this.boton = 2;
  }
  condicion2(){
    this.getActivityEq();
    this.boton2 = false;
    this.boton = 1;
  }

}
