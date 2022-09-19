import { Component, HostBinding, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { Student } from '../../../../models/Student';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.page.html',
  styleUrls: ['./list-students.page.scss'],
})
export class ListStudentsPage implements OnInit {
  
  @HostBinding('class') classes = 'row';
  user:string='Administrador';
  students:any =[];

  // estudiante:Student = {
  //   matricula: 201888937,
  // }
  
  constructor(private datosService: DatosService, public alertController: AlertController ) { }

  ngOnInit() {
    this.getStudent();
    // this.datosService.eliminarActividad(201888937, this.estudiante).subscribe(
    //   res => {
    //     console.log(res);
    //   },
    //   err => console.error(err)
    // )
    //this.borrar(201888937, this.estudiante);
  }
  getStudent(){
    this.datosService.getStudents().subscribe(
      res => {
        this.students = res;     
      },
      err => console.error(err)
    );
  }
  deleteStudent(matricula: number){
    this.datosService.deleteStudent(matricula).subscribe(
      res => {
        console.log(res);
        this.getStudent();
      },
      err => console.error(err)
    )
  }
  deleteAllStudents(){
    this.datosService.deleteAllStudents().subscribe(
      res => {  
        console.log(res);
        this.getStudent();
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
                    this.datosService.eliminarEstudianteCu(nrc, obj).subscribe(
                      res => {
                        console.log(res);
                            this.datosService.eliminarEstudiante(nrc, obj).subscribe(
                              res => {
                                console.log(res);
                                this.getStudent();
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
  async AlertOne(matricula: number, estudiante:object) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>Deseas eliminar </strong>!!! ' + matricula,
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
            this.borrar(matricula, estudiante);
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
            this.deleteAllStudents();
          }
        }
      ]
    });
    await alert.present();
  }

}
