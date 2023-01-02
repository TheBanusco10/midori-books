<template>
  <Container class="flex flex-wrap justify-center mt-10">
    <div class="w-full lg:w-2/12 mb-4 border-b lg:border-r
    lg:border-b-0 lg:border-r lg:pr-3"
    >
      <!--https://kbimages1-a.akamaihd.net/909b88f6-425d-4535-9925-8e9bcfa90f9b/1200/1200/False/harry-potter-y-la-piedra-filosofal-1.jpg-->
      <img class="w-32 mx-auto mb-4 rounded shadow" :src="book.imageURL" alt="Book image">
      <Input type="url"
             v-model="book.imageURL"
             placeholder="Image URL"
      />
    </div>
    <div class="w-full lg:w-10/12 lg:pl-3">
      <Input type="text"
             v-model="book.title"
             placeholder="Title"
      />
      <textarea placeholder="Synopsis"
                v-model="book.synopsis"
                class="w-full border rounded p-2 mb-4 h-33 max-h-44 focus:outline-none focus:border-emerald-500
                transition duration-300"
      ></textarea>
      <Input type="text"
             v-model="book.author"
             placeholder="Author"
      />
      <multiselect v-model="book.categories"
                   placeholder="Category"
                   :options="categories"
                   mode="multiple"
                   :searchable="true"
      >
        <template v-slot:multiplelabel="{ values }">
          <div class="multiselect-multiple-label">
            <span v-for="(item, index) in values"
                  class="bg-gray-300 rounded mr-2 p-1"
                  :key="index"
            >
              {{ item.value }}
            </span>
          </div>
        </template>
      </multiselect>
      <button @click="addBook"
              :class="[loading ? 'opacity-50 pointer-events-none' : '', `w-full mt-4 text-white p-2 rounded bg-emerald-500
              hover:bg-emerald-600 transition duration`]"
              :disabled="loading"
      >Add</button>
    </div>
  </Container>
</template>

<script setup>
import {computed, ref} from "vue";
import {addDoc, collection} from "firebase/firestore";
import {useStore} from "vuex";
import {db} from "@/firebase";
import Multiselect from "@vueform/multiselect";

import Container from "@/components/tags/Container";
import Input from "@/components/tags/Input";

const store = useStore();

const user = computed(() => store.getters.user);
const categories = [
  'Adventure stories',
  'Classics',
  'Crime',
  'Fairy tales, fables, and folk tales',
  'Fantasy',
  'Historical fiction',
  'Horror',
  'Humour and satire',
  'Literary fiction',
  'Mystery',
  'Poetry',
  'Plays',
  'Romance',
  'Science fiction',
  'Short stories',
  'Thrillers',
  'War',
];
const book = ref({
  title: '',
  author: '',
  imageURL: '',
  synopsis: '',
  categories: []
});
const loading = ref(false);

const addBook = async () => {
  try {
    // Loading
    loading.value = true;

    const data = await addDoc(collection(db, 'books'), {
      ...book.value,
      uid: user.value.uid
    });

    alert(`Book ${data.id} stored`);

    // Empty book data
    book.value.title = '';
    book.value.author = '';
    book.value.imageURL = '';
    book.value.synopsis = '';
    book.value.categories = [];
    // Loading to false
    loading.value = false;
  }catch (err) {
    console.error(err.message);
  }
}
</script>