import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorymhsPageRoutingModule } from './historymhs-routing.module';

import { HistorymhsPage } from './historymhs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorymhsPageRoutingModule
  ],
  declarations: [HistorymhsPage]
})
export class HistorymhsPageModule {}
