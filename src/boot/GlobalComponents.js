import { boot } from 'quasar/wrappers'
// "async" is optional;
// import { CAlert } from '@coreui/vue'
// import CoreuiVue from '@coreui/vue'
// import { CIcon } from '@coreui/icons-vue'
// console.log(CAlert)
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
import Plugin from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'
export default boot(async ({ app }) => {
  // something to do
  // app.config.globalProperties.$myref = ref
  // app.component('CAlert', CAlert)
  // app.use(CoreuiVue)
  app.use(Plugin)
})
