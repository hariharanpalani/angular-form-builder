import { Component, ViewContainerRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig, FieldWrapper, FieldType } from '@ngx-formly/core';
import { FormBuilderService } from './form-builder.service';
import { ControlEventArgs, OperationType } from './builder-metadata/control-eventargs';
import { COMPONENT_VARIABLE } from '@angular/platform-browser/src/dom/dom_renderer';


@Component({
 selector: 'formly-checkbox',
 template: `
    <ng-container *ngFor="let item of field.templateOptions.options">
      <p-checkbox [name]="field.name" [value]="item.value" [label]="item.name" [formControl]="formControl"></p-checkbox>
    </ng-container>
 `,
})
export class FormlyCheckBox extends FieldType {}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';
	form = new FormGroup({});
	model: any = {};
	options: FormlyFormOptions = {};
	fields: FormlyFieldConfig[] = [];

	constructor(private builderService: FormBuilderService) {
		this.builderService.FielConfig = this.fields;
	}

	ngOnInit() {
		this.builderService.buildEvent.subscribe((args) => this.onBuildEvent(args));
	}

	onBuildEvent(args: ControlEventArgs) {
		switch(args.type) {
			case OperationType.ADDROW:
				this.builderService.addRow();
				break;
			case OperationType.ADDCOLUMN:
				this.builderService.addColumn(args.row);
				break;
			case OperationType.REMOVEROW:
				this.builderService.removeRow(args.id);
				break;
			case OperationType.REMOVECOLUMN:
				this.builderService.removeColumn(args.id, args.row, args.col);
				break;
			case OperationType.ADDFIELD:
				break;
			case OperationType.REMOVEFIELD:
				break;
		}

		this.form = new FormGroup({});
	}

	onDrop($event, type) {
		this.builderService.buildEvent.emit({
			type: OperationType.ADDROW,
		});
	}

	submit() {
		alert(JSON.stringify(this.model));
	}
}