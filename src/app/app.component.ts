import { Component, ViewContainerRef, ViewChild, OnInit, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig, FieldWrapper, FieldType } from '@ngx-formly/core';
import { FormBuilderService } from './form-builder.service';
import { ControlEventArgs, OperationType } from './builder-metadata/control-eventargs';
import { COMPONENT_VARIABLE } from '@angular/platform-browser/src/dom/dom_renderer';
import { trigger,style,transition,animate,keyframes,query,stagger, state } from '@angular/animations';

@Component({
 selector: 'formly-checkbox',
 template: `
    <ng-container *ngFor="let item of field.templateOptions.options">
      <p-checkbox [name]="field.name" [value]="item.value" [label]="item.name" [formControl]="formControl"></p-checkbox>
    </ng-container>
 `
})
export class FormlyCheckBox extends FieldType {}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
	trigger('upDownState', [
		state('up', style({
			transform: 'translateY(0px)'
		})),
		state('down',   style({
			transform: 'translateY(25px)'
		})),
		transition('up => down', animate('5000ms ease-out')),
		transition('down => up', animate('5000ms ease-in'))
	  ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
	goals = ['My first life goal', 'I want to climb a mountain', 'Go ice skiing'];

	title = 'app';
	form = new FormGroup({});
	model: any = {};
	options: FormlyFormOptions = {};
	fields: FormlyFieldConfig[] = [];
	show = false; visible = false;
	height = "250px";
	@ViewChild('scanner') scanner: ElementRef;
	@ViewChild('parent') parent: ElementRef;

	get stateName() {
		return this.show ? 'down' : 'up'
	}

	ngAfterViewInit() {
		//this.scanner.nativeElement.offsetLeft = this.parent.nativeElement.offsetLeft + 10;
		/*this.renderer.setStyle(this.scanner.nativeElement, 'left', (this.parent.nativeElement.offsetLeft - 10) + 'px');
		this.renderer.setStyle(this.scanner.nativeElement, 'top', (this.parent.nativeElement.offsetTop - 10) + 'px');
		console.log(this.parent.nativeElement.offsetHeight);*/
	}

	constructor(private builderService: FormBuilderService, private renderer: Renderer2) {
		this.builderService.FielConfig = this.fields;
	}

	toggle() {
		this.show = !this.show;
		this.renderer.setStyle(this.scanner.nativeElement, 'top', '50px');
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