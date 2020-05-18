<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <header-detail :seller="seller"></header-detail>
  </div>
</template>

<script>
// eslint-disable-next-line
import VHeader from "components/v-header/v-header.vue"
import headerDetail from 'components/header-detail/header-detail.vue'
import {getSeller} from 'api'
export default {
  name: 'App',
  components: {
    VHeader,
    headerDetail,
  },
  data(){
    return{
      seller:{}
    }
  },
  methods:{
    _getSellerMethod(){
      getSeller().then((seller)=>{
        this.seller=seller
      })
    }
  },
  created(){
    this._getSellerMethod()
  }
}
</script>

<style lang="stylus">
</style>
