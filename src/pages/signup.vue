<template>
  <div class="signUp">
    <form @submit.prevent="onSignUp">
      <v-text-field
        v-model="name"
        v-validate="'required|max:10'"
        :counter="10"
        :error-messages="errors.collect('名前')"
        label="Name"
        data-vv-name="名前"
      ></v-text-field>
      <v-text-field
        v-model="email"
        v-validate="'required|email'"
        :error-messages="errors.collect('email')"
        label="E-mail"
        data-vv-name="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        v-validate="'required|min:6'"
        type="password"
        :error-messages="errors.collect('password')"
        label="Password"
        data-vv-name="password"
      ></v-text-field>
      <v-text-field
        v-model="passwordConfirm"
        v-validate="'required|confirmed:password'"
        type="password"
        :error-messages="errors.collect('password')"
        label="Password（確認用）"
        data-vv-name="password"
      ></v-text-field>
      <v-btn class="mr-4" color="green" @click="validation">ユーザ登録</v-btn>
      <v-btn color="error" @click="reset">Reset Form</v-btn>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
// import { i18n } from '~/plugins/nuxt-i18n'
import { AxiosError } from 'axios'
@Component({ inject: ['$validator'] })
export default class SignupPage extends Vue {
  name: string = null

  email: string = null

  password: string = null

  passwordConfirm: string = null

  validation() {
    try {
      const result = this.$validator.validateAll()
      if (result) {
        const signUpData = {
          email: this.email,
          password: this.password
        }
        this.onSignUp(signUpData)
      }
    } catch (err) {
      // this.isAlert = true
      // this.type = 'error'
      // this.message = 'エラーだよ'
      alert('error')
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  async onSignUp(signUpData) {
    // TODO ローディング開始処理
    await this.$store
      .dispatch('authenticate/signUp', signUpData)
      // eslint-disable-next-line handle-callback-err
      .catch((error: AxiosError) => {
        // TODO エラーハンドリング ↓でエラーダイアログが出るような共通コンポーネントを作成する必要がある
        // this.addError(error)
        // isError = true
        console.log(error)
      })
      .finally(() => {
        // TODO ローディング終了処理
      })
  }

  reset() {
    this.name = ''
    this.email = ''
    this.password = ''
    this.passwordConfirm = ''
    // VeeValidate.Validator.reset()
    // this.$validator.reset()
  }
}
</script>
