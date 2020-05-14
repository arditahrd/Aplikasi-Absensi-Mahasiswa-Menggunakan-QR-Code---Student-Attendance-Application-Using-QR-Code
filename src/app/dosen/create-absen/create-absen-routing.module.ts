import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAbsenPage } from './create-absen.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAbsenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAbsenPageRoutingModule {}
