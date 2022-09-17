import { Component, HostBinding, OnInit } from '@angular/core';
import { Student } from 'src/app/models/Student';
import { DatosService } from '../../../../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.page.html',
  styleUrls: ['./edit-student.page.scss'],
})
export class EditStudentPage implements OnInit {

  @HostBinding('class') classes = 'row';

  student: Student = {
    password: '',
  };
  students:any = [];
  edit:boolean = false;

  constructor( private datosService: DatosService, private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;    
    if(params.matricula){      
      this.datosService.getStudent(params.matricula)
      .subscribe(
        res =>{          
          this.student = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }
  saveNewStudent(){
    this.datosService.saveStudent(this.student)
    .subscribe(
      res => {
        console.log(res);
        this.getStudent();      
        this.router.navigate(['/home-admi']);
      },
      err => console.error(err)
    )
  }
  updateStudent(){
    this.datosService.updateStudent(this.student.matricula, this.student)
    .subscribe(
      res =>{
       // console.log(res);
        this.getStudent();
        this.router.navigate(['/home-admi']);
      },
      err => console.error(err)
    )
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
