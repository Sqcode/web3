export default class Pagination {
  currentPage = 1;
  totalCount = 0;
  pageSize = 10;

  constructor (pageSize) {
    if (pageSize !== undefined) {
      this.pageSize = pageSize
    }
  }

  getTotalPage () {
    const totalPage = Math.ceil(this.totalCount / this.pageSize)
    return totalPage
  }

  getObject () {
    return {
      size: this.pageSize,
      current: this.currentPage
    }
  }
}
