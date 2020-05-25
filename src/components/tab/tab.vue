<template>
  <div class="tab">
    <cube-tab-bar
      v-model="selectedLabel"
      :data="tab"
      :showSlider=true
      ref="tabbar"
      :useTransition=false
    >
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
      :loop=false 
      :showDots=false 
      :autoPlay=false 
      :initialIndex="index" 
      :options="slideOption"
      ref="slide"
      @change="slideChange" 
      @scroll="slideScroll"
      >
        <cube-slide-item v-for="(tab, index) in tab" :key="index">
          <component :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name:"tab",
  data(){
    return {
      index:this.initSlideIndex,
      slideOption:{
        listenScroll:true,
        probeType:3,
        directionLockThreshold:0
      }
    }
  },
  props:{
    tab:{
      type:Array,
      default(){
        return []
      }
    },
    initSlideIndex:{
      type:Number,
      default:0
    }
  },
  computed:{
    selectedLabel:{ //tabbar和slide共用一个index实现上下联动
      get(){
        return this.tab[this.index].label
      },
      set(newVal){
        this.index=this.tab.findIndex(value=>{
          return value.label===newVal
        })
        //console.log(this.index,newVal)
      }
    }
  },
  methods:{
    slideChange(slideIndex){
      this.index=slideIndex
    },
    slideScroll(obj){
      const tabWidth=this.$refs.tabbar.$el.clientWidth
      const slideWidth=this.$refs.slide.slide.scrollerWidth
      const transform=-obj.x/slideWidth*tabWidth
      this.$refs.tabbar.setSliderTransform(transform)
    }
  },
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .tab
    display flex
    flex-direction column
    height 100%
    >>> .cube-tab
      padding 10px 0
    .slide-wrapper
      flex 1
      overflow hidden
</style>