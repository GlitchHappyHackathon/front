<template>
  <div>{{ count }}</div>
</template>

<script>
import { mapState } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  computed: {
    ...mapState(useCounterStore, ["count"]),
  },
};
</script>
