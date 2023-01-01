<template>
  <Container class="flex flex-wrap justify-center mt-10">
    <div class="w-full lg:w-2/12">
      <!--https://kbimages1-a.akamaihd.net/909b88f6-425d-4535-9925-8e9bcfa90f9b/1200/1200/False/harry-potter-y-la-piedra-filosofal-1.jpg-->
      <img class="w-32 mx-auto" :src="book.imageURL" alt="Book image">
      <Input type="url"
             v-model="book.imageURL"
             placeholder="Image URL"
      />
    </div>
    <div class="w-full lg:w-10/12">
      <Input type="text"
             v-model="book.title"
             placeholder="Title"
      />
      <Input type="text"
             v-model="book.author"
             placeholder="Author"
      />
      <multiselect v-model="selected" placeholder="Select one" :options="options" mode="multiple">
      </multiselect>
      <button @click="addBook">Add</button>
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
const options = [
  {
    value: 'Batman',
    label: 'Batman'
  },
  {
    value: 'Joker',
    label: 'Joker'
  }
]
const selected = null;

const book = ref({
  title: '',
  author: '',
  imageURL: null,
});

const addBook = async () => {
  try {
    // Loading
    const data = await addDoc(collection(db, 'books'), {
      ...book.value,
      uid: user.value.uid
    });

    alert(`Book ${data.id} stored`);

    // Empty book data
    // Loading to false
  }catch (err) {
    console.error(err.message);
  }


}

const updateSelected = (value) => {
  console.log(value);
}
</script>