
export interface IApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  statusCode?: number;
}

export interface IApiError {
  success: false;
  message: string;
  statusCode?: number;
  stack?: string;
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPaginatedResponse<T> extends IApiResponse<T> {
  meta?: IPaginationMeta;
}
