export interface IPaginationOptions {
  page?: number;
  limit?: number;
}

export interface ISortOptions {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IQueryOptions extends IPaginationOptions, ISortOptions {}
