<template>
  <button :class="[{'bg-emerald-400': disabled},'rounded min-w-20 w-20 p-1 bg-emerald-600 text-white transition duration-300']"
          :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>