<template>
  <section class="relative">
    <img class="w-full h-[calc(100vh-4rem)] brightness-50 object-cover"
         :src="require('@/assets/img/books-banner.webp')"
         alt="Banner"
    >
    <div class="absolute w-full h-full text-center font-thin flex justify-between flex-col pl-4 top-0 text-white text-xl">
      <section class="h-full flex flex-col justify-center">
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
      </section>
    </div>
  </section>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();

const user = computed(() => store.getters.user);
</script>
