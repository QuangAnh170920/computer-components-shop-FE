export enum EFormAction  {
    VIEW = 'view',
    EDIT = 'edit',
    CLONE = 'clone',
    INSERT = 'insert',
}

export interface IFormConfig {
    action: EFormAction | undefined
    item: any
}
