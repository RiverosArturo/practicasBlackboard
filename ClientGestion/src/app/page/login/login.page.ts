
import { Component,HostBinding, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { Prof } from 'src/app/models/Prof';
import { Student } from 'src/app/models/Student';
import { Admi } from 'src/app/models/Admi';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  students:any =[];
  profs:any =[];
  admis:any=[];
  users:any=[];

  admi: Admi = {
    user: 201347656,
    password: 'password',
  };
  prof: Prof = {
    nTrabajador: 201347656,
    password: 'password',
  };
  student: Student = {
    matricula: 201347656,
    password: 'password',
  };
  
  login:User = {
    user: 201347656,
    password: '',
  }
  nTrabajador:201347656;
  
  constructor(private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() {    
    
  }
  Login(user:number,nTrabajador:number){
    nTrabajador=201347656;
    const params = this.activedRoute.snapshot.params;          

    if(params.accessA == 1){
      console.log('hola Tony Admi');
      if(user == 1){
        console.log('hola Admi');
      }
    }    
    if(params.accessP == 2){
      console.log('hola Profesor');
      console.log('User: ',user);
      console.log('Usuario: ',nTrabajador);
      if(user == nTrabajador){
        console.log('Acceso consedido');
        this.router.navigate(['/home-prof']);      
      }
    }
    if(params.accesS == 3){
      console.log('hola Student');
      if(params.accesS == user){
        console.log('hola Student');
      }
    }           
  }
  updateProf(){
    this.datosService.updateProf(this.prof.nTrabajador, this.prof)
    .subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/home-admi']);
      },
      err => console.error(err)
    )
  }

  access(){                   
///////////////////////////////////////////////////////////////////////////////////////
  //  console.log(this.user.user)   
  //  console.log(this.user.password)
  //  console.log(this.user);    
  //  console.log(this,params);

    //this.router.navigate(['/home-admi']);
  }
  getAdmi(){
    this.datosService.getAdmis().subscribe(
      res => {
        this.admis = res;     
      },
      err => console.error(err)
    );
  }
  getProfs(){
    this.datosService.getProfs().subscribe(
      res => {
        this.profs = res;     
      },
      err => console.error(err)
    );
  }
  getStudent(){
    this.datosService.getStudents().subscribe(
      res => {
        this.students = res;     
      },
      err => console.error(err)
    );
  }

}
