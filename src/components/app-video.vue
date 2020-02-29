<template>
  <div class="video-box">
    <v-card class="video-box">
      <img class="img" :src="item.snippet.thumbnails.medium.url" alt="Image" />
      <v-card-title>
        <nuxt-link :to="`/video/${videoId}`">{{
          item.snippet.title
        }}</nuxt-link>
      </v-card-title>

      <v-card-subtitle>
        {{ item.snippet.publishedAt }}
      </v-card-subtitle>

      <v-card-text>
        {{ item.snippet.channelTitle }}
      </v-card-text>
      <v-card-text>
        {{ item.snippet.description | omitFilter }}
      </v-card-text>
      <!-- </div>
      </v-expand-transition> -->
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class AppVideo extends Vue {
  @Prop()
  item: any

  @Prop()
  videoId: string

  show: boolean = false

  url: string = null

  created() {
    this.url = this.item.snippet.thumbnails.medium.url
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
