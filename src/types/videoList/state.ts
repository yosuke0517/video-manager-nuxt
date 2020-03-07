import { MetaTransfer, Items } from '~/types'

export interface VideoListState {
  meta: MetaTransfer
  items: Items[]
  item: Items
  relatedItems: Items[]
  searchMeta: MetaTransfer
  searchItems: Items[]
  isFavorite: boolean
  favoriteItems: Items[]
}
