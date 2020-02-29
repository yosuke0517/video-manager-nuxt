import { MetaTransfer, Items } from '~/types'

export interface VideoListState {
  meta: MetaTransfer
  items: Items[]
  item: Items
  relatedItems: []
}
