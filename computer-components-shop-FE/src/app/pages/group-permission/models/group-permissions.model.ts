import { IStatusBar } from "../../../shared/components/p-statusbar/models/statusbar.model"



export interface IFilterGroup {
    keyword: string | undefined
    name: string | undefined
   

}
export interface IGroup {
    id: string, name: string, note:string, status: boolean
}

export interface IGrouppermissions {
    group:IGroup,  
    permissions: any[]  
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

