const app = Vue.createApp({
  data() {
    return {
      playerCount: 2,
      showGlobalSettings:false,
    };
  },
  created() {
  },
  methods: {
    incrementPlayer(amount) {
      if(this.playerCount+amount >= 2 
        && this.playerCount+amount <= 4) {
        this.playerCount+=amount;
      }
    },
  },
});