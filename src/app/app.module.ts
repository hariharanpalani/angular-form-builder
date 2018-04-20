import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import { AppComponent, FormlyCheckBox } from './app.component';
import { FormBuilderComponent } from './components/form-builder.component';
import {DragDropModule} from 'primeng/dragdrop';
import {PanelModule} from 'primeng/panel';
import { FormlyRowWrapper } from './wrappers/form-row.wrapper';
import {CheckboxModule} from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { FormBuilderService } from './form-builder.service';
import { FormlyRowColumnType } from './types/row-column-type';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    FormlyRowWrapper,
    FormlyCheckBox,
    FormlyRowColumnType
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    CommonModule,
    CheckboxModule,
    DragDropModule,
    PanelModule,
    FormlyModule.forRoot({
      types: [{ name: 'column', component: FormlyRowColumnType}],
      wrappers: [{ name: 'formly-row-wrapper', component: FormlyRowWrapper }]
    }),
    FormlyBootstrapModule
  ],
  providers: [ FormBuilderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
