export enum OperationType {
    ADDROW,
    ADDCOLUMN,
    REMOVEROW,
    REMOVECOLUMN,
    ADDFIELD,
    REMOVEFIELD
}

export interface ControlEventArgs {
    row?: number;
    col?: number;
    id?: string;
    type: OperationType;
}