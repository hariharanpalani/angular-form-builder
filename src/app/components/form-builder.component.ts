import { Component, OnInit } from '@angular/core';
import { FieldType, FormlyFormBuilder, FormlyFieldConfig, FieldArrayType } from '@ngx-formly/core';
import { clone, isNullOrUndefined } from '@ngx-formly/core/src/utils';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'formly-builder',
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index;">
      <formly-group
        [model]="model[i]"
        [field]="field"
        [options]="options"
        [form]="formControl">
        <div class="col-sm-2 d-flex align-items-center">
          <button class="btn btn-danger" type="button" (click)="remove(i)">Remove</button>
        </div>
      </formly-group>
    </div>
    <div style="margin:30px 0;">
      <button class="btn btn-primary" type="button" (click)="add()">Add More Investments</button>
    </div>
  `,
})
export class FormBuilderComponent extends FieldArrayType  {
    constructor(builder: FormlyFormBuilder) {
        super(builder);
    }
}