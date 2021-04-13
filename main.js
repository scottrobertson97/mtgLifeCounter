const app = Vue.createApp({
  data() {
    return {
      playerCount: 2,
      showGlobalSettings:false,
    };
  },
  created() {
  },
  computed: {
    showThirds(){
      return this.playerCount > 4;
    },
  },
  methods: {
    incrementPlayer(amount) {
      if(this.playerCount+amount >= 2 
        && this.playerCount+amount <= 6) {
        this.playerCount+=amount;
      }
    },
  },
});