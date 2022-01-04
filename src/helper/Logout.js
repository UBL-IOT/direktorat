import { LocalStorage } from 'quasar'
import { boot } from 'quasar/wrappers'
import router from '../router'
export default () => {
  LocalStorage.clear()
  router().go({ name: 'loginPage' })
}
