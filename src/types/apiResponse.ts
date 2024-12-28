export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PageResponse<T> {
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalElements: number;
  content: T[];
}
