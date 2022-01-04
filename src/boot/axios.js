import { boot } from 'quasar/wrappers'
import axios from 'axios'

const base = 'http://192.168.43.151:4040'
// const base = 'http://172.20.10.6:4040'
const api = axios.create({ baseURL: base })

export default boot(({ app }) => {

  app.config.globalProperties.$axios = api
  app.config.globalProperties.$baseURL = base
})

export { api }
