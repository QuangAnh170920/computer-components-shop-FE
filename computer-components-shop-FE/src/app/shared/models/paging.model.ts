export interface PagingData<T> {
  total: number;
  page_size: number;
  page_index: number;
  total_records: number;
  items?: T[];
}

export interface NewPagingData<T> {
  content: T[]; // Array of items
  empty: boolean; // Whether the content is empty
  first: boolean; // Whether this is the first page
  last: boolean; // Whether this is the last page
  number: number; // Current page number (0-based)
  numberOfElements: number; // Number of elements on the current page
  size: number; // Size of the page (number of items per page)
  totalElements: number; // Total number of elements
  totalPages: number; // Total number of pages
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
}

export interface ResponseData<T> {
  version: string;
  response_time: string;
  code: number;
  message: string;
  data: T;
}

export interface NewResponseData<T> {
  responseCode: string;
  responseMessage: string;
  responseData: T;
}
