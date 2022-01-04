<template>
  <q-page padding>
    <div>
      <q-table
        flat
        title="Treats"
        :rows="rows"
        :filter="filter"
        :columns="columns"
        :loading="loading"
        row-key="name"
        @request="onRequest"
        :pagination="pagination"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            label="Tambah"
            class="q-ml-sm"
            unelevated
            :to="{name: 'insertDataSekolahAdmin'}"
            color="primary"
            icon="add"
          />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="gambar" :props="props">
              <q-avatar square size="70px">
                <img :src="`${$baseURL}/image/${props.row.INSTITUSI_IMAGE}`" alt="">
              </q-avatar>
            </q-td>
            <q-td key="NPSN" :props="props">
              {{ props.row.NPSN }}
            </q-td>
            <q-td key="INSTITUSI_NAME" :props="props">
              {{ props.row.INSTITUSI_NAME }}
            </q-td>
            <q-td key="INSTITUSI_TYPE" :props="props">
              {{ props.row.INSTITUSI_TYPE }}
            </q-td>
            <q-td key="INSTITUSI_STATUS" :props="props">
              {{ props.row.INSTITUSI_STATUS }}
            </q-td>
            <q-td key="PROVINSI" :props="props">
              {{ props.row.INSTITUSI_AREA.PROVINSI.name }}
            </q-td>
            <q-td key="KABUPATEN" :props="props">
              {{ props.row.INSTITUSI_AREA.KABUPATEN.name }}
            </q-td>
            <q-td key="KECAMATAN" :props="props">
              {{ props.row.INSTITUSI_AREA.KECAMATAN.name }}
            </q-td>
            <q-td key="KELURAHAN" :props="props">
              {{ props.row.INSTITUSI_AREA.KELURAHAN.name }}
            </q-td>
            <q-td key="ALAMAT" :props="props">
              {{ props.row.INSTITUSI_AREA.ALAMAT }}
            </q-td>
            <q-td key="POS_CODE" :props="props">
              {{ props.row.INSTITUSI_AREA.POS_CODE }}
            </q-td>
            <q-td key="aksi" :props="props">
              <div class="justify-center q-gutter-x-xs">
                <q-btn
                  label="Edit"
                  color="warning"
                  unelevated
                  :to="{name: 'editDataSekolahAdmin', params: {id: props.row.GUID}}"
                />
                <q-btn
                  label="Hapus"
                  color="negative"
                  unelevated
                  @click="deleteImage(props.row.GUID)"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      filter: null,
      loading: true,
      columns: [
        { name: 'gambar', label: 'Gambar', field: 'gambar', align: 'left'},
        { name: 'NPSN', label: 'NPSN', field: 'NPSN', align: 'left' },
        { name: 'INSTITUSI_NAME', label: 'Nama', field: 'INSTITUSI_NAME', align: 'left' },
        { name: 'INSTITUSI_TYPE', label: 'Tipe', field: 'INSTITUSI_TYPE', align: 'left' },
        { name: 'INSTITUSI_STATUS', label: 'Status', field: 'INSTITUSI_STATUS', align: 'left' },
        { name: 'PROVINSI', label: 'PROVINSI', field: 'PROVINSI', align: 'left' },
        { name: 'KABUPATEN', label: 'KABUPATEN', field: 'KABUPATEN', align: 'left' },
        { name: 'KECAMATAN', label: 'KECAMATAN', field: 'KECAMATAN', align: 'left' },
        { name: 'KELURAHAN', label: 'KELURAHAN', field: 'KELURAHAN', align: 'left' },
        { name: 'ALAMAT', label: 'ALAMAT', field: 'ALAMAT', align: 'left' },
        { name: 'POS_CODE', label: 'Kode Pos', field: 'POS_CODE', align: 'left' },
        { name: 'aksi', label: 'Aksi', field: 'aksi', align: 'left' },
      ],
      rows: [],
      pagination: {
        sortBy: 'GUID',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    onRequest (props) {
      this.loading = false
      this.$axios.get('institusi', this.$createPaginate(props))
        .finally(() => {this.loading = false})
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.rows = res.data.result
            this.pagination = res.data.paginate
          }
        }).catch(() => this.commonErrorNotif())
    },
    deleteImage (id) {
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Apakah Anda Yakin ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$showLoading()
        this.$axios.delete(`institusi/${id}`, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.$successNotif(res.data.message)
              this.getData()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    }
  }
}
</script>
