import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FleetHomeComponent } from './fleet-home/fleet-home.component';
import { FleetEditComponent } from './fleet-home/fleet-edit/fleet-edit.component';
import { FleetSearchComponent } from './fleet-home/fleet-search/fleet-search.component';
import { FleetNewComponent } from './fleet-home/fleet-new/fleet-new.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'fleet-home', pathMatch: 'full' },
  { path: 'fleet-home', component: FleetHomeComponent, children: [
      { path: 'fleet-edit/:id', component: FleetEditComponent },
      { path: 'fleet-search', component: FleetSearchComponent },
      { path: 'fleet-new', component: FleetNewComponent },
    ]
  },


]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes),
    CommonModule
  ],

  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
