<script setup lang="ts">
const props = defineProps({
  leftImage: {
    type: String
  },
  rightImage: {
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
    <div
      :class="`grid place-items-center grid-cols-${cols}`"
      :grid="`~ cols-${cols} gap-4`"
    >
      <img
        v-motion
        :initial="{ x: -80 }"
        :enter="{ x: 0 }"
        width="300"
        :src="props.leftImage"
        :class="`col-span-${leftColSpan}`"
      />

      <img
        v-motion
        :initial="{ x: 800 }"
        :enter="{ x: 0 }"
        :src="props.rightImage"
        :class="`col-span-${leftColSpan} content-center`"
      />
    </div>
  </div>
</template>
