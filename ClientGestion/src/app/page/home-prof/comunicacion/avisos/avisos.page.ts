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

  constructor( private datosService: DatosService, private menu:MenuController, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf');
  }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user; 
    this.nrc = params.nrc;   
    this.getAviso();
    this.getEquipos(this.user,this.nrc); 
  }

  navProf(){
    this.router.navigate(['/home-prof/home-prof/menu-prof',this.user,this.nrc]);
    // this.boton = 0;
  }

  getAviso(){
    //console.log(this.boton)
    this.datosService.getAviso().subscribe(
      res => {
        this.avisos = res;  
        //console.log(this.avisos[1]);
        if(this.avisos.length > 0){
          console.log("si hay avisos para mostrar!!!");
          for(let i = 0; i<=this.avisos.length;i++){
            const fecha = String(this.avisos[i].fecha);
            this.avisos[i].fecha = fecha.substr(0,10);
            //console.log(this.avisos[i])
            if(this.avisos[i].id_equipo != null){
              //console.log(this.avisos[i]);
              this.datosService.getid(this.avisos[i].id_equipo).subscribe(
                res => {
                  this.equipos[this.avisos[i].id_equipo] = res; 
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
  
  getEquipos(nrc:number,nTrabajador:number){
    this.datosService.getEquipos1(nrc, nTrabajador).subscribe(
      res => {
        this.equipos = res; 
      },
      err => console.error(err)
    );
  }

  getAvisoEq(id_equipo:number){
    this.datosService.getAvisoEq(id_equipo).subscribe(
      res => {
        this.avisosEq = res;  
        for(let i = 0; i<=this.avisos.length;i++){
          // const fecha = String(this.avisos[i].fecha);
          // this.avisosEq[i].fecha = fecha.substr(0,10);
        }      
      },
      err => console.error(err)
    );
  }

  deleteAvisoEq(id:string, nrc:number, id_equipo:number, noTrabajador: number){
    this.datosService.deleteAvisoEq(id, nrc, id_equipo, noTrabajador).subscribe(
      res => {
        console.log(res);
        window.location.reload();
      },
      err => console.error(err)
    )
  }
  deleteAviso(id:string, nrc:number, noTrabajador: number){
    this.datosService.deleteAviso(id, nrc, noTrabajador).subscribe(
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
      message: 'Message <strong>Deseas eliminar el aviso: </strong>'+ id + '!!!',
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
              this.deleteAvisoEq(id, nrc, id_equipo, noTrabajador);
              this.boton = 0;
              this.boton2 = true;
            }else{
              this.deleteAviso(id, nrc, noTrabajador);
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
