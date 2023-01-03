<template>
  <section class="absolute w-full inset-0">
    <div class="h-screen bg-black bg-opacity-70"></div>
    <section class="w-full h-screen absolute inset-0 flex justify-center items-center">
      <Container class="flex">
        <div class="w-80 max-w-xs">
          <img src="https://kbimages1-a.akamaihd.net/909b88f6-425d-4535-9925-8e9bcfa90f9b/1200/1200/False/harry-potter-y-la-piedra-filosofal-1.jpg" alt="">
        </div>
        <div class="w-full">
          <div class="h-[30%] p-2">
            <div>
              <button>Close</button>
            </div>
            <div class="text-center">
              Harry Potter
            </div>
          </div>
          <div class="h-[70%] p-2">
            <p>Synopsis</p>
          </div>
        </div>
      </Container>
    </section>
  </section>
</template>

<script setup>
import Container from "@/components/tags/Container.vue";

defineProps({
  bookData: {
    type: Object,
    default: {}
  }
});
</script>