<template>
  <div class="w-32 md:w-44 relative rounded overflow-hidden">
    <div class="group absolute md:opacity-70 md:p-1 w-full bg-black bg-opacity-75 text-white flex justify-end
    hover:opacity-100 transition duration-300"
    >
      <button @click="removeBook"
              :disabled="isLoading"
              class="md:opacity-70 group-hover:opacity-100 transition duration-300"
      >
        <TrashIcon class="p-1 w-8 h-8" />
      </button>
      <button @click="editBook"
              :disabled="isLoading"
              class="md:opacity-70 group-hover:opacity-100 transition duration-300"
      >
        <PencilSquareIcon class="p-1 w-8 h-8" />
      </button>
    </div>
    <img :src="imageLoaded ? bookData.imageURL : require('@/assets/img/default-placeholder.png')"
         :alt="bookData.title + ' cover image'"
         class="w-32 h-48 md:h-auto md:w-auto object-cover mb-2 rounded shadow-lg"
         loading="lazy"
         @load="onImageLoaded"
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
import {ref} from "vue";

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

const imageLoaded = ref(false);

const removeBook = () => {
  emit('onRemoveBook', props.bookData.id);
}

const editBook = () => {
  emit('onEditBook', props.bookData.id);
}

const onImageLoaded = () => {
  imageLoaded.value = true;
}
</script>