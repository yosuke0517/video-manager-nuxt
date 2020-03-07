<template>
  <div class="searchPage">
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        <div class="block">
          <div
            v-for="item in searchItems"
            :key="item.id.videoId"
            class="block video-block"
          >
            <AppVideo :item="item" :video-id="item.id.videoId" />
          </div>
          <v-btn color="blue" @click="loadMore">More...</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Getter, Component } from 'nuxt-property-decorator'
import ROUTES from '~/routes/api'
import { Items, MetaTransfer } from '~/types'
import AppVideo from '~/components/app-video.vue'

@Component({
  components: {
    AppVideo
  }
})
export default class SearchIndex extends Vue {
  // @Getter('videoList/items') items: Items[]

  @Getter('videoList/searchMeta') searchMeta: MetaTransfer

  @Getter('videoList/searchItems') searchItems: Items[]

  created() {
    this.init()
  }

  async init() {
    const q = encodeURIComponent(this.$route.query.q.toString()) || ''
    const payload = {
      uri: ROUTES.GET.SEARCH,
      params: {
        q
      }
    }
    await this.$store.dispatch('videoList/searchVideos', payload)
  }

  loadMore() {
    const q = encodeURIComponent(this.$route.query.q.toString()) || ''
    const payload = {
      uri: ROUTES.GET.SEARCH,
      params: {
        pageToken: this.nextPageToken,
        q
      }
    }
    this.$store.dispatch('videoList/searchMore', payload)
  }

  get nextPageToken() {
    return this.searchMeta.nextPageToken
  }
}
</script>
