import { Component, ViewChild, ViewContainerRef, HostListener, OnInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { FormBuilderService } from '../form-builder.service';
import { OperationType } from '../builder-metadata/control-eventargs';

@Component({
  selector: 'formly-row-wrapper',
  template: `
    <div class="form-group row customize-tool">
      <div class="col-md-12" style="" pDroppable="col" (onDrop)="onDrop($event)">
        <div class="pull-right" *ngIf="!hideTools">
          <a href="#" (click)="remove()"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
        </div>
        <ng-template #fieldComponent></ng-template>
        &nbsp;
      </div>
    </div>
  `,
})
export class FormlyRowWrapper extends FieldWrapper implements OnInit {
	hideTools = true;
	private rowIndex = -1;
	@ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;

	@HostListener('mouseenter') onMouseEnter() {
		this.hideTools = false;
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.hideTools = true;
	}

	constructor(private builderService: FormBuilderService) {
		super();
	}

	ngOnInit() {
		this.rowIndex = parseInt(this.field.id.split('-')[1]);
	}

	remove() {
		this.builderService.buildEvent.emit({
			type: OperationType.REMOVEROW,
			row: this.rowIndex,
			id: this.field.id
		});
	}

	onDrop($event) {
		if(this.field.fieldGroup.length == 3) {
			alert('No more than 3 columns allowed');
			return;
		}

		this.builderService.buildEvent.emit({
			type: OperationType.ADDCOLUMN,
			row: this.rowIndex
		});
	}
}