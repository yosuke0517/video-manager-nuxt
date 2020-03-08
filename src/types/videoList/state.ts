import { MetaTransfer, Items, ItemDetail } from '~/types'

export interface VideoListState {
  meta: MetaTransfer
  items: Items[]
  item: ItemDetail
  relatedItems: Items[]
  searchMeta: MetaTransfer
  searchItems: Items[]
  isFavorite: boolean
  favoriteItems: Items[]
}
