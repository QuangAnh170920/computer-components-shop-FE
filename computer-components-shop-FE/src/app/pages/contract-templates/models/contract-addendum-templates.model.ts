export interface IContractAddendumTemplates {
    id: string;
    contractTemplateCode: string;
    contractTemplateName: string;
    describe: string;
    url: string;
}

export interface IFilterContractAddendumTemplates {
    id: string;
    contractTemplateCode: string;
    contractTemplateName: string;
    describe: string;
    url: string;
    [s: string]: any;
}

export interface IResponse {
    responseCode: string;
    responseMessage: string;
    responseData: string;
}

export interface ISearch  {
    pageNumber?: number;
    pageSize?: number;
    name: string;
}

export interface IPayload {
    id: string;
    contractTemplateCode: string;
    contractTemplateName: string;
    describe: string;
    url: string;
}