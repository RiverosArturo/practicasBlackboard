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
    //console.log("Clicka: "+this.nTrabajador+"   "+this.nrc);

    this.getActivity();
    this.getActivityEq();
    this.getEquipos();
    // let h = 0;
    //       do{
    //         for(h<=this.equiposR.length; h++;){
    //           let j = 0;
    //           if(this.equiposR[j].nombre == this.equiposR[h].nombre){
    //             this.equiposR[h].nombre == undefined;
    //             if(h == this.equiposR.length){
    //               j = j+1;
    //               h = 0;
    //             }
    //             //console.log(this.equi)
    //           }
    //         }
    //       }while(h != this.equiposR.length)

    //       this.equiposR = this.equipos.filter(function(x) {
    //         return x !== undefined;
    //       });

    //       console.log("Holi[0]: "+this.equiposR[0].nombre);
    //       console.log("Holi[1]: "+this.equiposR[1].nombre);
    //       console.log("Holi[2]: "+this.equiposR[2].nombre);
    //       console.log("Holi[3]: "+this.equiposR[3].nombre);
    // //console.log(this.equiposR[0].nombre);
  }

  navProf(){
    this.router.navigate(['/home-prof/home-prof/menu-prof',this.nTrabajador,this.nrc]);
  }

  getActivity(){
    console.log(this.boton);
    this.datosService.getActivity(this.nrc, this.nTrabajador).subscribe(
      res => {
        this.activitys = res;  
        for(let i = 0; i<=this.activitys.length;i++){
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
        console.log(this.equipos)
      },
      err => console.error(err)
    );
  }
  getActivityEq(){
    console.log(this.nrc, this.nTrabajador)
    this.datosService.getActivityEq(this.nrc, this.nTrabajador).subscribe(
      res => {
        this.activitysEq = res;  
        console.log(this.activitysEq);
        for(let i = 0; i<=this.activitysEq.length;i++){
          const fecha = String(this.activitysEq[i].fecha);
          this.activitysEq[i].fecha = fecha.substr(0,10);
          const fecha2 = String(this.activitysEq[i].fechaEntrega);
          this.activitysEq[i].fechaEntrega = fecha2.substr(0,10);
          if(this.activitysEq[i].id_equipo != null){
            this.datosService.getid(this.activitysEq[i].id_equipo).subscribe(
              res => {
                this.equipos[this.activitysEq[i].id_equipo] = res; 
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

  deleteActividadEq(id:string, nrc:number, id_equipo:number, noTrabajador: number){
    this.datosService.deleteActividadEq(id, nrc, id_equipo, noTrabajador).subscribe(
      res => {
        console.log(res);
        window.location.reload();
      },
      err => console.error(err)
    )
  }
  deleteActividad(id:string, nrc:number, noTrabajador: number){
    this.datosService.deleteActividad(id, nrc, noTrabajador).subscribe(
      res => {
        console.log(res);
        window.location.reload();
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
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            console.log(id+"   "+id_equipo)
            if(id_equipo!=null){
              this.deleteActividadEq(id, nrc, id_equipo, noTrabajador);
              // this.boton = 0;
              // this.boton2 = true;
              this.datosService.getActivityEq(nrc, noTrabajador).subscribe(
                res => {
                  this.activitysEq = res;  
                },
                err => console.error(err)
              );
            }else{
              this.deleteActividad(id, nrc, noTrabajador);
              // this.boton = 0
              // this.boton2 = true;
              this.datosService.getActivity(this.nrc, this.nTrabajador).subscribe(
                res => {
                  this.activitys = res;  
                  for(let i = 0; i<=this.activitys.length;i++){
                    const fecha = String(this.activitys[i].fecha);
                    this.activitys[i].fecha = fecha.substr(0,10);
                    const fecha2 = String(this.activitys[i].fechaEntrega);
                    this.activitys[i].fechaEntrega = fecha2.substr(0,10);
                    if(this.activitys[i].id_equipo != null){
                      this.datosService.getid(this.activitys[i].id_equipo).subscribe(
                        res => {
                          this.equipos[this.activitys[i].id_equipo] = res; 
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
    this.boton2 = false;
    this.boton = 2;
  }
  condicion2(){
    this.boton2 = false;
    this.boton = 1;
  }

}
