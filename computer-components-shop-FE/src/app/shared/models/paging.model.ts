export interface PagingData<T> { 
    total: number,
    page_size: number; 
    page_index: number,
    total_records:number;
    items?: T[];
    
  }
  
  export interface ResponseData<T> {
    version:string
    response_time: string
    code: number 
    message : string
    data: T
  }

