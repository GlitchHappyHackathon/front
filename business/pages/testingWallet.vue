<template>
  <h1>Hey Testing</h1>
</template>
<script>
export default {
  name: "testing",
  data() {
    return {};
  },
  async created() {
    const { connect, keyStores, providers } = window.nearApi;
    console.log("ks :", keyStores);
    const connectionConfig = {
      networkId: "testnet",
      keyStore: keyStores, // first create a key store
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    const nearConnection = await connect(connectionConfig);
    console.log(nearConnection);
  },
};
</script>
