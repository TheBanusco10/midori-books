<template>
  <nav class="sticky h-16 top-0 z-10 flex flex-wrap justify-between items-center px-3 pt-3 bg-white shadow">
    <div class="w-2/12">
      <router-link to="/">
        <img class="w-40 pb-2 ml-5 scale-150 md:scale-100 md:ml-0"
             :src="require('@/assets/img/logo-no-bg.svg')"
             alt="Midori books logo">
      </router-link>
    </div>
    <Avatar v-if="user"/>
    <button class="border-0 border-b-2 border-gray-300 p-2 mr-2 hover:border-emerald-500 transition duration-300"
            v-else
            @click="store.dispatch('signInWithGoogle')"
    >
      Sign In
    </button>
  </nav>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

import Avatar from "@/components/Avatar";
import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {auth} from "@/firebase";
import VueCookies from "vue-cookies";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();

const user = computed(() => store.getters.user);
</script>