export interface PaginationOptions {
    page?: number;
    limit?: number;
}
export interface SortOptions {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface QueryOptions extends PaginationOptions, SortOptions {
}
//# sourceMappingURL=QueryOptions.d.ts.map