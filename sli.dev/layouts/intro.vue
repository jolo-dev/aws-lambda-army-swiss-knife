<script setup lang="ts">
const props = defineProps({
  introImage: {
    type: String
  },
  subtitle: {
    type: String
  }
})
</script>

<template>
  <div class="slidev-layout intro">
    <div grid="~ cols-3" class="items-center">
      <div class="col-span-2">
        <img m="b-5" src="/img/logo.png" width="120" />
        <slot />
        <div v-click="2" class="slidev-vclick-target slidev-vclick-hidden">
          <h3>{{ props.subtitle }}</h3>
        </div>
      </div>
      <div v-click="1" class="slidev-vclick-target slidev-vclick-hidden">
        <img :src="props.introImage" width="250" />
      </div>
    </div>
  </div>
</template>
