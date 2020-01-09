export class PageRequest {
  page: number;
  limit: number;
  filters: {
    type?: string;
  };
  constructor(page, limit, filters: object = {}) {
    this.page = page;
    this.limit = limit;
    this.filters = filters;
  }
}
