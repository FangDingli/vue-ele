<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseFood">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addFood"></div>
  </div>
</template>

<script>
const BALL_ANIM_TRIGGER="ball_anim_trigger"
export default {
  name:"cart-control",
  props:{
    food:{
      type:Object
    }
  },
  methods:{
    addFood(el){
      if (!this.food.count){
        this.$set(this.food,"count",1)
      }else
        this.food.count++
      this.$emit(BALL_ANIM_TRIGGER,el.target)
    },
    decreaseFood(){
      if (this.food.count>0) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .cartcontrol
    display flex
    align-items center
    .cart-decrease
      display inline-block
      padding 6px
      opacity 1
      .inner
        display inline-block
        line-height 24px
        font-size $fontsize-large-xxx
        color $color-blue
        transition all 0.4s linear
        transform rotate(0)
      &.move-enter-active, &.move-leave-active
        transition all 0.4s linear
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(24px)
        .inner
          transform rotate(180deg)
  .cart-count
    width 12px
    line-height 24px
    text-align center
    font-size $fontsize-small-s
    color $color-grey
  .cart-add
    display inline-block
    padding 6px
    line-height 24px
    font-size $fontsize-large-xxx
    color $color-blue
</style>