<template>
  <transition name="fade" appear>
    <cube-popup v-show="visible" :mask-closable="true" @mask-click="maskClick" position="bottom" type="shop-cart-list" :z-index=90>
      <transition name="move" appear @after-leave="afterLeave">
        <div v-if="visible">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearList">清空</span>
          </div>
          <cube-scroll class="list-content">
            <ul>
              <li class="food" v-for="food in selectedFoods" :key="food.name">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>{{food.price*food.count}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <CartControl @ball_anim_trigger="onAdd" :food="food"></CartControl>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
import CartControl from '../cart-control/cart-control'
const EVENT_MASK = "mask"
const EVENT_LEAVE = "leave"
const EVENT_ADD = "add"
export default {
  name: "shop-cart-list",
  props: {
    selectedFoods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    maskClick() {
      this.visible = false
      this.$emit(EVENT_MASK)
    },
    afterLeave() {
      this.$emit(EVENT_LEAVE)
    },
    clearList() {
      this.$createDialog({
        type: "confirm",
        title: "确认清空购物车？",
        content: "将清空购物车内所有商品",
        onConfirm: () => {
          this.selectedFoods.forEach(element => {
            element.count = 0
          });
          this.hide()
        }
      }).show()
    },
    onAdd(el) {
      this.$emit(EVENT_ADD, el)
    }
  },
  components: {
    CartControl
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.cube-shop-cart-list {
  bottom: 48px;

  &.fade-enter, &.fade-leave-active {
    opacity: 0;
  }

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .move-enter, .move-leave-active {
    transform: translate3d(0, 100%, 0);
  }

  .move-enter-active, .move-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background-color: $color-background-ssss;

    .title {
      float: left;
      font-size: $fontsize-medium;
      color: $color-dark-grey;
    }

    .empty {
      float: right;
      font-size: $fontsize-small;
      color: $color-blue;
    }
  }

  .list-content {
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
    background-color: $color-white;

    .food {
      position: relative;
      padding: 12px 0;
      box-sizing: border-box;

      .name {
        line-height: 24px;
        font-size: $fontsize-medium;
        color: $color-dark-grey;
      }

      .price {
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-weight: 700;
        font-size: $fontsize-medium;
        color: $color-red;
      }

      .cart-control-wrapper {
        position: absolute;
        right: 0;
        bottom: 6px;
      }
    }
  }
}
</style>