import { createAPI } from 'cube-ui'
import HeaderDetail from 'components/header-detail/header-detail.vue'
import ShopCartList from 'components/shop-cart-list/shop-cart-list'
import ShopCartSticky from 'components/shop-cart-sticky/shop-cart-sticky'
import Food from 'components/food/food'
import Vue from 'vue'

createAPI(Vue, HeaderDetail)
createAPI(Vue, ShopCartList)
createAPI(Vue, ShopCartSticky)
createAPI(Vue, Food)