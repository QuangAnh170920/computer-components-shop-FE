export interface IPlan {
    mandt: number,
    name1: string,
    name2: string,
    stras: string,
    werks: string
}

export interface IMaterialGroup {
    mandt: number, matkl: string, wgbez: string, wgbez60: string
}
export interface ISearchPayLoad {
    pageNumber?: number,
    pageSize?: number,
    searchField?: string,
    matnr?: [
        string
    ],
    matkl?: [
        string
    ],
    werks?: [
        string
    ],
    status?: number,
    fromDate?: Date,
    toDate?: Date,
    [s:string]: any,
}

export interface IItemSelected {
    bnfpo: string //item
    banfn: string //pr code
    bsart: string // doc type
    bstyp: string //doc cat
    ekgrp: string //purch group
    txz01: string
    matnr: string //material
    name1: string //plant
    lgort: string // storage Loc
    wgbez: string // material group name
    lfdat: Date// delivery date
    frgdt: Date // release date
    status: number
    lgobe: string //description sloc
}
export interface IVendor {
    pageNumber?: number,
    pageSize?: number,
    matnr: string,
    banfn : string,
    bnfpo : string,
}
export interface IContract {
    id: number,
    contractTemplateName: string,
}
export interface IQuote {
    id: number,
    quoteTemplateName: string,
}
export interface ISendMailContract{
    contractsTemplateId: number;
    banfn: string,
    bnfpo: string,
    lifnrList: [string]
}
export interface ISendMailPR{
    prTemplateId: number;
    banfn: string,
    bnfpo: string,
    lifnrList: [string]
}
