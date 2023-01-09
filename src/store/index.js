import { createStore } from 'vuex'

import VueCookies from "vue-cookies";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "@/firebase";
import router from "@/router";

export default createStore({
  state: {
    APP_VERSION: process.env.VUE_APP_VERSION,
    user: VueCookies.get('midori-books') || null,
    books: [],
    bookCategories: [
      'Adventure stories',
      'Classics',
      'Crime',
      'Fairy tales, fables, and folk tales',
      'Fantasy',
      'Historical fiction',
      'Horror',
      'Humour and satire',
      'Literary fiction',
      'Mystery',
      'Poetry',
      'Plays',
      'Romance',
      'Science fiction',
      'Short stories',
      'Thrillers',
      'War',
    ],
  },
  getters: {
    APP_VERSION: state => {
      return state.APP_VERSION;
    },
    user: state => {
      return state.user;
    },
    books: state => {
      return state.books;
    },
    bookCategories: state => {
      return state.bookCategories;
    }
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setBooks: (state, books) => {
      state.books = books;
    },
    addBook: (state, book) => {
      state.books.unshift(book);
    },
    removeBook: (state, bookID) => {
      const index = state.books.findIndex(book => book.id === bookID);

      if (index === -1 ) return;

      state.books.splice(index, 1);
    }
  },
  actions: {
    signInWithGoogle: async ({state, commit}) => {
      if (state.user) return;

      try {
        const provider = new GoogleAuthProvider();

        const {uid, displayName, photoURL, email} = (await signInWithPopup(auth, provider)).user;

        const userObject = {
          uid, displayName, photoURL, email
        }

        VueCookies.set('midori-books', userObject, '1d');
        commit('setUser', userObject);

        await router.push({name: 'books'});
      }catch (err) {
        console.error(err.message);
      }
    }
  },
})
