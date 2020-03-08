export interface ItemDetail {
  etag: string
  isFavorite: boolean
  items: []
  kind: string
  pageInfo: pageInfo
}

interface pageInfo {
  resultsPerPage: number
  totalResults: number
}
