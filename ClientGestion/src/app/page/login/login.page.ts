
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
    id: '',
    password: '',
  };
  prof: Prof = {
    nTrabajador: 0,
    password: '',
  };
  student: Student = {
    matricula: 0,
    password: '',
  };  
  login:User = {
    id: '',
    user: 0,
    password: '',
  }  
  id:string;
  mensaje:string;
  condition:boolean = false;

  constructor(private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute) { }

  ngOnInit() { 
    const params = this.activedRoute.snapshot.params;    
    if(params.accessA == 1){
      this.condition = true;
    }
  }
  Login(id:string, user:number, password:string){
    const params = this.activedRoute.snapshot.params; 
    //console.log('userLogin = ',user);
    //console.log('passwordLogin = ',password);    
//------- Login Admi ----------------------------------------    
    if(params.accessA == 1){      
      console.log('hola Admi');  
      console.log('userLogin = ',id);
      console.log('passwordLogin = ',password);   
      this.datosService.getOneAdmi(id).subscribe(
        res => {
          this.admis = res;
          console.log(res);
          if(id == this.admis.id){
            if(password == this.admis.password){
              this.mensaje = 'Acceso consedido';
                console.log(this.mensaje);
                //this.router.navigate(['/home-admi']); 
            }else{   
              this.mensaje = 'Acceso negado, Usuario o Password incorrecto';         
              console.log(this.mensaje);
            }            
          }else{    
            this.mensaje = 'Usuario no Existe';        
            console.log(this.mensaje);
          }
        },
        err => console.error(err)
      );    
    }    
//-------- Login Prof --------------------------------------------
    if(params.accessP == 2){
      console.log('hola Profesor');  
      console.log('userLogin = ',user);
      console.log('passwordLogin = ',password);    
      this.datosService.getProf(user).subscribe(
        res => {
          this.profs = res; 
          //console.log('res = ',this.profs);          
          //console.log('userProf = ',this.profs.nTrabajador);
          //console.log('passwordProf = ',this.profs.password);
          if(user == this.profs.nTrabajador){
            if(password == this.profs.password){
              this.mensaje = 'Acceso consedido';
                console.log(this.mensaje);
                this.router.navigate(['/home-prof',this.profs.nTrabajador]); 
            }else{   
              this.mensaje = 'Acceso negado, Usuario o Password incorrecto';         
              console.log(this.mensaje);
            }            
          }else{    
            this.mensaje = 'Usuario no Existe';        
            console.log(this.mensaje);
          }
        },
        err => console.error(err)
      );         
    }
//--------- Login student--------------------------------------------
    if(params.accessS == 3){   
      console.log('hola Student');  
      console.log('userLogin = ',user);
      console.log('passwordLogin = ',password);   
      this.datosService.getStudent(user).subscribe(
        res => {
          this.students = res;                 
          console.log('userstudent = ',this.students.matricula);
          console.log('passwordStudent = ',this.students.password);
          if(user == this.students.matricula){
            if(password == this.students.password){
              this.mensaje = 'Acceso consedido';
                console.log(this.mensaje);
                this.router.navigate(['/home-stud',this.students.matricula]); 
            }else{   
              this.mensaje = 'Acceso negado, Usuario o Password incorrecto';         
              console.log(this.mensaje);
            }            
          }else{    
            this.mensaje = 'Usuario no Existe';        
            console.log(this.mensaje);
          }
        },
        err => console.error(err)
      );
          
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
