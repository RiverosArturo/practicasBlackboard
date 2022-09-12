import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from 'src/app/home/home.page';

import { HomeStudPage } from './home-stud.page';
import { ConsultarActividadPage } from './actividades/consultar-actividad/consultar-actividad.page';
import { ConsultarPage } from './curso/consultar/consultar.page';
import { MenuStudentPage } from './menu-student/menu-student.page';
import { ConsultarEquipoPage } from '../home-prof/equipo/consultar-equipo/consultar-equipo.page';
import { ReportePage } from './reporte/reporte.page';
import { AvisosPage } from '../home-prof/comunicacion/avisos/avisos.page';
import { ChatPage } from './comunicacion/chat/chat.page';
import { CalificacionPromedioPage } from './calificacion-promedio/calificacion-promedio.page';
import { ConsultarEstudiantePage } from '../home-prof/estudiante/consultar-estudiante/consultar-estudiante.page';
import { ModificarEstudiantePage } from './estudiante/modificar-estudiante/modificar-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: HomeStudPage
  },
  {
    path: 'consultar/:user',
    loadChildren: () => import('./curso/consultar/consultar.module').then( m => m.ConsultarPageModule)
  },
  {
    path: 'reporte/:user/:nrc',
    loadChildren: () => import('./reporte/reporte.module').then( m => m.ReportePageModule)
  },
  {
    path: 'avisos/:user/:nrc/:nTrabajador/:curso/:id_equipo',
    loadChildren: () => import('./comunicacion/avisos/avisos.module').then( m => m.AvisosPageModule)
  },
  {
    path: 'chat/:user/:nrc/:nTrabajador/:id/:curso',
    loadChildren: () => import('./comunicacion/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'calificacion-promedio/:user/:nrc',
    loadChildren: () => import('./calificacion-promedio/calificacion-promedio.module').then( m => m.CalificacionPromedioPageModule)
  },
  {
    path: 'consultar-equipo/:user/:nrc/:materia/:id/:nTrabajador',
    loadChildren: () => import('./equipo/consultar-equipo/consultar-equipo.module').then( m => m.ConsultarEquipoPageModule)
  },
  {
    path: 'modificar-equipo/:user/:nrc',
    loadChildren: () => import('./equipo/modificar-equipo/modificar-equipo.module').then( m => m.ModificarEquipoPageModule)
  },
  {
    path: 'consultar-estudiante/:user/:nrc',
    loadChildren: () => import('./estudiante/consultar-estudiante/consultar-estudiante.module').then( m => m.ConsultarEstudiantePageModule)
  },
  {
    path: 'modificar-estudiante/:user/:nrc',
    loadChildren: () => import('./estudiante/modificar-estudiante/modificar-estudiante.module').then( m => m.ModificarEstudiantePageModule)
  },
  {
    path: 'consultar-actividad/:user/:nrc/:id_equipo/:nTrabajador/:curso',
    loadChildren: () => import('./actividades/consultar-actividad/consultar-actividad.module').then( m => m.ConsultarActividadPageModule)
  },
  {
    path:'home',
    component: HomePage
  },
  {
    path: 'consultar/:user',
    component: ConsultarPage
  },
  {
    path: 'menu-student/:user/:nrc/:materia/:nTrabajador',
    loadChildren: () => import('./menu-student/menu-student.module').then( m => m.MenuStudentPageModule)
  },
  {
    path: 'menu-student/:user/:nrc/:nTrabajador',
    component: MenuStudentPage
  },
  {
    path: 'consultar-equipo/:user/:nrc',
    component: ConsultarEquipoPage
  },
  {
    path: 'modificar-equipo/:user/:nrc',
    component: ConsultarEquipoPage
  },
  {
    path: 'reporte/:user/:nrc',
    component: ReportePage
  },
  {
    path: 'consultar-actividad/:user/:nrc/:id_equipo/:nTrabajador/:curso',
    component: ConsultarActividadPage
  },
  {
    path: 'avisos/:user/:nrc/:nTrabajador/:curso/:id_equipo',
    component: AvisosPage
  },
  {
    path: 'chat/:user/:nrc/:nTrabajador/:id/:curso',
    component: ChatPage
  },
  {
    path: 'calificacion-promedio/:user/:nrc',
    component: CalificacionPromedioPage
  },
  ///////////////Posiblemente estos dos componentes se tengan que borrar////////
  {
    path: 'consultar-estudiante/:user/:nrc',
    component: ConsultarEstudiantePage
  },
  {
    path: 'modificar-estudiante/:user/:nrc',
    component: ModificarEstudiantePage
  },
  {
    path: 'perfil/:user/:nrc',
    loadChildren: () => import('./estudiante/perfil/perfil.module').then( m => m.PerfilPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeStudPageRoutingModule {}
