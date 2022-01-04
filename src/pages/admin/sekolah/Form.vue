<template>
  <q-form @submit="sumbit">
    <q-card flat>
      <q-card-section>
        <q-input
          v-model="form.NPSN"
          label="Nomor Pokok Sekolah Nasional"
          :rules="[
            val => val !== null || 'Mohon Isi NPSN'
          ]"
        />
        <q-input
          v-model="form.INSTITUSI_NAME"
          label="Nama Institusi"
          :rules="[
            val => val !== null || 'Mohon Isi Nama'
          ]"
        />
        <q-select
          v-model="form.INSTITUSI_TYPE"
          label="Tipe Institusi"
          :options="optTipe"
          :rules="[
            val => val !== null || 'Mohon Pilih Tipe'
          ]"
        />
        <q-select
          v-model="form.INSTITUSI_STATUS"
          label="Status Institusi"
          :options="optStatus"
          :rules="[
            val => val !== null || 'Mohon Pilih Status'
          ]"
        />
        <q-select
          v-model="form.INSTITUSI_AREA.PROVINSI"
          label="Provinsi"
          :options="listProv"
          option-value="id"
          use-input
          option-label="name"
          @update:model-value="getKab"
          @filter="filterProv"
          :rules="[
            val => val !== null || 'Mohon Pilih Provinsi'
          ]"
        />
        <q-select
          v-model="form.INSTITUSI_AREA.KABUPATEN"
          label="Kabupaten"
          :options="listKab"
          option-value="id"
          use-input
          option-label="name"
          @filter="filterKab"
          @update:model-value="getKec"
          :rules="[
            val => val !== null || 'Mohon Pilih Kabupaten'
          ]"
        />
        <q-select
          v-model="form.INSTITUSI_AREA.KECAMATAN"
          label="Kecamatan"
          :options="listKec"
          option-value="id"
          use-input
          option-label="name"
          @update:model-value="getDesa"
          @filter="filterKec"
          :rules="[
            val => val !== null || 'Mohon Pilih Kecamatan'
          ]"
        />
        <q-select
          v-model="form.INSTITUSI_AREA.KELURAHAN"
          label="Desa"
          :options="listDesa"
          option-value="id"
          use-input
          option-label="name"
          @filter="filterDesa"
          :rules="[
            val => val !== null || 'Mohon Pilih Desa'
          ]"
        />
        <q-input
          v-model="form.INSTITUSI_AREA.ALAMAT"
          label="Alamat Lengkap"
          type="textarea"
          :rules="[
            val => val !== null || 'Mohon Isi Alamat'
          ]"
        />
        <q-input
          v-model="form.INSTITUSI_AREA.POS_CODE"
          label="Kode Pos"
          type="number"
          :rules="[
            val => val !== null || 'Mohon Isi Kode Pos'
          ]"
        />
        <q-file accept=".jpg, image/*" color="teal" v-model="image" label="Upload Gambar">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Simpan Data"
          class="full-width"
          unelevated
          color="primary"
          type="submit"
        />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script>
import GetArea from '../../../helper/services/GetArea'
const model = () => {
  return {
    INSTITUSI_NAME: null,
    NPSN: null,
    INSTITUSI_TYPE: null,
    INSTITUSI_STATUS: null,
    INSTITUSI_AREA: {
      PROVINSI: null,
      KABUPATEN: null,
      KECAMATAN: null,
      KELURAHAN: null,
      ALAMAT: null,
      POS_CODE: null
    },
    INSTITUSI_IMAGE: null
  }
}
let listProv = [],
listKab = [],
listKec = [],
listDesa = []
export default {
  props: {
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      nama: '',
      image: null,
      form: model(),
      optTipe: [
        'SMA',
        'SMK',
        'MA',
        'Lainya/Sederajat'
      ],
      optStatus: [
        'Negeri',
        'Swasta'
      ],
      listProv: listProv,
      listKab: listKab,
      listKec: listKec,
      listDesa: listDesa
    }
  },
  async created () {
    this.$showLoading()
    if (this.editMode) {
      await this.$axios.get(`institusi/getbyid/${this.$route.params.id}`, this.$createToken())
        .then(async res => {
          if (this.$parseResponse(res.data)) {
            this.form = res.data.data
            await this.getKab(false)
          }
        })
        .catch(() => this.$commonErrorNotif())
    }
    await GetArea.getProv()
      .then(res => {
        if (this.$parseResponse(res.data)) {
          listProv = res.data.data
        }
      })
      .catch(() => this.$commonErrorNotif())
    this.$hide()
  },
  methods: {
    sumbit () {
      this.$showLoading()
      const formData = new FormData()
      if (this.editMode) {
        if (this.image) {
          formData.append('image', this.image)
        }
        formData.append('data', JSON.stringify(this.form))
        this.$axios.put(`institusi/${this.$route.params.id}`, formData, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.$successNotif(res.data.message)
              this.$router.back()
            }
          }).catch(() => this.$commonErrorNotif())
      } else {
        if (this.image) {
          formData.append('image', this.image)
        }
        formData.append('data', JSON.stringify(this.form))
        this.$axios.post('institusi/create', formData, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.$successNotif(res.data.message)
              this.$router.back()
            }
          }).catch(() => this.$commonErrorNotif())
      }
    },
    async getKab (reset = true) {
      reset ? this.resetKab() : null
      this.$showLoading()
      GetArea.getKab(this.form.INSTITUSI_AREA.PROVINSI.id)
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            listKab = res.data.data
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getKec (reset = true) {
      reset ? this.resetKec() : null
      this.$showLoading()
      GetArea.getKec(this.form.INSTITUSI_AREA.KABUPATEN.id)
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            listKec = res.data.data
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getDesa (reset = true) {
      reset ? this.resetDesa() : null
      this.$showLoading()
      GetArea.getDesa(this.form.INSTITUSI_AREA.KECAMATAN.id)
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            listDesa = res.data.data
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    resetKab () {
      this.form.INSTITUSI_AREA.KABUPATEN = null
      this.resetKec()
    },
    resetKec () {
      this.form.INSTITUSI_AREA.KECAMATAN = null
      this.resetDesa()
    },
    resetDesa () {
      this.form.INSTITUSI_AREA.KELURAHAN = null
    },
    filterProv (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.listProv = listProv.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterKab (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.listKab = listKab.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterKec (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.listKec = listKec.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterDesa (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.listDesa = listDesa.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
