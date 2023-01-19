<template>
    <div class="w-full absolute top-20 z-30 animate__animated">    
        <div :class="['p-2 w-11/12 mx-auto rounded shadow text-white', colorMap[alert.type]]">
            <div class="w-full">
                <XMarkIcon class="w-5 h-5 ml-auto hover:cursor-pointer" @click="closeAlert" />
            </div>
            <p>
                {{ alert.message }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

import {XMarkIcon} from "@heroicons/vue/24/outline";

const store = useStore();

const props = defineProps({
   alert: {
    type: Object,
    default: {
      type: 'success',
      message: 'Default alert',
      showAlert: false,
    }
   } 
});

const colorMap = {
    'success': 'bg-emerald-700',
    'error': 'bg-red-700'
}

onMounted(() => {
    setTimeout(() => {
        closeAlert();
    }, 2000);
});

const closeAlert = () => {
    store.commit('hideAlert');
}
</script>