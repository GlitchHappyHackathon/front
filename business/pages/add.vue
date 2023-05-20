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
            <input class="w-full" type="text" value="" />
          </div>
        </div>

        <div class="py-6 px-4 bg-white rounded-3xl mb-3">
          <h1 class="font-bold text-2xl mb-6">Description</h1>
          <div
            class="flex items-center border-b border-gray"
            style="height: 40px"
          >
            <input class="w-full" type="text" value="" />
          </div>
        </div>

        <div class="py-6 px-4 bg-white rounded-3xl mb-3">
          <h1 class="font-bold text-2xl mb-6">Point</h1>
          <div
            class="flex items-center border-b border-gray"
            style="height: 40px"
          >
            <input class="w-full" type="text" value="" />
          </div>
        </div>

        <div class="py-6 px-4 bg-white rounded-3xl mb-3">
          <h1 class="font-bold text-2xl mb-6">Benefit</h1>
          <div>
            <div>50%</div>
          </div>
        </div>
      </form>
      <button @click="goMinting">go Minting</button>
    </div>
  </div>
</template>
<script>
export default {
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

      // const mint = await walletConnection.account().functionCall({
      //   contractId: "nft.jeongwon0410.testnet",
      //   methodName: "nft_mint",
      //   args: {
      //     token_id: "b-111",
      //     metadata: {
      //       title: "aaaa",
      //       description: "aaaa",
      //       media:
      //         "https://bafkreidq4tc2t3diu7duwsyrmyiaaxskvbur24fskn2xqbvfobb3ketwtq.ipfs.nftstorage.link/",
      //     },
      //     receiver_id: walletAccountId,
      //   },
      //   gas: "50000000000000",
      //   attachedDeposit: utils.format.parseNearAmount("3"),
      // });

      // console.log("min", mint);

      const approve = await walletConnection.account().functionCall({
        contractId: "nft.jeongwon0410.testnet",
        methodName: "nft_approve",
        args: {
          token_id: "b-111",
          account_id: "market.jeongwon0410.testnet",
          msg: "9000000000000000000000000",
        },
        gas: "50000000000000",
        attachedDeposit: utils.format.parseNearAmount("0.47"),
      });

      console.log("approve", approve);
    },
  },
};
</script>
