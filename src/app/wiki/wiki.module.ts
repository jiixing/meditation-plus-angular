import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { WikiComponent } from './wiki.component';

@NgModule({
  imports: [
    MaterialModule,
    TreeModule
  ],
  declarations: [
    WikiComponent
  ],
  exports: [
    WikiComponent,
    MaterialModule
  ]
})
export class WikiModule { }
