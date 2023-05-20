<template>
  <div class="box relative bg-white-2 pb-10">
    <header class="flex items-center justify-center relative pt-4">
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
    <section class="py-10 pt-10" style="padding-bottom: 44px">
      <div class="flex justify-center">
        <img src="/images/nft_img.png" width="202" height="157" />
      </div>
    </section>
    <div class="px-4">
      <form @submit.prevent>
        <div class="py-6 px-4 bg-white rounded-3xl mb-3">
          <h1 class="font-bold text-2xl mb-6">Product Name</h1>
          <div
            class="flex items-center border-b border-gray"
            style="height: 40px"
          >
            <input class="w-full" type="text" v-model="title" />
          </div>
        </div>

        <div class="py-6 px-4 bg-white rounded-3xl mb-3">
          <h1 class="font-bold text-2xl mb-6">Description</h1>
          <div
            class="flex items-center border-b border-gray"
            style="height: 40px"
          >
            <input class="w-full" type="text" v-model="des" />
          </div>
        </div>

        <div class="py-6 px-4 bg-white rounded-3xl mb-3">
          <h1 class="font-bold text-2xl mb-6">Point</h1>
          <div
            class="flex items-center border-b border-gray"
            style="height: 40px"
          >
            <input class="w-full" type="text" v-model="point" />
          </div>
        </div>

        <div class="py-6 px-4 bg-white rounded-3xl mb-3">
          <h1 class="font-bold text-2xl mb-6">Benefit</h1>
          <div class="flex justify-between items-center">
            <div
              class="rounded-full bg-blue flex items-center justify-center text-white font-bold"
              style="width: 50px; height: 50px"
            >
              50%
            </div>
            <p>50% discount</p>
            <button class="btn bg-blue px-2 text-white">selected</button>
          </div>
        </div>
      </form>
      <button
        class="mt-6 btn w-full bg-blue text-white"
        :disabled="title === '' || dec === '' || point === ''"
        @click="goMinting"
      >
        Minting
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      des: "",
      point: "",
    };
  },
  methods: {
    async goMinting() {
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

      const walletAccountId = walletConnection.getAccountId();

      if (!walletConnection.isSignedIn()) {
        await walletConnection.requestSignIn({
          methodNames: [],
          successUrl: window.location.href, // optional redirect URL on success
          failureUrl: window.location.href, // optional redirect URL on failure
        });
        return;
      }

      const token_id = `b-${Date.now()}`;
      localStorage.setItem("token_id", token_id);

      const mint = await walletConnection.account().functionCall({
        contractId: "nft.jeongwon0410.testnet",
        methodName: "nft_mint",
        args: {
          token_id,
          metadata: {
            title: this.title,
            description: this.des,
            media:
              "https://bafkreig7qbp6t7v2g2a5shbea2nxcplxj3p2wkyklkfo6vjdr47cim7hfe.ipfs.nftstorage.link/",
          },
          receiver_id: walletAccountId,
        },
        gas: "50000000000000",
        attachedDeposit: utils.format.parseNearAmount(this.point),
      });

      console.log("min", mint);
    },
  },

  // mounted() {
  //   if (this.$route.query.transactionHashes) {
  //     const token_id = localStorage.getItem("token_id");
  //     localStorage.removeItem("token_id");
  //     this.$router.push("/approve?token_id=" + token_id);
  //   }
  // },
  beforeRouteEnter(to, from, next) {
    if (to.query.transactionHashes) {
      const token_id = localStorage.getItem("token_id");
      console.log(token_id);
      next("/approve?token_id=" + token_id);
    } else {
      next();
    }
  },
};
</script>
