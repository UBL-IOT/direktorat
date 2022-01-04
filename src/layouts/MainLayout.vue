<template>
  <q-layout view="lHh Lpr lFf">
    <q-header unelevated bordered class="bg-white">
      <q-toolbar class="bg-white">
        <q-btn
          flat
          dense
          round
          color="dark"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer()"
        />

        <q-toolbar-title class="text-dark">
          Title
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
        <q-btn flat round dense style="font-size: 20px;">
          <q-avatar round>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>
                </q-item-section>
              </q-item>
              <q-separator></q-separator>
              <q-item clickable>
                <q-item-section side>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>Profil Anda</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section side>
                  <q-icon name="fas fa-key" />
                </q-item-section>
                <q-item-section>Ubah Password</q-item-section>
              </q-item>
              <q-item clickable @click="logout()">
                <q-item-section side>
                  <q-icon name="fas fa-sign-out-alt" />
                </q-item-section>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-sidebar"
      bordered
    >
      <q-list>
        <q-item class="justify-center text-center q-mt-lg q-pt-md">
          <div>
            <q-avatar size="75px" class="q-mb-md">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">aaaa</div>
            <div>xxxx</div>
          </div>
        </q-item>
        <q-item-label
          header
        >
          Main Menu
        </q-item-label>
        <!-- <div> -->
          <my-menu
            :icon="m.icon"
            :label="m.label"
            :to="m.to"
            v-for="(m, i) in listMenu" :key="i"
          />
        <!-- </div> -->
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import myMenu from '../components/Menu.vue'
import listMenu from './menu/MenuAdmin'
import logout from '../helper/Logout'
export default {
  components: {
    myMenu
  },
  data () {
    return {
      leftDrawerOpen: false,
      listMenu
    }
  },
  methods: {
    logout,
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
}
</script>
