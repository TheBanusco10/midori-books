<template>
  <div class="home">
    <button @click="signInWithGoogle">Sign in</button>
  </div>
</template>

<script setup>
import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";

import {auth} from "@/firebase";
import VueCookies from "vue-cookies";
import {useStore} from "vuex";

const store = useStore();

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
  }catch (err) {
    console.error(err.message);
  }
}

const signOutApp = async () => {
  try {
    await signOut(auth);

    VueCookies.remove('midori-books');
  }catch (err) {
    console.error(err.message);
  }
}

</script>
