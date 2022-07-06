
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
    id: 'admi',
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
    id: 'admi',
    user: 20,
    password: '',
  }  
  id:string;
  user:number;
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
    
//------- Login Admi ----------------------------------------    
    if(params.accessA == 1){      
      console.log('hola Admi'); 
      this.datosService.getOneAdmi(id).subscribe(
        res => {
          this.admis = res;         
          if(id == this.admis.id){
            if(password == this.admis.password){
              this.mensaje = 'Acceso consedido';
                console.log(this.mensaje);
                id = this.admis.id;
                this.router.navigate(['/home-admi',id]); 
            }else{   
              this.mensaje = 'Acceso negado, Password incorrecto';         
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
      this.datosService.getProf(user).subscribe(
        res => {
          this.profs = res; 
          if(user == this.profs.nTrabajador){
            if(password == this.profs.password){
              this.mensaje = 'Acceso consedido';
                console.log(this.mensaje);
                user = this.profs.nTrabajador;                
                this.router.navigate(['/home-prof',user]); 
            }else{   
              this.mensaje = 'Acceso negado, Password incorrecto';         
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
      this.datosService.getStudent(user).subscribe(
        res => {
          this.students = res;   
          if(user == this.students.matricula){
            if(password == this.students.password){
              this.mensaje = 'Acceso consedido';
                console.log(this.mensaje);
                user = this.students.matricula;
                this.router.navigate(['/home-stud',user]); 
            }else{   
              this.mensaje = 'Acceso negado, Password incorrecto';         
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

}
