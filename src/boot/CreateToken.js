import { boot } from 'quasar/wrappers'
// import createToken from './tokenfunc'
import { parseProfile } from './ParseProfile'
const createToken = (params = {}) => {
  return {
    headers: {
      Authorization: `Bearer ${parseProfile() ? parseProfile().token : null}`
    },
    params: params
  }
}

export default boot(async ({ app }) => {
  app.config.globalProperties.$createToken = createToken
})

export { createToken }
