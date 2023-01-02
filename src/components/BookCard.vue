<template>
  <div class="w-32">
    <img :src="bookData.imageURL"
         :alt="bookData.title + ' cover image'"
         class="mb-2 rounded shadow"
    >
    <p class="w-full capitalize text-center"
       :title="bookData.title"
    >
      {{ bookData.title }}
    </p>
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