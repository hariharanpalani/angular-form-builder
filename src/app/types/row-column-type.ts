import { Component, HostListener } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormBuilderService } from '../form-builder.service';
import { OperationType } from '../builder-metadata/control-eventargs';

@Component({
    selector: 'formly-row-col',
    template: `
        <div class="col-align drop-section" pDroppable="ctrl" (onDrop)="onDrop($event)">
            <div class="pull-right" *ngIf="!hideTools">
                <a href="#" (click)="remove()"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
            </div>
            <label>drag & drop components here</label>
        </div>
    `
})
export class FormlyRowColumnType extends FieldType {
    hideTools = true;
    
    constructor(private builderService: FormBuilderService) {
        super();
    }

    @HostListener('mouseenter') onMouseEnter() {
		this.hideTools = false;
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.hideTools = true;
    }
    
    onDrop($event) {
        console.log('field dropped');
    }

    remove() {
        this.builderService.buildEvent.emit({
            type: OperationType.REMOVECOLUMN,
            id: this.field.id,
            row: parseInt(this.field.id.split('-')[1]),
            col: parseInt(this.field.id.split('-')[2])
        })
    }
}