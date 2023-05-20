<template>
  <div class="box flex flex-col justify-center">
    <section class="flex justify-center items-center" style="height: 50vh">
      <img src="/images/logo.png" />
    </section>
    <section class="px-4 flex-1">
      <button class="btn border border-black w-full mb-3" @click="login">
        <img
          src="/images/google.png"
          width="17"
          height="18"
          class="mr-2"
          alt="google logo"
          style="margin-left: -25px"
        />
        Google
      </button>
      <button
        class="btn w-full mb-3"
        style="background: #1877f2"
        @click="login"
      >
        <img
          src="/images/facebook.png"
          width="17"
          height="18"
          class="mr-2"
          alt="facebook logo"
          style="margin-top: -5px"
        />
        Facebook
      </button>
      <button
        class="btn w-full mb-3"
        style="background: #f9e54d"
        @click="login"
      >
        <img
          src="/images/kakao.png"
          width="17"
          height="18"
          class="mr-2"
          alt="kakao logo"
        />
        Kakao Talk
      </button>
      <button class="btn border border-black w-full mb-3" @click="login">
        <img
          src="/images/insta.png"
          width="17"
          height="18"
          class="mr-2"
          alt="insta logo"
        />
        Instagram
      </button>
    </section>
  </div>
</template>
<script>
export default {
  name: "login",
  methods: {
    async login() {
      const { connect, keyStores, WalletConnection } = window.nearApi;

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
      console.log(nearConnection);

      // create wallet connection
      const walletConnection = new WalletConnection(nearConnection, "a");

      console.log(walletConnection);

      walletConnection.requestSignIn({
        contractId: "nft.jeongwon0410.testnet",
        methodNames: [],
        successUrl: "http://localhost:3001/", // optional redirect URL on success
        // failureUrl: "REPLACE_ME://.com/failure",
      });

      console.log(walletConnection);
      this.$router.push("/");
    },
  },
};
</script>
