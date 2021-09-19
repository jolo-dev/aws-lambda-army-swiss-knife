<script setup lang="ts">
const props = defineProps({
  image: {
    type: String
  },
  leftColSpan: {
    type: Number
  },
  rightColSpan: {
    type: Number
  }
})
const leftColSpan: number = props.leftColSpan ?? 1
const rightColSpan: number = props.rightColSpan ?? 1
const cols: number = leftColSpan + rightColSpan
</script>

<template>
  <div class="slidev-layout">
    <div class="grid place-items-center" :grid="`~ cols-${cols} gap-4`">
      <img
        v-motion
        :initial="{ x: -80 }"
        :enter="{ x: 0 }"
        width="300"
        :src="props.image"
        :class="`col-span-${leftColSpan}`"
      />

      <div
        v-motion
        :initial="{ x: 800 }"
        :enter="{ x: 0 }"
        :class="`col-span-${leftColSpan} content-center`"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
