import { Component, HostBinding, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-prof',
  templateUrl: './list-prof.page.html',
  styleUrls: ['./list-prof.page.scss'],
})
export class ListProfPage implements OnInit {
  
  @HostBinding('class') classes = 'row';
  profs:any =[];
  
  constructor(private datosService: DatosService, public alertController: AlertController ) { }

  ngOnInit() {
    this.getProfs();
  }
  
  getProfs(){
    this.datosService.getProfs().subscribe(
      res => {
        this.profs = res;     
      },
      err => console.error(err)
    );
  }
  deleteProf(nTrabajador: number){
    this.datosService.deleteProf(nTrabajador).subscribe(
      res => {
        console.log(res);
        this.getProfs();
      },
      err => console.error(err)
    )
  }
  deleteAllProfs(){
    this.datosService.deleteAllProfs().subscribe(
      res => {  
        console.log(res);
        this.getProfs();
      },
      err => console.error(err)
    )
  }
  async AlertOne(nTrabajador: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>Deseas eliminar </strong>!!! ' + nTrabajador,
      buttons: [
        {
          text: 'Cancelar',
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
            this.deleteProf(nTrabajador);
          }
        }
      ]
    });

    await alert.present();
  }
  async AlertAll() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>Deseas eliminar</strong>!!! ',
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
            this.deleteAllProfs();
          }
        }
      ]
    });
    await alert.present();
  }

}
