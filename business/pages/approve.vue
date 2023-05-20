<template>
  <div class="box h-full bg-blue px-4">
    <section class="flex flex-col justify-center items-center h-full">
      <div>
        <img src="/images/like.png" width="100" height="100" />
      </div>
      <h1 class="text-white font-bold text-3xl text-center my-8">
        Minting<br />
        Completed
      </h1>
      <button class="btn bg-white w-full text-blue" @click="onApprove">
        Approve
      </button>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    async onApprove() {
      console.log("sdsdf");
      const { connect, utils, keyStores, WalletConnection } = window.nearApi;

      const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

      const connectionConfig = {
        networkId: "testnet",
        keyStore: myKeyStore, // first create a key store
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };

      const nearConnection = await connect(connectionConfig);

      const walletConnection = new WalletConnection(nearConnection, "a");

      if (!walletConnection.isSignedIn()) {
        await walletConnection.requestSignIn({
          methodNames: [],
          successUrl: window.location.href, // optional redirect URL on success
          failureUrl: window.location.href, // optional redirect URL on failure
        });
        return;
      }
      const approve = await walletConnection.account().functionCall({
        contractId: "nft.jeongwon0410.testnet",
        methodName: "nft_approve",
        args: {
          token_id: this.$route.query.token_id,
          account_id: "market.jeongwon0410.testnet",
          // msg: "9000000000000000000000000",
          msg: utils.format.parseNearAmount("1"),
        },
        gas: "50000000000000",
        attachedDeposit: utils.format.parseNearAmount("0.47"),
      });

      console.log("approve", approve);
    },
  },
  mounted() {
    console.log(this.$route.query.transactionHashes);
    if (this.$route.query.transactionHashes) {
      this.$router.replace("/");
    }
  },
  unmounted() {
    localStorage.removeItem("token_id");
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.token_id) {
      next();
    } else {
      next("/add");
    }
  },
};
</script>
