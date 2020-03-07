<template>
  <div class="video-box">
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
                        :class="[
                          item.isFavorite ? 'active' : 'has-text-grey-light'
                        ]"
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
          ><v-col cols="3"
            >お気に入り動画がある場合に一覧を表示する</v-col
          ></v-row
        >
        <div class="box">
          <v-system-bar window color="primary">関連動画</v-system-bar>
          <div v-if="relatedItems.item !== null">
            <div
              v-for="relatedItem in relatedItems.item"
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

  async toggleFavorite() {
    await this.$store.dispatch('videoList/toggleFavorite', {
      uri: ROUTES.POST.TOGGLE_FAVORITE.replace(':id', this.$route.params.id)
    })
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
