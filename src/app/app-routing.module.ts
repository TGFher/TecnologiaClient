import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { SistemaComponent } from './sistema/sistema.component';
import { AuthGuard } from './utils/app.guard';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'sistema', component: SistemaComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
