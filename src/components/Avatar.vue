<template>
  <section
      :class="[{'!border-emerald-500': showMenu},'max-w-4/12 flex items-center relative border-b-2 border-b-transparent pb-2 select-none hover:cursor-pointer hover:border-emerald-500 transition duration-300']"
      @click.stop="showMenu = !showMenu"
  >
    <img :src="user.photoURL"
         :alt="user.displayName"
         class="rounded-full w-10 h-10"
         referrerpolicy="no-referrer"
    >
    <p class="w-32 pl-3 overflow-hidden whitespace-nowrap text-ellipsis">
      {{ user.displayName }}
    </p>
    <Transition name="avatar-menu"
                enter-active-class="animate__animated animate__fadeIn animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <div class="absolute w-full top-14 right-0 bg-white shadow rounded z-20"
           v-if="showMenu"
      >
        <ul class="text-start">
          <li :class="[{'bg-emerald-500 text-white hover:!bg-emerald-400': route.fullPath === item.link }, 'border-b hover:bg-gray-100 hover:cursor-pointer transition duration-300']"
              v-for="(item, index) in navItems"
              :key="index"
          >
            <router-link class="w-full inline-block p-2" v-if="item.link" :to="item.link">{{ item.name }}</router-link>
            <span v-else>{{ item.name }}</span>
          </li>
          <li class="p-2 border-b hover:bg-gray-100 hover:cursor-pointer transition duration-300"
              @click="signOutApp">Sign
            out
          </li>
        </ul>
      </div>
    </Transition>
  </section>
</template>

<script setup>

import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {signOut} from "firebase/auth";
import {auth} from "@/firebase";
import VueCookies from "vue-cookies";

const store = useStore();
const route = useRoute();

const showMenu = ref(false);
const user = computed(() => store.getters.user);
const navItems = [
  {
    name: 'Profile',
    link: '/profile'
  },
  {
    name: 'Books',
    link: '/books'
  },
];

const signOutApp = async () => {
  try {
    await signOut(auth);

    VueCookies.remove('midori-books');
    store.commit('setUser', null);
  }catch (err) {
    console.error(err.message);
  }
}

const closeMenu = () => {
  showMenu.value = false;

}

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu);
});

onMounted(() => {
  document.addEventListener('click', closeMenu);
});

</script>