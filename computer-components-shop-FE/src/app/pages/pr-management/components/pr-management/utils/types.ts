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
    id: number;
    name: string;
    companyCode: number;
    rating: number;
    purchased: number;
    address: string;
    phone: string;
    vat: string;
    paymentBlock: string;
    status: string;
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
    value?: number
};
