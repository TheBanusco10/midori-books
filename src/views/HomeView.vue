<template>
  <section class="relative">
    <img class="brightness-50 h-80 lg:w-full lg:h-screen"
         :src="require('@/assets/img/books-banner.webp')"
         alt="Banner"
    >
    <div class="absolute w-full h-full text-center font-thin flex justify-center flex-col pl-4 top-0 text-white text-xl">
      <img class="w-[20rem] pb-2 mx-auto border-b border-b-white"
           :src="require('@/assets/img/logo-white-no-bg.png')"
           alt="Midori books logo"
      >
      <p class="mt-6 uppercase">Manage all your books with a few clicks</p>
      <button v-if="!user"
              class="w-40 mx-auto mt-10 p-1 text-white border border-white hover:bg-white hover:text-black
              transition duration-300"
              @click="store.dispatch('signInWithGoogle')"
      >
        See more
      </button>
      <router-link v-else
                   to="/books"
                   class="w-40 mx-auto mt-10 p-1 text-white border border-white
                   hover:bg-white hover:text-black transition duration-300"
      >
        See my books
      </router-link>
    </div>
  </section>
  <Container class="flex flex-wrap justify-center text-center">
    <Card class="w-7/12 m-4 lg:my-10 lg:w-2/12">
      <div>
        <BookOpenIcon class="w-10 h-10 mx-auto" />
      </div>
      <div class="p-2">
        <p>Manage your books easily. Choose the title, author, categories and much more. Filter by categories and see
        how many books you have read.</p>
      </div>
    </Card>
    <Card class="w-7/12 m-4 lg:my-10 lg:w-2/12">
      <div>
        <DevicePhoneMobileIcon class="w-10 h-10 mx-auto" />
      </div>
      <div class="p-2">
        <p>Midori Books is a PWA. A web application that you can "install" on your device (mobile, desktop) without any
        disk space usage, and it only takes a few seconds to install it. Bring all your books information with you wherever
        you are.</p>
      </div>
    </Card>
  </Container>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

import {BookOpenIcon, DevicePhoneMobileIcon} from "@heroicons/vue/24/outline";
import Container from "@/components/tags/Container.vue";
import Card from "@/components/tags/Card.vue";

const store = useStore();

const user = computed(() => store.getters.user);
</script>
