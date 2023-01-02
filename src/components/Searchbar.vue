<template>
  <section class="w-full flex justify-center items-center">
    <div class="relative">
      <input type="text"
             class="shadow border-2 rounded-lg p-2 mr-5 pl-8 outline-none focus:border-emerald-500 hover:shadow transition duration-300"
             placeholder="Search..."
             @input="searching"
      >
      <MagnifyingGlassIcon class="w-5 h-5 absolute top-1/2 -translate-y-2/4 left-2"/>
    </div>
    <button @click="router.push('/books/add')"
            class="bg-emerald-600 shadow-lg rounded-full p-3 hover:bg-emerald-500 transition duration-300"
    >
      <PlusIcon class="w-5 h-5 text-white"/>
    </button>
  </section>
</template>

<script setup>

import {useRouter} from 'vue-router';
import {PlusIcon, MagnifyingGlassIcon} from '@heroicons/vue/24/outline';
import {ref, defineEmits, computed} from "vue";
import {useStore} from "vuex";

const router = useRouter();
const store = useStore();

const emits = defineEmits(['results']);
const props = defineProps({
  totalItems: {
    type: Array,
    default: []
  }
});

const searching = (evt) => {
  const itemSearched = evt.target.value;

  if (itemSearched.length < 2 || props.totalItems.length === 0)
    return emits('results', []);

  const results = props.totalItems.filter(el => el.title.toLocaleLowerCase().includes(itemSearched.toLocaleLowerCase()));

  emits('results', results);
}

</script>