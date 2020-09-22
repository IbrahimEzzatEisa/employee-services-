export class FilterParams {
    constructor() {
      this.pageNumber = 1;
      this.pageSize = 100;
      this.searchValue = "";
      this.sortField = "";
      this.sortDirection = "asc"
    }
    pageNumber?: number;
    pageSize?: number;
    searchValue?: string;
    sortField?: string;
    sortDirection?: string;
  }