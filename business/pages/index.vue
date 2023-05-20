<template>
  <div class="box relative">
    <section class="py-10 bg-blue">
      <div class="flex justify-center">
        <img src="/images/brand_icon.png" width="202" height="157" />
      </div>
      <div class="my-6">
        <swiper
          class="swiper"
          :slidesPerView="2"
          :centeredSlides="true"
          :spaceBetween="12"
          :initialSlide="1"
        >
          <swiper-slide v-for="i in 4" :key="i">
            <div
              class="bg-white rounded-xl flex flex-col justify-center items-center font-bold"
              style="width: 275px; height: 146px"
            >
              <h1 class="mb-4 text-xl">Best Firt Store</h1>
              <p class="mb-3 text-lg text-blue">Seoul</p>
              <p class="text-3xl text-blue">100,000,000P</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="flex justify-center">
        <button class="btn text-blue px-8 bg-white font-bold rounded-3xl">
          Manage
        </button>
      </div>
    </section>
    <section
      class="py-6 px-4 bg-white-2 rounded-t-3xl"
      style="margin-top: -20px; padding-bottom: 90px"
    >
      <h1 class="font-bold text-2xl mb-6">User’s Best search</h1>
      <ul>
        <li
          v-for="i in 3"
          :key="i"
          class="font-bold flex rounded-2xl bg-white items-center p-3 mb-3"
        >
          <span class="text0-blue">{{ i }}</span>
          <img
            class="mx-5"
            src="/images/cosmatic_icon.png"
            width="40"
            height="40"
          />
          <span>Cosmatic</span>
        </li>
      </ul>
    </section>
    <button
      class="absolute"
      style="width: 56px; height: 56px; right: 16px; bottom: 24px"
      @click="$router.push('/add')"
    >
      <img src="/images/add.png" />
    </button>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
// Import Swiper styles
import "swiper/css";
export default {
  name: "business",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss" scoped>
.card {
}
</style>
