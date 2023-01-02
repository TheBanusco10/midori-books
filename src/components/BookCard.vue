<template>
  <div>
    <img :src="bookData.imageURL"
         :alt="bookData.title + ' cover image'"
         class="w-32 mx-auto mb-4 rounded shadow"
    >
    <h2>
      {{ bookData.title }}
    </h2>
  </div>
</template>

<script setup>
defineProps({
  bookData: {
    type: Object,
    default: {
      title: '',
      imageURL: '',
    }
  }
});
</script>