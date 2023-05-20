<template>
  <div>
    <transition name="modal">
      <div class="modal-mask z-class-2000" @click="$emit('onMask')">
        <slot> default body </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Modal",
  // for android
  created() {
    document.body.style.overflow = "hidden";
  },
  destroyed() {
    document.body.style.overflow = "auto";
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /*for samsung browser*/
  height: 150vh;
  background-color: rgba(0, 0, 0, 0.6);
  /* display: table; */
  transition: opacity 0.3s ease;
  z-index: 1000;
}

/*.popups-enter .popups-container,*/
/*.popups-leave-active .popups-container {*/
/*  -webkit-transform: scale(1.1);*/
/*  transform: scale(1.1);*/
/*}*/
</style>
