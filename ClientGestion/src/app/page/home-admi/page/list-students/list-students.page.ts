import { Component, HostBinding, OnInit } from '@angular/core';
import { DatosService } from '../../../../services/datos.service';
import { AlertController } from '@ionic/angular';
import { Student } from '../../../../models/Student';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.page.html',
  styleUrls: ['./list-students.page.scss'],
})
export class ListStudentsPage implements OnInit {
  
  @HostBinding('class') classes = 'row';
  user:string='Administrador';
  students:any =[];
  boton:number = 0;
  est:Student = {
    matricula: 0,
    password: '',
    nombre: '',
    correo: ''
  }
  
  constructor(private datosService: DatosService, public alertController: AlertController,private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    this.getStudent();
  }
  condicion(stud:Student){
    this.est.matricula = stud.matricula;
    this.est.password = stud.password;
    this.est.nombre = stud.nombre;
    this.est.correo = stud.correo;
    this.boton=1;
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
  updateStudent(matricula:number, stude:Student){
    this.datosService.updateStudent(matricula, stude)
    .subscribe(
      res =>{
        console.log(res);
        window.alert("Actualizado con exito!!!");
        this.boton = 0;
        this.getStudent();

      },
      err => console.error(err)
    )
  }

}
