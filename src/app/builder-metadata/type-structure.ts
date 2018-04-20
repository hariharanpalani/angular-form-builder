import { FormlyFieldConfig } from "@ngx-formly/core";

export const ROWELEMENT: FormlyFieldConfig = {
    fieldGroupClassName: 'row',
    wrappers: [ 'formly-row-wrapper' ],
    fieldGroup: []
}

export const COLELEMENT: FormlyFieldConfig = {
    type: 'column'
}