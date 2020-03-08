<template>
  <div class="video-box">
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="timeout"
      :top="true"
    >
      {{ snackMessage }}</v-snackbar
    >
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        <v-row
          ><v-col cols="8"
            ><v-card class="video-box">
              <youtube
                ref="youtube"
                :video-id="this.$route.params.id"
              ></youtube>
              <div v-if="isLoggedIn" class="favorite">
                <a href="#" @click.prevent="toggleFavorite">
                  <span class="icon is-large">
                    <span class="fa-stack fa-lg">
                      <i
                        class="fas fa-heart fa-stack-1x"
                        :class="[isFavorite ? 'active' : 'has-text-grey-light']"
                      ></i></span></span
                ></a>
              </div>
              <v-card-text>
                <span class="title">{{ item.snippet.title }}</span>
              </v-card-text>
              <v-card-text>
                <span class="title">{{ item.snippet.description }}</span>
              </v-card-text>
            </v-card></v-col
          ></v-row
        >
        <div class="box">
          <v-system-bar window color="primary">関連動画</v-system-bar>
          <div v-if="relatedItems.item !== null">
            <div
              v-for="relatedItem in relatedItems.items"
              :key="relatedItem.id.videoId"
            >
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
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Getter, Component } from 'nuxt-property-decorator'
import ROUTES from '~/routes/api'
import { ItemDetail } from '~/types'
@Component({})
export default class videoDetail extends Vue {
  @Getter('videoList/item') item: ItemDetail

  @Getter('videoList/relatedItems') relatedItems: any

  route: any

  isFavorite: boolean = false

  snackMessage: string = ''

  snackbar: boolean = false

  snackbarColor: string = ''

  timeout: number = 6000

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

  created() {
    this.isFavorite = this.item.isFavorite
  }

  async toggleFavorite() {
    await this.$store.dispatch('videoList/toggleFavorite', {
      uri: ROUTES.POST.TOGGLE_FAVORITE.replace(':id', this.$route.params.id)
    })
    this.isFavorite = !this.isFavorite
    if (this.isFavorite) {
      this.snackMessage = 'お気に入りに追加しました。'
      this.snackbar = true
      this.snackbarColor = 'pink'
    } else {
      this.snackMessage = 'お気に入りから削除しました。'
      this.snackbar = true
      this.snackbarColor = 'info'
    }
  }

  get isLoggedIn() {
    return !!this.$store.state.authenticate.token
  }
}
</script>

<style scoped>
.video-box {
  max-width: 1000px;
}
.img {
  width: 500px;
}
.favorite {
  display: flex;
  justify-content: flex-end;
}
.fa-heart.active {
  color: #ff1493;
}
</style>
