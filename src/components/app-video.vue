<template>
  <div class="video-box">
    <v-card class="video-box">
      <!-- <v-img src="url" height="200px"></v-img> -->
      <img class="img" :src="item.snippet.thumbnails.medium.url" alt="Image" />
      <v-card-title>
        <nuxt-link :to="`/video/${videoId}`">{{
          item.snippet.title
        }}</nuxt-link>
      </v-card-title>

      <v-card-subtitle>
        {{ item.snippet.publishedAt }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn text>Share</v-btn>

        <v-btn color="purple" text>
          Explore
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{ item.snippet.channelTitle }}
            <br />
            {{ item.snippet.description | omitFilter }}
          </v-card-text>
        </div>
      </v-expand-transition>
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
    console.log('this.url')
    console.log(this.url)
    this.url = this.item.snippet.thumbnails.medium.url
    console.log('this.url:after')
    console.log(this.url)
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
