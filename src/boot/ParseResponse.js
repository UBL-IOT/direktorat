import { boot } from 'quasar/wrappers'
import { notif } from './Notify'
import logout from '../helper/Logout'
export default boot(async ({ app }) => {
  app.config.globalProperties.$parseResponse = (res) => {
    if (res.status) {
      return true
    } else {
      if (res.code === 401) {
        notif(res.message, 'negative')
        logout()
        return false
      } else {
        notif(res.message, 'negative')
        return false
      }
    }
  }
})
