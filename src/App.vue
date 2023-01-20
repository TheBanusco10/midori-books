<template>
  <Navbar />
  <Transition name="alert" enter-active-class="animate__fadeInUp" leave-active-class="animate__fadeOutDown">
    <Alert v-if="alert.showAlert" :alert="alert" />
  </Transition>
  <router-view/>
  <Footer />
</template>

<script setup>
import {computed} from "vue";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer.vue";
import Alert from "@/components/tags/Alert.vue";
import { useStore } from "vuex";

const store = useStore();

const alert = computed(() => {
  return store.getters.alert;
});
</script>