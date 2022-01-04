import { boot } from 'quasar/wrappers'
import { createToken } from './CreateToken'

export default boot(async ({ app }) => {
  app.config.globalProperties.$createPaginate = (propsPaginate, id = null) => {
    const { page, rowsPerPage, rowsNumber } = propsPaginate.pagination
    const filter = propsPaginate.filter
    const params = {
      page: Number(page),
      filter: filter,
      rowsPerPage: rowsPerPage === 0 ? rowsNumber : rowsPerPage,
      id: id
    }
    return createToken(params)
  }
})
