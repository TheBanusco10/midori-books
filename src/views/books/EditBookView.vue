<template>
  <Header :title="book.title" />
  <Container class="flex flex-wrap justify-center mt-10">
    <div class="w-full lg:w-2/12 mb-4 border-b lg:border-r
    lg:border-b-0 lg:border-r lg:pr-3"
    >
      <!--https://kbimages1-a.akamaihd.net/909b88f6-425d-4535-9925-8e9bcfa90f9b/1200/1200/False/harry-potter-y-la-piedra-filosofal-1.jpg-->
      <img class="w-32 h-48 mx-auto mb-4 rounded shadow object-cover"
           :src="book.imageURL || require('@/assets/img/default-placeholder.png')"
           alt="Book image"
           @error="onImageError"
      >
      <Input type="url"
             v-model="book.imageURL"
             :value="book.imageURL"
             placeholder="Image URL"
             class="!mb-2"
      />
      <span class="inline-block text-sm text-gray-500 mb-3 pl-1 italic">Paste your image URL here</span>
    </div>
    <div class="w-full lg:w-10/12 lg:pl-3">
      <Input type="text"
             v-model="book.title"
             placeholder="Title"
             :value="book.title"
      />
      <textarea placeholder="Synopsis"
                v-model="book.synopsis"
                class="w-full border rounded p-2 mb-4 h-44 max-h-44 focus:outline-none focus:border-emerald-500
                transition duration-300"
      ></textarea>
      <Input type="text"
             v-model="book.author"
             placeholder="Author"
             :value="book.author"
      />
      <multiselect v-model="book.categories"
                   placeholder="Category"
                   :options="bookCategories"
                   mode="multiple"
                   :searchable="true"
                   :value="book.categories"
      >
        <template v-slot:multiplelabel="{ values }">
          <div class="multiselect-multiple-label whitespace-nowrap overflow-hidden">
            <span v-for="(item, index) in values"
                  class="bg-gray-300 rounded mr-2 p-1"
                  :key="index"
            >
              {{ item.value }}
            </span>
          </div>
        </template>
      </multiselect>
      <button @click="updateBookByID(bookID, toRaw(book))"
              :class="[loading ? 'opacity-50 pointer-events-none' : '', `w-full my-4 text-white p-2 rounded bg-emerald-500
              hover:bg-emerald-600 transition duration`]"
              :disabled="loading"
      >Edit</button>
    </div>
  </Container>
</template>

<script setup>
import {getDoc, doc, updateDoc} from "firebase/firestore";
import {useRoute, useRouter} from "vue-router";
import {computed, onBeforeMount, ref, toRaw} from "vue";
import {db} from "@/firebase";
import {useStore} from "vuex";

import Container from "@/components/tags/Container.vue";
import Header from "@/components/tags/Header.vue";
import Input from "@/components/tags/Input.vue";
import Multiselect from "@vueform/multiselect";
import {isEmpty, isNull} from "lodash/lang";

const store = useStore();
const route = useRoute();
const router = useRouter();

const bookID = route.params.id;
const book = ref({});
const bookCategories = computed(() => store.getters.bookCategories);
const loading = ref(false);

onBeforeMount(async () => {
  try {
    book.value = await getBookByID(bookID);
    if (!book.value) {
      await router.push({name: 'books'});
    }
  }catch (err) {
    console.error(err.message);
  }
});

/**
 * Returns book by ID. If book does not exist, returns null
 *
 * @param bookID
 * @returns {Promise<DocumentData|null>}
 */
const getBookByID = async (bookID) => {
  try {
    const docRef = doc(db, 'books', bookID);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data();
  }catch (err) {
    console.error(err.message);
  }
}

/**
 * TODO: change these functions to helper.js and return true or false if the book is updated successfully
 * Updates book by ID
 *
 * @param bookID
 * @param newBook
 * @returns {Promise<void>}
 */
const updateBookByID = async (bookID, newBook) => {
  try {
    if (isNull(bookID) || isEmpty(newBook)) return;

    await updateDoc(doc(db, 'books', bookID), newBook);

    await router.push({name: 'books'});
    alert('Book updated')
  }catch (err) {
    console.error(err.message);
  }
}

const onImageError = () => {
  alert('URL not valid. Please, try another one');
  book.value.imageURL = null;
}
</script>