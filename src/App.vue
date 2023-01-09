<template>
  <Navbar />
  <router-view/>
  <Footer />
</template>

<script setup>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer.vue";
</script>