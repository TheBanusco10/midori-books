<template>
 <Container>
   <h1>Your books</h1>
   <div class="flex flex-wrap justify-center gap-2">
     <BookCard v-for="(book, index) in books"
               :book-data="book"
               :key="index"
     />
   </div>
 </Container>
</template>

<script setup>
import {query, getDocs, collection, where} from "firebase/firestore";

import Container from "@/components/tags/Container";
import {db} from "@/firebase";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import BookCard from "@/components/BookCard";

const store = useStore();
const user = computed(() => store.getters.user);
const books = ref([]);

const getBooks = async () => {
  try {
    const q = query(collection(db, 'books'), where('uid', '==', user.value.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      books.value.push(doc.data());
    });
  }catch (err) {
    console.error(err.message);
  }
}

onMounted(() => {
  getBooks();
})
</script>