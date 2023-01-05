import { createStore } from 'vuex'

import VueCookies from "vue-cookies";

export default createStore({
  state: {
    user: VueCookies.get('midori-books') || null,
    books: [],
  },
  getters: {
    user: state => {
      return state.user;
    },
    books: state => {
      return state.books;
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
  },
  modules: {
  }
})
