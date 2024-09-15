export interface Paginated<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPate: number;
  };
  links: {
    first: string;
    last: string;
    current: string;
    next: string;
    prev: string;
  };
}
