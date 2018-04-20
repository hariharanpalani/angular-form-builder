import { EventEmitter, Injectable } from "@angular/core";
import { ControlEventArgs } from "./builder-metadata/control-eventargs";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { ROWELEMENT, COLELEMENT } from "./builder-metadata/type-structure";
import * as _ from "lodash";
import { clone } from "@ngx-formly/core/src/utils";

@Injectable()
export class FormBuilderService {
    buildEvent = new EventEmitter<ControlEventArgs>();
    private fieldConfig: FormlyFieldConfig[];

    set FielConfig(value: FormlyFieldConfig[]) {
        this.fieldConfig = value;
    }

    addRow() {
        let row = JSON.parse(JSON.stringify(ROWELEMENT));
        row.id = `row-${this.fieldConfig.length}`;
        this.fieldConfig.push(row);
    }

    addColumn(rowIndex: number) {
        let column = JSON.parse(JSON.stringify(COLELEMENT));
        let fieldLength = this.fieldConfig[rowIndex].fieldGroup.length;
        column.id = `col-${rowIndex}-${fieldLength}`;
        let columnSize = 12 / (fieldLength + 1);
        this.fieldConfig[rowIndex].fieldGroup[fieldLength] = column;
        this.modifyExistingColumnCss(rowIndex, columnSize);
    }

    removeRow(id: string) {
        _.remove(this.fieldConfig, item => {
            return item.id == id;
        });

        this.calculateRowIndex();
    }

    removeColumn(id: string, rowIndex: number, colIndex: number) 
    {
        _.remove(this.fieldConfig[rowIndex].fieldGroup, item => {
            return item.id == id;
        });

        let columnSize = 12 / this.fieldConfig[rowIndex].fieldGroup.length;
        this.modifyExistingColumnCss(rowIndex, columnSize);
        this.calculateColumnIndex(rowIndex, this.fieldConfig[rowIndex].fieldGroup);
    }

    private calculateRowIndex() {
        this.fieldConfig.forEach((field, index) => {
            field.id = `row-${index}`;
            field.fieldGroup.forEach((groupField, colIndex)=> {
                groupField.id = `col-${index}-${colIndex}`;
            });
        });
    }

    private calculateColumnIndex(rowIndex, fieldConfig: FormlyFieldConfig[]) {
        fieldConfig.forEach((field, colIndex)=> {
            field.id = `col-${rowIndex}-${colIndex}`;
        });
    }

    private modifyExistingColumnCss(rowIndex:number, columnSize: number) {
        this.fieldConfig[rowIndex].fieldGroup.forEach(value => {
            value.className = `col-md-${columnSize}`;
        });
    }
}