<template>
  <div class="w-32 relative">
    <div class="absolute w-full bg-black bg-opacity-75 text-white flex justify-end rounded-t">
      <button @click="removeBook"
              :disabled="isLoading"
      >
        <TrashIcon class="p-1 w-7 h-7" />
      </button>
      <button @click="editBook"
              :disabled="isLoading"
      >
        <PencilSquareIcon class="p-1 w-7 h-7" />
      </button>
    </div>
    <img :src="bookData.imageURL"
         :alt="bookData.title + ' cover image'"
         class="mb-2 rounded shadow"
         loading="lazy"
    >
    <p class="w-full capitalize text-center"
       :title="bookData.title"
    >
      {{ bookData.title }}
    </p>
  </div>
</template>

<script setup>
import {TrashIcon, PencilSquareIcon} from "@heroicons/vue/24/outline";

const emit = defineEmits(['onRemoveBook', 'onEditBook'])
const props = defineProps({
  bookData: {
    type: Object,
    default: {
      title: '',
      imageURL: '',
    }
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const removeBook = () => {
  console.log('Removing book', props.bookData.id);
  emit('onRemoveBook', props.bookData.id);
}

const editBook = () => {
  console.log('Editing book', props.bookData.id);
  emit('onEditBook', props.bookData.id);
}
</script>