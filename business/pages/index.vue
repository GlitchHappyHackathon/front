<template>
  <div class="box relative">
    <section class="py-10 bg-blue">
      <div class="flex justify-center">
        <img src="/images/brand_icon.png" width="202" height="157" />
      </div>
      <div class="my-6">
        <swiper class="swiper px-6" :slidesPerView="'2'" :centeredSlides="true">
          <swiper-slide class="mr-10">
            <div
              class="bg-white rounded-xl flex flex-col justify-center items-center font-bold"
              style="width: 275px; height: 146px"
            >
              <h1 class="mb-4 text-xl">Best 1st Store</h1>
              <p class="mb-3 text-lg text-blue">Incheon</p>
              <p class="text-3xl text-blue">100,000,000P</p>
            </div>
          </swiper-slide>
          <swiper-slide class="mr-10">
            <div
              class="bg-white rounded-xl flex flex-col justify-center items-center font-bold"
              style="width: 275px; height: 146px"
            >
              <h1 class="mb-4 text-xl">Best 2nd Store</h1>
              <p class="mb-3 text-lg text-blue">Seoul</p>
              <p class="text-3xl text-blue">50,000,000P</p>
            </div>
          </swiper-slide>
          <swiper-slide class="mr-10">
            <div
              class="bg-white rounded-xl flex flex-col justify-center items-center font-bold pr-4"
              style="width: 275px; height: 146px"
            >
              <h1 class="mb-4 text-xl">Best 3rd Store</h1>
              <p class="mb-3 text-lg text-blue">Deagu</p>
              <p class="text-3xl text-blue">30,000,000P</p>
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
      style="margin-top: -20px"
    >
      <h1 class="font-bold text-2xl mb-6">User’s Best search</h1>
      <ul>
        <li
          :key="i"
          class="font-bold flex rounded-2xl bg-white items-center p-3 mb-3"
        >
          <span class="text0-blue">1</span>
          <img
            class="mx-5"
            src="/images/cosmatic_icon.png"
            width="40"
            height="40"
          />
          <span>Cosmatic</span>
        </li>
        <li
          :key="i"
          class="font-bold flex rounded-2xl bg-white items-center p-3 mb-3"
        >
          <span class="text0-blue">2</span>
          <img
            class="mx-5"
            src="/images/clothes_icon.png"
            width="40"
            height="40"
          />
          <span>Clothes</span>
        </li>
        <li
          :key="i"
          class="font-bold flex rounded-2xl bg-white items-center p-3 mb-3"
        >
          <span class="text0-blue">3</span>
          <img
            class="mx-5"
            src="/images/ipad_icon.png"
            width="40"
            height="40"
          />
          <span>Electronics</span>
        </li>
      </ul>
      <button
        class="btn bg-blue w-full text-white"
        @click="$router.push('/add')"
      >
        Add
      </button>
    </section>
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
