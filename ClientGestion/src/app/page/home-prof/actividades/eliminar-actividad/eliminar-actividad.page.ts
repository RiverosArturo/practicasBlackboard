import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-eliminar-actividad',
  templateUrl: './eliminar-actividad.page.html',
  styleUrls: ['./eliminar-actividad.page.scss'],
})
export class EliminarActividadPage implements OnInit {

  activitys:any =[];
  boton:number=0;
  boton2:boolean=true;

  constructor(private menu:MenuController, private datosService: DatosService, public alertController:AlertController) { }

  ngOnInit() {
    this.getActivity();
  }

  getActivity(){
    this.datosService.getActivity().subscribe(
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
  // OpenMenuProf(){
  //   this.menu.enable(true,'MenuProf');
  //   this.menu.open('MenuProf')
  // }
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
              this.boton = 0;
              this.boton2 = true;
            }else{
              this.deleteActividad(id, nrc, noTrabajador);
              this.boton = 0
              this.boton2 = true;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  actualizar(){
    this.boton=0;
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
