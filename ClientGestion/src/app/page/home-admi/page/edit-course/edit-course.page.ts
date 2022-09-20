import { Component, HostBinding, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/Curso';
import { DatosService } from '../../../../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.page.html',
  styleUrls: ['./edit-course.page.scss'],
})
export class EditCoursePage implements OnInit {

  @HostBinding('class') classes = 'row';

  course: Curso = {
    nrc: 0,
  };
  courses:any = [];
  edit:boolean = false;
  nrc:number; 

  constructor( private datosService: DatosService, private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;    
    this.nrc = params.nrc;
    if(params.nrc){
      this.getCurso(params.nrc);
    }
  }
  getCurso(nrc:number){
    this.datosService.getCourse(nrc)
      .subscribe(
        res =>{
          console.log(res);
          this.course = res;
          this.edit = true;
        },
        err => console.error(err)
      )
  }
  saveNewCourse(){
    this.datosService.saveCourse(this.course)
    .subscribe(
      res => {
        console.log(res);    
        this.getCourse();
        this.router.navigate(['/home-admi']);
      },
      err => console.error(err)
    )
  }
  updateCourse(){
    this.datosService.updateCourse(this.course.clave, this.course)
    .subscribe(
      res =>{
        console.log(res);
        this.getCourse();
        this.getCurso(this.nrc);
        //this.router.navigate(['../../list-courses']);
      },
      err => console.error(err)
    )
  }
  getCourse(){
    this.datosService.getCourses().subscribe(
      res => {
        this.course = res;     
      },
      err => console.error(err)
    );
  }
}
