<template>
  <input class="border rounded p-2"
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
  console.log('updating', evt);
  emmit('update:modelValue', evt.target.value);
}
</script>