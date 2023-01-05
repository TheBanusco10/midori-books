<template>
  <nav class="flex flex-wrap justify-between items-center px-3 pt-3 bg-white shadow">
    <h1 class="w-2/12">Logo</h1>
    <Avatar v-if="user"/>
    <button class="border-0 border-b-2 border-gray-300 p-2 mr-2 hover:border-emerald-500 transition duration-300"
            v-else
            @click="signInWithGoogle"
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

const signInWithGoogle = async () => {
  if (store.getters.user) return;

  try {
    const provider = new GoogleAuthProvider();

    const {uid, displayName, photoURL} = (await signInWithPopup(auth, provider)).user;

    const userObject = {
      uid, displayName, photoURL
    }

    VueCookies.set('midori-books', userObject, '1d');
    store.commit('setUser', userObject);

    await router.push({name: 'books'});
  }catch (err) {
    console.error(err.message);
  }
}
</script>