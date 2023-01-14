<template>
  <p>Your authors</p>
  <div>
    <Input type="text"
           placeholder="Author name"
           v-model="author"
    />
    <Button @click="button"
            :disabled="author.length === 0"
    >
      Add
    </Button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {query, where, collection, getDocs} from "firebase/firestore";

import Input from "@/components/tags/Input.vue";
import Button from "@/components/tags/Button.vue";
import {db} from "@/firebase";

const author = ref('');

const getUserAuthorsByID = async userID => {
  try {
    const q = query(collection(db, 'authors'), where('uid', '==', userID));
    const querySnapshot = await getDocs(q);

    const authors = [];

    querySnapshot.forEach(author => {
      authors.push({
        id: author.id,
        ...author.data()
      });
    });

    return authors;
  }catch (err) {
    console.error(err.message);
  }

}

const button = () => {
  console.log('click');
}
</script>