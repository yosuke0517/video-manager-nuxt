<template>
  <div class="video-box">
    <v-card class="video-box">
      <youtube ref="youtube" :video-id="this.$route.params.id"></youtube>
      <v-card-text>
        <span class="title">{{ item.snippet.title }}</span>
      </v-card-text>
      <v-card-text>
        <span class="title">{{ item.snippet.description }}</span>
      </v-card-text>
    </v-card>
    <div class="box"></div>
    <div class="box">
      <v-system-bar window color="primary">関連動画</v-system-bar>
      <div v-for="relatedItem in relatedItems" :key="relatedItem.id.videoId">
        <hr />
        <nuxt-link :to="`/video/${relatedItem.id.videoId}`">
          <article class="media">
            <div class="media-left">
              <figure class="image">
                <img
                  :src="relatedItem.snippet.thumbnails.default.url"
                  alt="thumbnail"
                />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>{{ relatedItem.snippet.title }}</p>
                <small>{{ relatedItem.snippet.channelTitle }}</small>
              </div>
            </div>
          </article>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Getter, Component } from 'nuxt-property-decorator'
import ROUTES from '~/routes/api'
import { Items } from '~/types'
@Component({})
export default class videoDetail extends Vue {
  @Getter('videoList/item') item: Items

  @Getter('videoList/relatedItems') relatedItems: any

  route: any

  async fetch({ route, store }) {
    const payload = {
      uri: ROUTES.GET.VIDEO.replace(':id', route.params.id)
    }
    const relatedVideosPayload = {
      uri: ROUTES.GET.RELATED.replace(':id', route.params.id)
    }
    await store.dispatch('videoList/findVideo', payload)
    await store.dispatch('videoList/fetchRelatedVideos', relatedVideosPayload)
  }
}
</script>

<style scoped>
.video-box {
  max-width: 900px;
}
.img {
  width: 600px;
}
</style>
