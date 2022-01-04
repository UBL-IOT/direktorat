<template>
  <q-item clickable v-ripple class="text-white" :to="{name: to}" active-class="active">
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      {{ label }}
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  props: {
    label: String,
    icon: String,
    to: String,
  }
}
</script>