export interface PurchaseRequest {
    id: number;
    item: number;
    material: string;
    materialGroup: number;
    docType: string;
    docCategory: string;
    purchasingGroup: string;
    plant: number;
    storageLocation: number;
    deliveryDate: string;
    releaseDate: string;
    status: string;
}

export interface Supplier {
     banfn:string;
     bnfpo:string;
     lifnr:string;
     name1:string;
     name2:string;
     stceg:string; //VAT Registration Number
     telf1:string; //First telephone number
     telf2:string; //Second telephone number
     bukrs:string; //Company Code
     zahls:string; //Block Key for Payment
     rank:number; //rating
     stras:string; // địa chỉ
     status:number ; //status
     purchased:number;
     datlt: string;
}

export interface FileVendor {
    id: number;
    sentDate: string;
    label: string;
    vendor: string;
    channel: string;
}

export interface Contract {
    id: number;
    sentDate: string;
    vendor: string;
    files: string[];
}

export type SelectOption<T> = {
    name: string | number;
    code: T;
};
