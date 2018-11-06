import * as fb from 'firebase'

class Ad {
  constructor (title, desc, ownerId, src = '', promo = false, id = 'null') {
    this.title = title
    this.desc = desc
    this.ownerId = ownerId
    this.promo = promo
    this.src = src
    this.id = id
  }
}

export default {
  state: {
    ads:
      []
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
     // прикол через замыкание - не знаю все слишком сложно
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
   
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  },
  mutations: {
    createAdm (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, { title, desc, id }) {
      const ad = state.ads.find(a => {
        return a.id === id
      })
      ad.title = title
      ad.desc = desc
    }
  },
  actions: {
    async createAda ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.src
      try {
        const newAd = new Ad(
          payload.title,
          payload.desc,
          getters.user.id,
          // payload.src,
          '',
          payload.promo
        )

        const ad = await fb.database().ref('ads').push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))

        await fb.storage().ref(`ads/${ad.key + imageExt}`).put(image)
        const imageSrc = await fb.storage().ref(`ads/${ad.key + imageExt}`).getDownloadURL()

        await fb.database().ref('ads').child(ad.key).update({
          src: imageSrc
        })

        commit('setLoading', false)
        commit('createAdm', {
          ...newAd,
          id: ad.key,
          src: imageSrc
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      const resAds = []
      try {
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resAds.push(
            new Ad(ad.title, ad.desc, ad.ownerId, ad.src, ad.promo, key)
          )
        })
        commit('loadAds', resAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }   
    },
    async updateAd ({ commit }, { title, desc, id }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await fb.database().ref('ads').child(id).update({
          title, desc
        })
        commit('updateAd', {
          title, desc, id
        })
        commit('setLoading', false)        
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  }
}
