<template>
  <input class="w-full border rounded p-2 mb-4 focus:outline-none focus:border-emerald-500 transition duration-300"
         @input="updateInput"
         :value="modelValue"
  >
</template>

<script setup>
const emmit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const updateInput = (evt) => {
  emmit('update:modelValue', evt.target.value);
}
</script>