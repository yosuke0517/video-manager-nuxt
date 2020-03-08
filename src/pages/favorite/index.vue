<template>
  <section class="section">
    <div class="container">
      <div class="block">
        <div
          v-for="item in favoriteItems"
          :key="item.id"
          class="block video-block"
        >
          <AppVideo :item="item" :video-id="item.id"></AppVideo>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Getter, Component } from 'nuxt-property-decorator'
import ROUTES from '~/routes/api'
import AppVideo from '~/components/app-video.vue'
import { Items } from '~/types'
@Component({
  middleware: 'authed',
  components: {
    AppVideo
  }
})
export default class videoDetail extends Vue {
  @Getter('videoList/favoriteItems') favoriteItems: Items

  // created() {
  //   this.init()
  // }

  async fetch({ store }) {
    const payload = {
      uri: ROUTES.GET.FAVORITE
    }
    await store.dispatch('videoList/fetchFavoriteVideos', payload)
  }

  // async init() {
  //   const payload = {
  //     uri: ROUTES.GET.FAVORITE
  //   }
  //   await this.$store.dispatch('videoList/fetchFavoriteVideos', payload)
  //   console.log('this.favoriteItems')
  //   console.log(this.favoriteItems)
  // }
}
</script>
