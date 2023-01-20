<template>
  <Header title="New book" />
  <Container class="flex flex-wrap justify-center mt-10">
    <div class="w-full lg:w-2/12 mb-4 border-b lg:border-r
    lg:border-b-0 lg:pr-3"
    >
      <img class="w-32 h-48 mx-auto mb-4 rounded shadow object-cover"
           :src="book.imageURL || require('@/assets/img/default-placeholder.png')"
           alt="Book image"
           @error="onImageError"
      >
      <Input type="date"
             v-model="bookStartedAt"
             :value="bookStartedAt"
             placeholder="Started reading at"
             min="1990-01-01"
             :max="dayjs().format('YYYY-MM-DD')"
      />
      <Input type="url"
             v-model="book.imageURL"
             placeholder="Image URL"
             class="!mb-2"
      />
      <HintText>
        Paste your image URL here
      </HintText>
    </div>
    <div class="w-full lg:w-10/12 lg:pl-3">
      <Input type="text"
             v-model="book.title"
             placeholder="Title"
      />
      <textarea placeholder="Synopsis"
                v-model="book.synopsis"
                class="w-full border rounded p-2 mb-4 h-44 max-h-44 focus:outline-none focus:border-emerald-500
                transition duration-300"
      ></textarea>
      <multiselect  v-model="book.author"
                    :options="userAuthors.map(el => el.author)"
                    placeholder="Author"
                    class="!mb-4"
      />
      <HintText v-if="userAuthors.length === 0">
        It seems your authors list is empty. Go to your profile and add a new one
      </HintText>
      <multiselect v-model="book.categories"
                   placeholder="Category"
                   :options="categories"
                   mode="multiple"
                   :searchable="true"
      >
        <template v-slot:multiplelabel="{ values }">
          <div class="multiselect-multiple-label">
            <SpanItem v-for="(item, index) in values"
                  :key="index"
            >
              {{ item.value }}
            </SpanItem>
          </div>
        </template>
      </multiselect>
      <button @click="addBook"
              :class="[loading ? 'opacity-50 pointer-events-none' : '', `w-full my-4 text-white p-2 rounded bg-emerald-500
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
import {useRouter} from "vue-router";
import dayjs from "dayjs";

import Multiselect from "@vueform/multiselect";
import Container from "@/components/tags/Container.vue";
import Input from "@/components/tags/Input.vue";
import Header from "@/components/tags/Header.vue";
import SpanItem from "@/components/tags/SpanItem.vue";
import HintText from "@/components/tags/HintText.vue";

const store = useStore();
const router = useRouter();

const user = computed(() => store.getters.user);
const categories = store.getters.bookCategories;
const book = ref({
  title: '',
  author: '',
  imageURL: '',
  synopsis: '',
  categories: [],
  updatedAt: dayjs().valueOf().toString(),
});
const userAuthors = computed(() => store.getters.userAuthors);
const bookStartedAt = ref(dayjs().format('YYYY-MM-DD'));
const loading = ref(false);

const addBook = async () => {
  try {
    // Loading
    loading.value = true;

    const bookObject = {
      ...book.value,
      startedAt: dayjs(bookStartedAt.value).valueOf().toString(),
      uid: user.value.uid
    }

    const data = await addDoc(collection(db, 'books'), bookObject);

    store.commit('addBook', {
      ...bookObject,
      id: data.id
    });

    await router.push({name: 'books'});

    store.commit('showAlert', {
      message: 'Your book has been stored',
      type: 'success'
    });

    // Empty book data
    book.value.title = '';
    book.value.author = '';
    book.value.imageURL = '';
    book.value.synopsis = '';
    book.value.categories = [];
    // Loading to false
    loading.value = false;
  }catch (err) {
    store.commit('showAlert', {
      message: 'There was an error storing your book, try later',
      type: 'error'
    });

    console.error(err.message);
  }
}

const onImageError = () => {
  alert('URL not valid. Please, try another one');
  book.value.imageURL = null;
}
</script>