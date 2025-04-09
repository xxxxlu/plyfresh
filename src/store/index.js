import Vue from 'vue'
import Vuex from 'vuex'
import booksData from './books.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: booksData,
    cart: [],
    checkoutInfo: {
      customer: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      },
      paymentMethod: ''
    }
  },
  getters: {
    totalItems: state => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    cartTotal: state => {
      return state.cart.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0).toFixed(2)
    }
  },
  mutations: {
    ADD_TO_CART(state, { book, quantity }) {
      const existingItem = state.cart.find(item => item.id === book.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.cart.push({
          ...book,
          quantity
        })
      }
    },
    REMOVE_FROM_CART(state, bookId) {
      state.cart = state.cart.filter(item => item.id !== bookId)
    },
    UPDATE_QUANTITY(state, { bookId, quantity }) {
      const item = state.cart.find(item => item.id === bookId)
      if (item) {
        item.quantity = quantity
      }
    },
    CLEAR_CART(state) {
      state.cart = []
    },
    SET_CHECKOUT_INFO(state, info) {
      state.checkoutInfo = { ...info }
    }
  },
  actions: {
    addToCart({ commit }, { book, quantity }) {
      commit('ADD_TO_CART', { book, quantity })
    },
    removeFromCart({ commit }, bookId) {
      commit('REMOVE_FROM_CART', bookId)
    },
    updateQuantity({ commit }, { bookId, quantity }) {
      commit('UPDATE_QUANTITY', { bookId, quantity })
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    },
    setCheckoutInfo({ commit }, info) {
      commit('SET_CHECKOUT_INFO', info)
    }
  }
})
