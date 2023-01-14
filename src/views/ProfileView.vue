<template>
  <Header title="" />
  <Container class="min-h-[calc(100vh-62px)] relative -mt-16 flex flex-wrap flex-col lg:justify-center lg:items-start md:flex-row">
    <section class="w-full lg:w-4/12 text-center">
      <img :src="user.photoURL"
           class="h-20 h-20 rounded-full shadow-lg m-auto mb-2"
           :alt="user.displayName"
      >
      <p>
        {{ user.displayName }}
      </p>
      <p>
        {{ user.email }}
      </p>
    </section>
    <Card class="w-full my-4 lg:w-8/12">
      <Tabs :options="{ useUrlFragment: false }"
            class="mt-4"
      >
        <Tab name="Settings">
          <Authors />
        </Tab>
        <Tab name="Import tool">
          <p>Import your books from <span class="italic">.json</span> file. The file must contain the following
            attributes:</p>
          <code>
            title: String, author: String, categories: Array, imageURL: String, synopsis: String
          </code>
          <ImportFile />
        </Tab>
      </Tabs>
    </Card>
  </Container>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import {Tabs, Tab} from "vue3-tabs-component";

import Header from "@/components/tags/Header.vue";
import Container from "@/components/tags/Container.vue";
import Card from "@/components/tags/Card.vue";
import ImportFile from "@/components/ImportFile.vue";
import Authors from "@/components/Authors.vue";

const store = useStore();

const user = computed(() => store.getters.user);
</script>

<style>
:root {
  --emerald-color: 5, 150, 105;
}
.tabs-component-tabs {
  display: flex;
  justify-content: center;
}
.tabs-component-tabs .tabs-component-tab-a {
  padding: .5rem;
  border-radius: 4px 4px 0 0;
  transition: all .3s;
  border-bottom: 1px solid rgba(0,0,0,.2);
}
.tabs-component-tabs .tabs-component-tab-a:hover {
  color: white;
  background: rgb(var(--emerald-color));
}
.tabs-component-tabs .tabs-component-tab.is-active .tabs-component-tab-a {
  color: white;
  background: rgb(var(--emerald-color));
  border-bottom: 1px solid rgb(var(--emerald-color));
}
.tabs-component-panels {
  margin-top: 1rem;
}
</style>