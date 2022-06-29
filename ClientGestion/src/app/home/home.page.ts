
import { Component, HostBinding, OnInit } from '@angular/core';
import { DatosService } from '../services/datos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  @HostBinding('class') classes = 'row';

  admis:any =[];
  profs:any=[];
  students:any=[];

  accessA:number = 1;
  accessP:number = 2;
  accessS:number = 3;
  
  constructor(private datosService: DatosService ) { }

  ngOnInit() {
    this.getAdmi();
    this.getProf();
    this.getStuden();
  }
  getAdmi(){
    this.datosService.getAdmis().subscribe(
      res => {
        this.admis = res;     
      },
      err => console.error(err)
    );
  }
  getProf(){
    this.datosService.getProfs().subscribe(
      res => {
        this.profs = res;     
      },
      err => console.error(err)
    );
  }
  getStuden(){
    this.datosService.getStudents().subscribe(
      res => {
        this.students = res;     
      },
      err => console.error(err)
    );
  }
  
}
