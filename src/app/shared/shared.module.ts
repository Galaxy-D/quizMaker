
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { UnescapePipe } from './unescape.pipe';
import { AutoFilterDropdownComponent } from './auto-filter-dropdown/auto-filter-dropdown.component';

@NgModule({
  declarations:[
    UnescapePipe,
    AutoFilterDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UnescapePipe,
    AutoFilterDropdownComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
