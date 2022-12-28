<template>
  <div class="home">
    <button @click="signInWithGoogle">Sign in</button>
  </div>
</template>

<script setup>
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";

import {auth} from "@/firebase";
import VueCookies from "vue-cookies";

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    const {uid, displayName, photoURL} = (await signInWithPopup(auth, provider)).user;
    // uid, displayName, photoURL
    VueCookies.set('midori', {uid, displayName, photoURL}, '1d');
  }catch (err) {
    console.error(err.message);
  }
}

</script>
