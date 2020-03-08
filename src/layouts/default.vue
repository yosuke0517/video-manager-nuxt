<template>
  <v-app dark>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="timeout"
      :top="true"
    >
      {{ snackMessage }}</v-snackbar
    >
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link class="homeLink" to="/">
        <v-toolbar-title v-text="title" />
      </nuxt-link>

      <v-spacer />
      <v-btn class="mr-2" rounded color="info" to="/" nuxt>ホーム</v-btn>
      <div v-if="isLogin" class="logout">
        <v-btn class="mr-2" rounded color="info" to="/favorite" nuxt
          >お気に入り</v-btn
        >
        <v-btn rounded color="info" @click="logout">Logout</v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import { i18n } from '../plugins/nuxt-i18n'
import { Token } from '~/types'
@Component({})
export default class Default extends Vue {
  @Getter('authenticate/token') token: Token
  clipped: boolean = false
  drawer: boolean = false
  fixed: boolean = false
  items: object = null
  snackMessage: string = ''

  snackbar: boolean = false

  snackbarColor: string = ''

  timeout: number = 6000

  miniVariant: boolean = false
  right: boolean = true
  rightDrawer: boolean = false
  title: string = 'VideoManager'

  get isLogin() {
    return !!this.token
  }

  created() {
    this.items = [
      {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: '/'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Inspire',
        to: '/inspire'
      }
    ]
  }

  logout() {
    this.$store.dispatch('authenticate/logout')
    this.snackMessage = i18n.tc('info.I-0004')
    this.snackbarColor = 'green'
    this.snackbar = true
  }
}
</script>
<style scoped>
.homeLink {
  color: white;
  text-decoration: none;
}
.searchBtn {
  top: 12px;
}
.logout {
  display: flex;
  justify-content: flex-end;
}
</style>
