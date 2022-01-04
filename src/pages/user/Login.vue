<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <!-- <CAlert color="primary">A simple primary alert—check it out!</CAlert> -->
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md">
            <q-card flat class="bg-white text-black">
              <q-form @submit="login">
                <div class="row">
                  <div class="col-md-6 col-xs-12 bg-cyan">
                    <q-img src="statics/vellid.png"></q-img>
                  </div>
                  <div class="col-md-6 col-xs-12">
                    <q-card-section class="text-center text-blue-grey-14 ">
                      <div class="text-weight-light text-h4">Login</div>
                      <div class="text-caption my-font">Sign In to your Account</div>
                    </q-card-section>
                    <q-card-section>
                      <q-input filled v-model="username" label="Username">
                        <template v-slot:prepend>
                          <q-icon name="far fa-user" />
                        </template>
                      </q-input>
                      <q-input filled v-on:keyup.enter="login()" :type="isPwd ? 'password' : 'text'" class="q-pt-lg" v-model="password" label="Password">
                        <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                          />
                        </template>
                      </q-input>
                    </q-card-section>
                    <q-card-section>
                    </q-card-section>
                    <q-card-section>
                      <div class="row justify-between">
                        <div class="col-md-12 col-xs-12 col-sm-12">
                          <q-btn type="submit" unelevated rounded class="text-white my-font full-width" style="background:linear-gradient(to right, #43e97b, #38f9d7)" @click="login()" label="L o g i n" />
                        </div>
                      </div>
                    </q-card-section>
                  </div>
                </div>
              </q-form>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import LoginServices from '../../helper/services/Login'
export default {
  data () {
    return {
      username: 'direktorat',
      password: '12345678',
      isPwd: true
    }
  },
  methods: {
    login () {
      this.$showLoading()
      LoginServices.login({
        username: this.username,
        password: this.password
      })
      .finally(() => this.$hide())
      .then(res => {
        if (this.$parseResponse(res.data)) {
          LoginServices.goToHome(res.data.data, this.$router)
        }
      }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
