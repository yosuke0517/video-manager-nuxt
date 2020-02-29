<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <div v-for="item in items" :key="item.id" class="block video-block">
          <AppVideo :item="item" :video-id="item.id"></AppVideo>
        </div>
        <v-btn color="blue" @click="loadMore">More...</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import AppVideo from '~/components/app-video.vue'
import ROUTES from '~/routes/api'
import { Items } from '~/types'

@Component({
  components: {
    Logo,
    VuetifyLogo,
    AppVideo
  }
})
export default class IndexPage extends Vue {
  @Getter('videoList/items') items: Items[]

  @Getter('videoList/meta') metaData: any
  // async fetch() {
  //   const payload = {
  //     uri: ROUTES.GET.POPULARS
  //   }
  //   await this.$store.dispatch('videoList/discribe', payload)
  // }
  created() {
    this.init()
  }

  async init() {
    const payload = {
      uri: ROUTES.GET.POPULARS
    }
    await this.$store.dispatch('videoList/discribe', payload)
  }

  loadMore() {
    const payload = {
      uri: ROUTES.GET.POPULARS,
      params: {
        pageToken: this.nextPageToken
      }
    }
    this.$store.dispatch('videoList/more', payload)
  }

  get nextPageToken() {
    return this.metaData.nextPageToken
  }
}
</script>
