<template>
  <p>Your authors</p>
  <section>
    <span class="bg-gray-300 rounded mr-2 p-1" v-for="({author, id}, index) in userAuthors" :key="index">
      {{ author }}
      <button @click="removeAuthor(id)">Remove</button>
    </span>
  </section>
  <div>
    <Input type="text"
           placeholder="Author name"
           v-model="author"
    />
    <Button @click="addAuthor"
            :disabled="author.length === 0"
    >
      Add
    </Button>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {collection, addDoc, deleteDoc, getDoc, doc} from "firebase/firestore";
import {db} from "@/firebase";
import {useStore} from "vuex";

import Input from "@/components/tags/Input.vue";
import Button from "@/components/tags/Button.vue";

const store = useStore();

const author = ref('');
const userAuthors = computed(() => store.getters.userAuthors);

const user = computed(() => store.getters.user);

const addAuthor = async () => {
  try {
    const authorObject = {
      author: author.value,
      uid: user.value.uid
    }

    const data = await addDoc(collection(db, 'authors'), authorObject);

    store.commit('addUserAuthor', {
      ...authorObject,
      id: data.id
    });

    alert('Author stored');

    author.value = '';
  }catch (err) {
    console.error(err.message);
  }
}

const removeAuthor = async authorID => {
  try {
    const docRef = doc(db, 'authors', authorID);
    const author = await getDoc(docRef);

    if (!author.exists()) return;

    await deleteDoc(docRef);

    store.commit('removeUserAuthor', authorID);

    alert('Author removed');
  }catch (err) {
    console.error(err.message);
  }
}
</script>