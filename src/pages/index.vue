<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <v-row>
          <v-col offset="1" cols="7" md="7">
            <v-text-field
              v-model="query"
              outlined
              single-line
              hide-details
              @keyup.enter="search"
              ><template v-slot:label>
                検索 here（文字列を入力してください）！！
                <v-icon small>fas fa-search</v-icon>
              </template></v-text-field
            > </v-col
          ><v-col cols="3" md="3">
            <v-btn class="searchBtn" large color="info" @click="search"
              >検索</v-btn
            >
          </v-col>
        </v-row>
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
import AppVideo from '~/components/app-video.vue'
import ROUTES from '~/routes/api'
import { Items } from '~/types'

@Component({
  middleware: 'authed',
  components: {
    AppVideo
  }
})
export default class IndexPage extends Vue {
  @Getter('videoList/items') items: Items[]

  @Getter('videoList/meta') metaData: any

  query: string = ''
  searchParam = {
    q: ''
  }

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

  search() {
    this.searchParam.q = this.query
    this.$router.push({ path: '/search', query: this.searchParam })
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
