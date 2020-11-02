<template>
  <div>
    <div class="shopcart" @click="toggleList">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">
              <bubble :num="totalCount"></bubble>
            </div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <div class="content-right">
          <div class="pay" @click="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="(ball, index) in balls" :key="index">
          <transition
            @before-enter="beforeDrop"
            @enter="dropping"
            @after-enter="afterDrop"
          >
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bubble from 'components/bubble/bubble'
const BALL_LEN=10
function ballCreator() {
  let ret = []
  for (let i = 0; i < BALL_LEN; i++) {
    ret.push({
      show:false
    })
  }
  return ret
}

const innerClsHook="inner-hook"
export default {
  name:"shop-cart",
  props:{
    selectedFoods:{
      type:Array,
      default(){
        return []
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
    }
  },
  data(){
    return {
      balls:ballCreator(),
      showCartList:this.showCartListProp
    }
  },
  created(){
    this.ballsList=[]
  },
  methods:{
    ballFallAnim(el){
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i];
        if (!ball.show) {
          ball.show=true
          ball.el=el
          this.ballsList.push(ball)
          return
        }
      }
    },
    beforeDrop(el){
      const ball=this.ballsList[this.ballsList.length-1]
      const ballRect=ball.el.getBoundingClientRect()
      const x=ballRect.left-32
      const y=-(window.innerHeight-ballRect.top-22)
      el.style.display=""
      el.style.transform=el.style.webkitTransform=`translate(0,${y}px)`
      const inner=el.getElementsByClassName(innerClsHook)[0]
      inner.style.transform=inner.style.webkitTransform=`translate(${x}px,0)`
    },
    dropping(el,done){
      this._reflow=document.body.offsetHeight
      el.style.transform=el.style.webkitTransform=`translate(0,0)`
      const inner=el.getElementsByClassName(innerClsHook)[0]
      inner.style.transform=inner.style.webkitTransform=`translate(0,0)`
      el.addEventListener("transitionend",done)
    },
    afterDrop(el){
      const ball=this.ballsList.shift()
      if (ball) {
        ball.show=false
        el.style.display="none"
      }
    },
    toggleList(){
      if (!this.showCartList) {
        if (!this.totalCount) {
          return
        }
        this._showShopCartList()
        this._showShopCartSticky()
        this.showCartList=true
      } else {
        this._hideShopCartList()
        
      }
    },
    _showShopCartList(){
      this.shopCartListComp=this.shopCartListComp || this.$createShopCartList({
        $props:{
          selectedFoods:"selectedFoods"
        },
        $events:{
          mask:()=>{
            this.showCartList=false
          },
          leave:()=>{
            this._hideShopCartSticky()
            this.showCartList=false
          },
          add:el=>{
            this.shopCartStickyComp.ballFallAnim(el)
          }
        }
      })
      this.shopCartListComp.show()
    },
    _showShopCartSticky(){
      this.shopCartStickyComp=this.shopCartStickyComp || this.$createShopCartSticky({
        $props:{
          selectedFoods:"selectedFoods",
          minPrice:"minPrice",
          deliveryPrice:"deliveryPrice",
          showCartListProp:"showCartList",
          shopCartList:this.shopCartListComp
        },
      })
      this.shopCartStickyComp.show()
    },
    _hideShopCartList(){
      this.$parent.$el.className == "shop-cart-sticky" ? this.$parent.shopCartList.hide() : this.shopCartListComp.hide()
    },
    _hideShopCartSticky(){
      this.shopCartStickyComp.hide()
    },
    pay(e){
      if (this.totalPrice < this.minPrice) {
        return 
      }
      this.dialogComp = this.$createDialog({
          type:"confirm",
          title:"支付",
          content:`共需支付 ${this.totalPrice} 元`
        }).show()
      e.stopPropagation();
    }
  },
  computed:{
    payDesc(){
      if(this.totalPrice==0){
        return `${this.minPrice}元起送`
      }else if(this.totalPrice>0&&this.totalPrice<this.minPrice){
        return `还差${this.minPrice-this.totalPrice}元起送`
      }else{
        return "去结算"
      }
    },
    payClass(){
      if (!this.totalCount||this.totalPrice>0&&this.totalPrice<this.minPrice) {
        return "not-enough"
      } else {
        return "enough"
      }
    },
    totalCount(){
      let count=0
      this.selectedFoods.forEach(foods => {
        count+=foods.count
      });
      return count
    },
    totalPrice(){
      let totle=0
      this.selectedFoods.forEach(foods => {
        totle+=foods.count*foods.price
      });
      return totle
    }
  },
  watch: {
    showCartListProp(newVal){
      this.showCartList=newVal
    },
    totalCount(newValue){
      if (this.showCartList && newValue==0) {
        this._hideShopCartList()
      }
    }
  },
  components:{
    bubble
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .shopcart
    height 100%
    .content
      display flex
      background-color $color-background
      font-size 0
      color $color-light-grey
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin: 0 12px
          padding: 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background-color $color-background
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background-color $color-dark-grey
            &.highlight
              background-color $color-blue
            .icon-shopping_cart
              line-height 44px
              font-size $fontsize-large-xxx
              color $color-light-grey
              &.highlight
                color $color-white
          .num
            position absolute
            top 0
            right 0
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255,255,255,0.1)
          font-weight 700
          font-size $fontsize-large
          &.highlight
            color $color-white
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size $fontsize-small-s
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-weight 700
          font-size $fontsize-small
          &.not-enough
            background-color $color-dark-grey
          &.enough
            background-color $color-green
            color $color-white
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background-color $color-blue
          transition all 0.4s linear
</style>