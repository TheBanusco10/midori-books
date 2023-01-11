<template>
  <section class="h-20 p-2 bg-emerald-700 rounded-b-3xl text-white">
    <div class="relative z-10">
      <button>
        <ArrowLeftIcon class="p-1 w-7 h-7 rounded-full hover:bg-gray-100 hover:bg-opacity-20 transition duration-300"
                       @click="router.back()"
        />
      </button>
    </div>
    <div>
      <p class="text-center text-2xl -mt-3">
        {{ title }}
      </p>
    </div>
  </section>
</template>

<script setup>
import {ArrowLeftIcon} from "@heroicons/vue/24/outline";
import {useRouter} from "vue-router";

defineProps({
  title: {
    type: String,
    default: '',
    required: true
  }
})

const router = useRouter();
</script>