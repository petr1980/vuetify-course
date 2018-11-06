import fb from 'firebase/app'

class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(o => o.done)
    },
    ondoneOrders (state) {
      return state.orders.filter(o => !o.done)
    },
    orders (state, getters) {
      return getters.ondoneOrders.concat(getters.doneOrders)
    }
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({ commit }, { name, phone, adId, ownerId }) {
      const order = new Order(name, phone, adId)
      commit('clearError')

      try {
        await fb.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrder ({ commit, getters }) {
      commit('clearError')
      commit('setLoading', true)

      const resultOrders = []

      try {
        const fbVall = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVall.val()

        Object.keys(orders).forEach(key =>{
          const o = orders[key]
          resultOrders.push(
            new Order(o.name, o.home, o.adId, o.done, key) 
          )
        })

        commit('loadOrders', resultOrders)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
      }
    },
    async markOrderDone ({ commit, getters }, payload) {
      commit('clearError')
      try {
        await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  }
}
