<template>
  <div class="box flex flex-col justify-center relative h-full">
    <header class="absolute top-0 w-full bg-white p-2 flex justify-center">
      <img src="/images/logo.png" width="15" height="30" />
    </header>
    <div class="map-container">
      <GoogleMap
        api-key="AIzaSyACGryVa0hejiCgC6ID8ESD0fLRI-6UZP0"
        style="width: 100%; height: 100%"
        :center="center"
        :zoom="14"
        :mapTypeControl="false"
        :draggable="true"
        :scaleControl="true"
        :scrollwheel="false"
        :navigationControl="true"
        :streetViewControl="false"
        :disableDefaultUI="true"
        :fullscreenControl="false"
      >
        <Marker />

        <CustomMarker
          v-for="m in markers"
          @click="openModal(m)"
          :key="m.lat"
          :options="{ position: m.position, anchorPoint: 'BOTTOM_CENTER' }"
        >
          <div style="text-align: center">
            <img :src="m.pin" width="80" height="80" />
          </div>
        </CustomMarker>
      </GoogleMap>
    </div>
    <footer class="absolute w-full px-5">
      <div class="bg-white p-5 flex justify-between">
        <div class="flex items-center mr-5">
          <div>
            <img class="mr-2" src="/images/step.png" width="25" height="25" />
          </div>
          <p class="font-semibold">
            <span class="font-bold"> 1000</span> Step!
          </p>
        </div>
        <div class="flex items-center mr-5">
          <div>
            <img class="mr-2" src="/images/points.png" width="25" height="25" />
          </div>
          <p class="font-semibold">30,000P</p>
        </div>
        <div class="cursor-pointer" @click="$router.push('/mypage')">
          <img src="/images/profile.png" width="42" height="42" />
        </div>
      </div>
    </footer>

    <Modal v-if="showDetailsModal" @onMask="showDetailsModal = fa">
      <div class="h-modal h-modal-bottom px-3">
        <div class="modal-wrapper bg-white">
          <h1 class="font-bold text-xl mb-5">Information</h1>
          <section class="flex">
            <div>
              <img
                :src="selectedModalData.img"
                class="rounded-t-lg"
                width="200"
                height="200"
              />
            </div>
            <div class="ml-3">
              <h1 class="font-bold">{{ selectedModalData.title }}</h1>
              <p class="text-gray font-bold text-sm mb-3">
                {{ selectedModalData.shop }}
              </p>
              <p class="text-lg text-blue font-bold">
                {{ selectedModalData.point }}P
              </p>
              <p class="text-sm font-bold">
                <span>{{ selectedModalData.nft.used }}</span>
                <span>/</span>
                <span>{{ selectedModalData.nft.total }}</span>
              </p>
            </div>
          </section>
          <button class="btn bg-blue w-full mt-8 text-white" @click="onBuy">
            Buy Now
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import { GoogleMap, Marker, CustomMarker } from "vue3-google-map";
const { connect, keyStores, WalletConnection, Contract, utils } =
  window.nearApi;
export default {
  components: { GoogleMap, Marker, CustomMarker, Modal },
  data() {
    return {
      center: { lat: 37.54947066526625, lng: 126.61269021685881 },
      markers: [
        {
          position: { lat: 37.55411405401602, lng: 126.62415867082423 },
          img: "/images/prod.png",
          shop: "Innisfree",
          pin: "/images/ipad.png",
          title: "Suncream",
          point: "10000",
          nft: { total: 100, used: 77 },
        },
        {
          position: { lat: 37.545443748264084, lng: 126.61560788554029 },
          img: "/images/prod.png",
          pin: "/images/cloth.png",
          shop: "Innisfree",
          title: "Suncream",
          point: "10000",
          nft: { total: 100, used: 77 },
        },
        {
          position: { lat: 37.54910133449764, lng: 126.60997621383456 },
          img: "/images/prod.png",
          pin: "/images/cosmetic.png",
          shop: "Innisfree",
          title: "Suncream",
          point: "10000",
          nft: { total: 100, used: 77 },
        },
      ],
      showDetailsModal: false,
      selectedModalData: null,
    };
  },
  methods: {
    openModal(product) {
      this.selectedModalData = product;
      this.showDetailsModal = true;
    },
    async onBuy() {
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
      const walletAccountId = walletConnection.getAccountId();
      console.log(walletAccountId);

      if (!walletConnection.isSignedIn()) {
        await walletConnection.requestSignIn({
          methodNames: [],
          successUrl: window.location.href, // optional redirect URL on success
          failureUrl: window.location.href, // optional redirect URL on failure
        });
        return;
      }

      const mint = await walletConnection.account().functionCall({
        contractId: "market.jeongwon0410.testnet",
        methodName: "offer",
        args: {
          token_id: "b-111",
          nft_contract_id: "nft.jeongwon0410.testnet",
        },
        gas: "50000000000000",
        attachedDeposit: utils.format.parseNearAmount("100"),
      });

      console.log("min", mint);
    },
  },
  async mounted() {
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
    const walletAccountId = walletConnection.getAccountId();
    const account = await nearConnection.account(walletAccountId);
    console.log(walletAccountId);

    if (!walletConnection.isSignedIn()) {
      await walletConnection.requestSignIn({
        methodNames: [],
        successUrl: window.location.href, // optional redirect URL on success
        failureUrl: window.location.href, // optional redirect URL on failure
      });
      return;
    }

    // const contract = new Contract(account, "market.jeongwon0410.testnet", {
    //   viewMethods: ["get_sales_by_owner_id", "get_supply_sales"],
    // });
    // const response1 = await contract.get_sales_by_owner_id({
    //   account_id: "yapoey_business.testnet",
    //   from_index: "0",
    //   limit: 100,
    // });

    // console.log("get_sales_by_owner_id", response1);

    // const response2 = await contract.get_supply_sales();
    // console.log("get_supply_sales", response2);

    const contractNFT = new Contract(account, "nft.jeongwon0410.testnet", {
      viewMethods: ["nft_tokens"],
    });

    const response3 = await contractNFT.nft_tokens();
    console.log("nft_tokens", response3);
  },
};
</script>
<style lang="scss" scoped>
.map-container {
  height: 100%;
}
header,
footer {
  z-index: 100;
}
footer {
  bottom: 20px;
  > div {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
  }
}
.modal-wrapper {
  min-width: 360px;
  max-width: 560px;
  width: 100%;
  height: 367px;
  padding: 25px 20px;
}
</style>
