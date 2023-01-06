<template>
  <LoaderComponent v-if="loading"/>
  <input class="w-full my-4" type="file" @change="getFile" accept="application/json">
  <button class="inline-block p-1 rounded bg-emerald-600 text-white enabled:hover:bg-emerald-500 disabled:opacity-60 transition duration-300"
          :disabled="items.length === 0 || loading"
          @click="importItems"
  >Import books</button>
</template>

<script setup>
import {writeBatch, doc} from "firebase/firestore";
import {useStore} from "vuex";
import {ref} from "vue";

import {db} from "@/firebase";
import LoaderComponent from "@/components/Loader";
import router from "@/router";
import {uniqueId} from "lodash/util";

const store = useStore();

const uid = store.getters.user.uid;
const items = ref([]);
const bookCategories = store.getters.bookCategories;
const loading = ref(false);
const getFile = (evt) => {
  const file = evt.target.files[0];
  const reader = new FileReader();
  reader.onload = parseFileToJson;
  reader.readAsText(file);
}
const parseFileToJson = (evt) => {
  items.value = JSON.parse(evt.target.result);
  console.log(JSON.parse(evt.target.result))
}
const importItems = async () => {
  try {
    if (items.value.length === 0 || loading.value) return;

    loading.value = true;

    const batch = writeBatch(db);

    items.value.forEach(item => {
      if (!hasValidCategory(bookCategories, item.categories)) {
        item.categories = [];
      }

      batch.set(doc(db, 'books', uniqueId(new Date().getTime().toString())), {
        ...item,
        uid
      });
    });

    await batch.commit();

    await router.push({name: 'books'});

    alert('Everything stored');
  } catch (err) {
    console.error(err.message);
  } finally {
    loading.value = false;
  }
}

const hasValidCategory = (arr, target) => {
  return target.every(el => arr.includes(el));
}
</script>