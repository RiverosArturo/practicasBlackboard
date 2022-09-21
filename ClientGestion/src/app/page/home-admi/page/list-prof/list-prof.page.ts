import { Component, HostBinding, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { Prof } from '../../../../models/Prof';

@Component({
  selector: 'app-list-prof',
  templateUrl: './list-prof.page.html',
  styleUrls: ['./list-prof.page.scss'],
})
export class ListProfPage implements OnInit {
  
  @HostBinding('class') classes = 'row';
  profs:any =[];
  boton:number = 0;
  prf: Prof = {
    nTrabajador: 0,
    password: '',
    nombre: '',
    correo: ''
  }
  
  constructor(private datosService: DatosService, public alertController: AlertController ) { }

  ngOnInit() {
    this.getProfs();
  }

  condicion2(){
    this.boton = 0;
  }

  condicion(pro:Prof){
    this.prf.nTrabajador = pro.nTrabajador;
    this.prf.password = pro.password;
    this.prf.nombre = pro.nombre;
    this.prf.correo = pro.correo;
    this.boton=1;
  }
  
  getProfs(){
    this.datosService.getProfs().subscribe(
      res => {
        this.profs = res;     
      },
      err => console.error(err)
    );
  }
  updateProf(nTrabajador:number, pro:Prof){
    this.datosService.updateProf(nTrabajador, pro)
    .subscribe(
      res =>{
        console.log(res);
        this.boton = 0;
        this.getProfs();
      },
      err => console.error(err)
    )
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
  borrar(nrc:number, obj:object){
    this.datosService.eliminarChat(nrc, obj).subscribe(
      res => {
        console.log(res);

        this.datosService.eliminarAvisos(nrc, obj).subscribe(
          res => {
            console.log(res);

            this.datosService.eliminarActividad(nrc, obj).subscribe(
              res => {
                console.log(res);

                this.datosService.eliminarEquipoEs(nrc, obj).subscribe(
                  res => {
                    console.log(res);

                    this.datosService.eliminarEquipo(nrc, obj).subscribe(
                      res => {
                        console.log(res);
                        
                        this.datosService.eliminarEstudianteCu(nrc, obj).subscribe(
                          res => {
                            console.log(res);

                            this.datosService.eliminarProfesorCu(nrc, obj).subscribe(
                              res => {
                                console.log(res);

                                this.datosService.eliminarProfesores(nrc, obj).subscribe(
                                  res => {
                                    console.log(res);
                                    this.getProfs();
                                    
                                  },
                                  err => console.error(err)
                                )
                              },
                              err => console.error(err)
                            )
                            
                          },
                          err => console.error(err)
                        )
                      },
                      err => console.error(err)
                    )
                    
                  },
                  err => console.error(err)
                )
                
              },
              err => console.error(err)
            )
            
          },
          err => console.error(err)
        )
        
      },
      err => console.error(err)
    )

  }

  async AlertOne(nTrabajador: number, profesor:object) {
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
            this.borrar(nTrabajador, profesor);
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
