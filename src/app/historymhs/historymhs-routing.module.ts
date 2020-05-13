import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorymhsPage } from './historymhs.page';

const routes: Routes = [
  {
    path: '',
    component: HistorymhsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorymhsPageRoutingModule {}
