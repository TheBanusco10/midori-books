<template>
  <section>
    <span class="p-1"
    >
      <FunnelIcon class="inline-block w-5 h-5" />
    </span>
    <span v-for="(item, index) in filterItems"
          :key="index"
          @click="filter(item, index)"
          :class="[selected === index ? 'bg-emerald-600 text-white rounded' : '', 'p-1 cursor-pointer border-r transition-all duration-300']"
    >
      {{ item }}
    </span>
    <span class="p-1 cursor-pointer"
          @click="removeFilters"
          v-if="selected !== null"
    >
      <XMarkIcon class="inline-block w-6 h-6 rounded-full border border-emerald-500 p-1 hover:text-white hover:bg-emerald-500 transition duration-300" />
    </span>
  </section>
</template>

<script setup>
import {ref} from "vue";

import {XMarkIcon, FunnelIcon} from "@heroicons/vue/24/outline";

const props = defineProps({
  totalItems: {
    type: Array,
    default: []
  },
  filterItems: {
    type: Array,
    default: []
  }
});

const emit = defineEmits(['results', 'onRemoveFilters']);

const selected = ref(null);

const filter = (item, index) => {
  selected.value = index;

  const results = props.totalItems.filter(el => el.categories.includes(item));

  emit('results', results);
}

const removeFilters = () => {
  selected.value = null;
  emit('onRemoveFilters', true);
}

</script>