<template>
 <Container>
   <Searchbar class="my-4"
              :total-items="toRaw(books)"
              @results="getResults"
   />
   <div id="filters"
        class="mt-4 mb-6"
        v-if="!loading"
   >
     <Filter :total-items="toRaw(books)"
             :filter-items="uniqueBookCategories"
             @results="getResults"
             @on-remove-filters="onRemoveFilters"
             class="text-center"
     />
   </div>
   <div class="flex flex-wrap justify-center gap-4"
   >
     <Loader v-if="loading && !searching" />
     <!--User's books-->
     <BookCard v-for="(book, index) in books"
               :book-data="book"
               :key="index"
               v-if="!loading && !searching"
     />
     <!--Books searched-->
     <BookCard v-for="(book, index) in booksSearched"
               :book-data="book"
               :key="index"
               v-if="!loading && searching"
     />
   </div>
 </Container>
</template>

<script setup>
import {query, getDocs, collection, where} from "firebase/firestore";
import {useStore} from "vuex";
import {computed, onMounted, ref, toRaw} from "vue";

import Container from "@/components/tags/Container";
import {db} from "@/firebase";
import BookCard from "@/components/BookCard";
import Loader from "@/components/Loader";
import Searchbar from "@/components/Searchbar";
import Filter from "@/components/Filter.vue";

const store = useStore();
const user = computed(() => store.getters.user);
const books = ref([]);
let uniqueBookCategories = [];
const booksSearched = ref([]);

const loading = ref(true);
const searching = ref(false);

const getBooks = async () => {
  try {
    loading.value = true;
    const q = query(collection(db, 'books'), where('uid', '==', user.value.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      books.value.push(doc.data());
    });

    uniqueBookCategories = getBookCategories(books.value);

    loading.value = false;
  }catch (err) {
    console.error(err.message);
  }
}

const getResults = (results) => {
  if (results.length > 0) {
    searching.value = true;
    booksSearched.value = results;
  }else {
    searching.value = false;
  }
}

/**
 * Loops for each book and gets unique categories
 *
 * @returns Array
 */
const getBookCategories = (books) => {
  const categories = [];

  // Getting each category from each book
  books.forEach(el => {
    el.categories.filter((item) => categories.push(item));
  });

  // Removing duplicates
  return [...new Set(categories)];
}

const onRemoveFilters = () => {
  searching.value = false;
  booksSearched.value = [];
}

onMounted(() => {
  getBooks();
})
</script>