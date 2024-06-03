import { IStatusBar } from "@shared/components/p-statusbar/models/statusbar.model"

export interface IFilterpermissions {
    keyword: string | undefined
    name: string | undefined
   

}
export interface IContentType
{
    id:string
    app_label:string
    model:string
}

export interface IPermissions {
    id: string
    name: string,  
    code:string,
    content_type:IContentType
    module_code:string
    module_name:string 
    model_code:string
    model_name:string 
    order:number

}
export interface IPermissionsById {   
}
export const STATUS: IStatusBar[] = [
    {
        index: 0,
        label: 'Nháp',
        selected: false
    },
    {
        index: 1,
        label: 'Đang sử dụng',
        selected: false
    } 
]

