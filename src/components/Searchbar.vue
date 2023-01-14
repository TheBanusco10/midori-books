<template>
  <div class="relative">
    <input type="text"
           class="w-full shadow border-2 rounded-lg p-2 pl-8 outline-none md:w-auto md:mr-5 focus:border-emerald-500 hover:shadow transition duration-300"
           placeholder="Search for Title or Author"
           @input="searching"
    >
    <MagnifyingGlassIcon class="w-5 h-5 absolute top-1/2 -translate-y-2/4 left-2"/>
  </div>
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

  const results = props.totalItems.filter(el =>
      el.title.toLocaleLowerCase().includes(itemSearched.toLocaleLowerCase()) ||
      el.author.toLocaleLowerCase().includes(itemSearched.toLocaleLowerCase())
  );

  emits('results', results);
}

</script>