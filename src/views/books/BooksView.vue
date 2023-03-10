<template>
  <Header title="Your books" />
  <Container>
   <section class="w-full flex justify-center items-center">
     <Searchbar class="w-full my-4 md:w-auto"
                :total-items="toRaw(books)"
                @results="getResults"
     />
     <button @click="router.push('/books/add'); scrollToTop()"
             class="bg-emerald-600 shadow-lg rounded-full p-3 fixed bottom-4 right-4 md:relative md:inset-0 hover:bg-emerald-500 transition duration-300 z-20"
     >
       <PlusIcon class="w-5 h-5 text-white"/>
     </button>
   </section>
   <div id="filters"
        class="mt-4 mb-6"
        v-if="!loadingBooks && books.length !== 0"
   >
     <Filter :total-items="toRaw(books)"
             :filter-items="uniqueBookCategories"
             @results="getResults"
             @on-remove-filters="onRemoveFilters"
             />
   </div>
   <Badge class="my-4 text-center">
     <template v-slot:title>Total books</template>
     <template v-slot:badge>{{ books.length }}</template>
   </Badge>
   <div class="flex flex-wrap justify-center gap-4"
   >
     <Loader v-if="loadingBooks && !searching" />
     <!--User's books-->
     <BookCard v-for="(book, index) in books"
               :book-data="book"
               :is-loading="loadingAction"
               :key="index"
               v-if="!loadingBooks && !searching"
               @on-remove-book="onRemoveBook"
               @on-edit-book="onEditBook"
     />
     <!--Books searched-->
     <BookCard v-for="(book, index) in booksSearched"
               :book-data="book"
               :is-loading="loadingAction"
               :key="index"
               v-if="!loadingBooks && searching"
               @on-remove-book="onRemoveBook"
               @on-edit-book="onEditBook"
     />
   </div>
 </Container>
</template>

<script setup>
import {query, getDocs, collection, where, doc, deleteDoc, getDoc} from "firebase/firestore";
import {useStore} from "vuex";
import {computed, getCurrentInstance, onMounted, ref, toRaw} from "vue";

import Container from "@/components/tags/Container.vue";
import {db} from "@/firebase";
import BookCard from "@/components/BookCard.vue";
import Loader from "@/components/Loader.vue";
import Searchbar from "@/components/Searchbar.vue";
import Filter from "@/components/Filter.vue";
import {PlusIcon} from "@heroicons/vue/24/outline";
import {useRouter} from "vue-router";
import Badge from "@/components/tags/Badge.vue";
import Header from "@/components/tags/Header.vue";

const router = useRouter();
const store = useStore();

const user = computed(() => store.getters.user);
const books = computed(() => {
  return store.getters.books;
});
let uniqueBookCategories = [];
const booksSearched = ref([]);

const loadingBooks = ref(true);
const loadingAction = ref(false);
const searching = ref(false);

const scrollToTop = getCurrentInstance().appContext.config.globalProperties.$scrollToTop;

const getBooks = async () => {
  try {
    loadingBooks.value = true;
    store.commit('setBooks', []);
    const q = query(collection(db, 'books'), where('uid', '==', user.value.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      store.commit('addBook', {
        ...doc.data(),
        id: doc.id
      });
    });

    uniqueBookCategories = getBookCategories(books.value);

    loadingBooks.value = false;
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
 * @param books
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

/**
 * Removes a book from Firestore by ID
 *
 * @param bookID
 * @returns {Promise<void>}
 */
const removeBook = async (bookID) => {
  try {
    const bookRef = doc(db, 'books', bookID);
    const book = getDoc(bookRef);

    if (!(await book).exists()) return;

    await deleteDoc(bookRef);
  }catch (err) {
    console.error(err.message);
  }
}

const onRemoveFilters = () => {
  searching.value = false;
  booksSearched.value = [];
}

const onRemoveBook = async (bookID) => {
  try {
    loadingAction.value = true;

    const removingBook = confirm('Are you sure you want to remove the book with ID '+bookID+' ?');

    if (!removingBook) return;

    await removeBook(bookID);

    store.commit('removeBook', bookID);

    store.commit('showAlert', {
      message: 'Book removed from your account',
      type: 'success'
    });
  }catch (err) {
    console.error(err.message);
    store.commit('showAlert', {
      message: 'There was an error removing your book',
      type: 'error'
    });
  }finally {
    loadingAction.value = false;
  }

}

const onEditBook = bookID => {
  router.push({ name: 'editBook', params: { id: bookID } });
  scrollToTop();
}

onMounted(() => {
  getBooks();
})
</script>