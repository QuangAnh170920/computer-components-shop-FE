export interface ISearch  {
    pageNumber?: number;
    pageSize?: number;
    name: string;
}

export interface IPayload {
    quoteTemplateCode: string;
    quoteTemplateName: string;
    describe: string;
    contentEmail: string;
}

export interface IQuoteTemplates {
    id: string;
    quoteTemplateCode: string;
    quoteTemplateName: string;
    describe: string;
    contentEmail: string;
}