import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { WikiComponent } from './wiki.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    TreeModule
  ],
  declarations: [
    WikiComponent,
    SafePipe
  ],
  exports: [
    WikiComponent
  ]
})
export class WikiModule { }
