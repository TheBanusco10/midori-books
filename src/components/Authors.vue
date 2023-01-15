<template>
  <section class="my-4 flex">
    <SpanItem class="flex items-center"
              v-for="({author, id}, index) in userAuthors" :key="index"
    >
      {{ author }}
      <button @click="removeAuthor(id)"
              :disabled="loading"
      >
        <XMarkIcon class="p-1 w-6 h-6" />
      </button>
    </SpanItem>
    <span v-if="userAuthors.length === 0">You don't have authors yet, start adding a new one</span>
  </section>
  <div>
    <Input type="text"
           placeholder="Author name"
           v-model="author"
    />
    <Button @click="addAuthor"
            :disabled="author.length === 0 || loading"
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
import {XMarkIcon} from "@heroicons/vue/24/outline";

import Input from "@/components/tags/Input.vue";
import Button from "@/components/tags/Button.vue";
import SpanItem from "@/components/tags/SpanItem.vue";

const store = useStore();

const author = ref('');
const userAuthors = computed(() => store.getters.userAuthors);
const userAuthorsName = computed(() => store.getters.userAuthors.map(el => el.author));

const user = computed(() => store.getters.user);

const loading = ref(false);

const addAuthor = async () => {
  if (userAuthorsName.value.length !== 0 && userAuthorsName.value.includes(author.value)) return;

  try {
    loading.value = true;

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
  }finally {
    loading.value = false;
  }
}

const removeAuthor = async authorID => {
  try {
    loading.value = true;

    const docRef = doc(db, 'authors', authorID);
    const author = await getDoc(docRef);

    if (!author.exists()) return;

    await deleteDoc(docRef);

    store.commit('removeUserAuthor', authorID);

    alert('Author removed');
  }catch (err) {
    console.error(err.message);
  }finally {
    loading.value = false;
  }
}
</script>