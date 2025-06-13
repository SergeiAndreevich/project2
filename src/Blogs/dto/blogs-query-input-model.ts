import {BlogSortsFields, PaginationAndSorting} from "../../core/core-types/pagination-and-sorting";

export type BlogsQueryInput = PaginationAndSorting<BlogSortsFields> &
    Partial<{
        searchBlogNameTerm: string;
    }>;
