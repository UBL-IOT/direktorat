import Vue from 'vue'
import { LocalStorage } from 'quasar'
import { api } from '../../boot/axios'
class LoginServices {
  login (data) {
    return api.post('users/login', data)
  }

  goToHome (data, router) {
    this.setSession(data)
    router.push({ name: 'dashboardAdmin' })
  }

  setSession (data) {
    LocalStorage.set('datauser', data)
  }
}

export default new LoginServices()
