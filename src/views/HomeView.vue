<template>
  <div class="home">
    <Searchbar :total-items="items"
               @results="getResults"
    />
  </div>
</template>

<script setup>
import Searchbar from "@/components/Searchbar";

const items = [
  {
    imageURL: 'https://harrypotter.jpg',
    title: 'Harry Potter'
  },
  {
    imageURL: 'https://it.jpg',
    title: 'It'
  },
  {
    imageURL: 'https://seanunciaun.jpg',
    title: 'Se anuncia un asesinato'
  }
]

const getResults = (results) => {
  console.log(results);
}
</script>
