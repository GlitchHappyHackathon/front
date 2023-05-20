<template>
  <div class="bg-white-2 h-full">
    <header class="flex items-center justify-center relative bg-white mb-6">
      <img
        class="absolute cursor-pointer"
        src="/images/back.png"
        width="32"
        height="32"
        style="left: 4px"
        @click="$router.go(-1)"
      />

      <h1 class="text-xl font-bold">My Page</h1>
    </header>
    <section class="px-4">
      <div class="mb-3 bg-white flex justify-center p-6">
        <img class="mr-2" src="/images/bar.png" width="176" height="206" />
      </div>
      <div class="p-6 bg-white rounded-xl mb-3">
        <h1 class="text-xl font-bold mb-5">Recently Found</h1>
        <swiper
          :slides-per-view="3"
          :space-between="12"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="i in 4" :key="i">
            <img :src="`/images/img${i}.jpg`" width="96" height="96" />
          </swiper-slide>
        </swiper>
      </div>
      <div class="p-6 bg-white rounded-xl">
        <h1 class="text-xl font-bold mb-5">My NFT</h1>
        <swiper
          :slides-per-view="2"
          :space-between="12"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="i in 3" :key="i">
            <img :src="`/images/img1-${i}.png`" width="144" height="144" />
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </div>
</template>
<script>
import CircleProgress from "vue3-circle-progress";
import { Swiper, SwiperSlide } from "swiper/vue";

import "vue3-circle-progress/dist/circle-progress.css";
import "swiper/css";
export default {
  components: {
    CircleProgress,
    Swiper,
    SwiperSlide,
  },
};
</script>
<style lang="scss" scoped>
header {
  height: 68px;
}
</style>
