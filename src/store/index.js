import { createStore } from 'vuex'

import VueCookies from "vue-cookies";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth, db} from "@/firebase";
import router from "@/router";
import {collection, getDocs, query, where} from "firebase/firestore";
import {isNull} from "lodash/lang";

const store = createStore({
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
    userAuthors: [],
    alert: {
      type: 'success',
      message: 'Default alert',
      showAlert: false,
    }
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
    },
    userAuthors: state => {
      return state.userAuthors;
    },
    alert: state => {
      return state.alert;
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
    },
    setUserAuthors: (state, authors) => {
      state.userAuthors = authors;
    },
    addUserAuthor: (state, author) => {
      state.userAuthors.push(author);
    },
    removeUserAuthor: (state, authorID) => {
      const index = state.userAuthors.findIndex(author => author.id === authorID);

      if (index === -1 ) return;

      state.userAuthors.splice(index, 1);
    },
    showAlert: (state, payload) => {
      state.alert = {
        ...payload,
        showAlert: true
      }
    },
    hideAlert: (state, payload) => {
      state.alert.showAlert = false;
    }
  },
  actions: {
    signInWithGoogle: async ({state, commit, dispatch}) => {
      if (state.user) return;

      try {
        const provider = new GoogleAuthProvider();

        const {uid, displayName, photoURL, email} = (await signInWithPopup(auth, provider)).user;

        const userObject = {
          uid, displayName, photoURL, email
        }

        VueCookies.set('midori-books', userObject, '1d');
        commit('setUser', userObject);

        await dispatch('getUserAuthorsByID', uid);
        await router.push({name: 'books'});
      }catch (err) {
        console.error(err.message);
      }
    },
    getUserAuthorsByID: async ({state, commit}, userID) => {
      if (isNull(userID)) return;

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

        commit('setUserAuthors', authors);
      }catch (err) {
        console.error(err.message);
      }

    }
  },
});

// Initial calls for some states
store.dispatch('getUserAuthorsByID', store.getters.user?.uid);

export default store;
