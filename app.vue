<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script>
import { Wallet } from "./helper/near-wallet";
export default {
  async mounted() {
    const CONTRACT_ADDRESS = "nft.jeongwon0410.testnet";
    const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
    console.log(wallet);

    let isSignedIn = await wallet.startUp();

    if (isSignedIn) {
      signedInFlow();
    } else {
      signedOutFlow();
    }

    fetchGreeting();
  },
};
</script>
