import { Component, HostBinding, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.page.html',
  styleUrls: ['./list-students.page.scss'],
})
export class ListStudentsPage implements OnInit {
  
  @HostBinding('class') classes = 'row';
  user:string='Administrador';
  students:any =[];
  
  constructor(private datosService: DatosService, public alertController: AlertController ) { }

  ngOnInit() {
    this.getStudent();
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
  async AlertOne(matricula: number) {
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
            this.deleteStudent(matricula);
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
