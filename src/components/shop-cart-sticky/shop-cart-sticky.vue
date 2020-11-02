<template>
  <div class="shop-cart-sticky" v-show="visible">
    <shop-cart
      ref="shopCart"
      :selectedFoods="selectedFoods"
      :minPrice="minPrice"
      :deliveryPrice="deliveryPrice"
      :showCartListProp="showCartListProp"
    ></shop-cart>
  </div>
</template>

<script>
import ShopCart from 'components/shop-cart/shop-cart'
export default {
  name:"shop-cart-sticky",
  props:{
    selectedFoods:{
      type:Array,
      default(){
        return{}
      }
    },
    minPrice:{
      type:Number,
      default:0
    },
    deliveryPrice:{
      type:Number,
      default:0
    },
    showCartListProp:{
      type:Boolean,
      default:false
    },
    shopCartList:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return{
      visible:false
    }
  },
  methods:{
    show(){
      this.visible=true
    },
    hide(){
      this.visible=false
    },
    ballFallAnim(el){
      this.$refs.shopCart.ballFallAnim(el)
    }
  },
  components:{
    ShopCart
  }
}
</script>

<style lang="stylus" scoped>
  .shop-cart-sticky
    position absolute
    left 0
    bottom 0
    z-index 999
    width 100%
    height 48px
</style>