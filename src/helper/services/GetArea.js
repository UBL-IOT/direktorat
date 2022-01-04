import { api } from '../../boot/axios'
class GetArea {
  getProv () {
    return api.get('wilayah/provinsi')
  }
  getKab (id) {
    return api.get(`wilayah/kabupaten/${id}`)
  }
  getKec (id) {
    return api.get(`wilayah/kecamatan/${id}`)
  }
  getDesa (id) {
    return api.get(`wilayah/kelurahan/${id}`)
  }
}
export default new GetArea()