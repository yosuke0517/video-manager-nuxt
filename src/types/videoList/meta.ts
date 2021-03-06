export interface MetaTransfer {
  etag: string
  items: any
  kind: string
  nextPageToken: string
  pageInfo: PageInfo
}

export interface PageInfo {
  resultsPerPage: number
  totalResults: number
}
