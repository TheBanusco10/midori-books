<template>
  <Container class="flex flex-wrap justify-center mt-10">
    <div class="w-full lg:w-2/12">
      <img class="w-32 mx-auto" src="https://kbimages1-a.akamaihd.net/909b88f6-425d-4535-9925-8e9bcfa90f9b/1200/1200/False/harry-potter-y-la-piedra-filosofal-1.jpg" alt="">
      <input type="url"
             v-model="book.imageURL"
             placeholder="Image URL"
      >
    </div>
    <div class="w-full lg:w-10/12">
      <input type="text"
             v-model="book.title"
             placeholder="Title"
      >
      <input type="text"
             v-model="book.author"
             placeholder="Author"
      >
      <button>Add</button>
    </div>
  </Container>
</template>

<script setup>
import Container from "@/components/tags/Container";
import {ref} from "vue";

const book = ref({
  title: '',
  author: '',
  imageURL: null,
});
</script>