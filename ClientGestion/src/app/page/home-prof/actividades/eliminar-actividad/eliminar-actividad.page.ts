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

  constructor(private menu:MenuController, private datosService: DatosService, public alertController:AlertController) { }

  ngOnInit() {
    this.getActivity();
  }

  getActivity(){
    this.datosService.getActivity().subscribe(
      res => {
        this.activitys = res;        
      },
      err => console.error(err)
    );
  }
  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }
  deleteActividadEq(id:string, nrc:number, noTrabajador: number, id_equipo:number){
    this.datosService.deleteActividadEq(id, nrc, noTrabajador, id_equipo).subscribe(
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
      message: 'Message <strong>Deseas eliminar </strong>!!! '+ id ,
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
            if(id_equipo!=null){
              this.deleteActividadEq(id, nrc, noTrabajador, id_equipo);
            }else{
              this.deleteActividad(id, nrc, noTrabajador);
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
