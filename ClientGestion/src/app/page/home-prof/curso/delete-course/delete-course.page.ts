import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfCourse } from 'src/app/models/ProfCourse';
import { Curso } from 'src/app/models/Curso';


@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.page.html',
  styleUrls: ['./delete-course.page.scss'],
})
export class DeleteCoursePage implements OnInit {

  user:number;
  courses:any=[];
  pCourses:any=[];

  course: Curso = {
    materia:'',
    nrc:0,
  }
  course2: Curso = {
    materia:'',
  }  
  pCourse: ProfCourse = {
    nTrabajador:0,
    nrc:0,     
  };

  constructor( private datosService: DatosService, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {    
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user;  
    console.log('User: ',this.user);

    this.getCourse();
    this.getProfCourse();
  }
  getProfCourse(){
    this.datosService.getProfCourses().subscribe(
      res => {
        this.pCourses = res;
      },
      err => console.error(err)
    );
  }
  getCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.error(err)
    );
  }
  borrar(nrc:number, noTrabajador:number){
    this.datosService.deleteChatCur(nrc, noTrabajador).subscribe(
      res => {
        console.log(res);

        this.datosService.deleteAviCur(nrc, noTrabajador).subscribe(
          res => {
            console.log(res);

            this.datosService.deleteActividadCur(nrc, noTrabajador).subscribe(
              res => {
                console.log(res);

                this.datosService.deleteEquipoEsCur(nrc, noTrabajador).subscribe(
                  res => {
                    console.log(res);

                    this.datosService.deleteAllEquipos(nrc, noTrabajador).subscribe(
                      res => {
                        console.log(res);
                        
                        this.datosService.deleteAllStudCourse(nrc, noTrabajador).subscribe(
                          res => {
                            console.log(res);

                            this.datosService.deleteProfCourse(noTrabajador, nrc).subscribe(
                              res => {
                                console.log(res);
                                this.getCourse();
                                this.getProfCourse();
                                this.AlertDelete(nrc);
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

  async AlertDelete(nrc:number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: 'Message <strong>El Curso </strong> '+ nrc +' se ha eliminado!' ,
      buttons: [
        {
          text: 'ok',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
  async AlertOne(nTrabajador:number, nrc: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>Deseas eliminar </strong>!!! '+ nrc ,
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
            this.borrar(nrc, nTrabajador);
          }
        }
      ]
    });
    await alert.present();
  }
  // async AlertAll() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Confirm!',
  //     message: 'Message <strong>Deseas eliminar</strong>!!! ',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         id: 'cancel-button',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Ok',
  //         id: 'confirm-button',
  //         handler: () => {
  //           console.log('Confirm Okay');
  //           this.deleteAllProfCourse();
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

}
