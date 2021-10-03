const app = Vue.createApp({
  data() {
    return {
      IMAGES: IMAGES,
      playerCount: 2,
      showGlobalSettings: false,
      settingOptions: [
        { option: "playercount", img: IMAGES.PEOPLE },
        { option: "reset", click: this.resetLife, img: IMAGES.RESET },
        { option: "coin", img: IMAGES.COIN },
        { option: "history", img: IMAGES.HISTORY },
        { option: "startinglife", img: IMAGES.LIFE },
      ],
      settingState: "global",
      defaultLife: 20,
      reset: false,
      history: [],
      lifeChange: false,
    };
  },
  created() {},
  computed: {
    showThirds() {
      return this.playerCount > 4;
    },
  },
  methods: {
    incrementPlayer(amount) {
      if (this.playerCount + amount >= 2 && this.playerCount + amount <= 6) {
        this.playerCount += amount;
        this.addHistory(
          `A player was ${amount > 0 ? "added to" : "removed from"} the game.`
        );
      }
    },
    resetLife(startingLifeChange) {
      this.reset = !this.reset;
      if (startingLifeChange) return;
      this.showGlobalSettings = false;
      this.settingState = "global";
      this.addHistory(`All player's life was reset.`);
    },
    changeStartingLife(e) {
      this.defaultLife = Math.trunc(Number(e.target.value));
      this.lifeChange = true;
    },
    addHistory(h) {
      this.history.push(h);
    },
    closeSetting(setting) {
      switch (setting) {
        case "startinglife":
          if (this.lifeChange) {
            this.resetLife(true);
            this.addHistory(`Starting life was set to ${this.defaultLife}.`);
            this.lifeChange = false;
          }
          break;
        default:
          break;
      }
    },
  },
});
