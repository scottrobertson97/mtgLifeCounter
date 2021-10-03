app.component("coin", {
  template:
    /*html*/
    `<div style="width: 100%;text-align: center;height:40%; display:flex;align-items:center;">
		<div style="margin:auto;">
			<h1 @click="flipCoin" class="pointer"
			>Click to flip</h1>
			<div @click="flipCoin" class="pointer"
				:style="{transform:'scaleX('+coinWidth+')'}" 
				style="background-color:gray;display:flex;align-items:center;margin:auto;border: 5px solid black; height: 100px; width:100px;border-radius:100px;"
			>
				<h1 v-show="showCoin" style="margin:auto;font-size:75px;">{{coin}}</h1>
			</div>
		</div>
	</div>`,
  props: {},
  data() {
    return {
      coin: "",
      coinWidth: 1,
      shrinkCoin: true,
      animationId: null,
      spinCount: 0,
      showCoin: false,
    };
  },
  created() {
    // setInterval(this.animateCoin, 20);
  },
  computed: {},
  methods: {
    flipCoin() {
      if (!this.animationId) {
        this.showCoin = false;
        this.animationId = setInterval(this.animateCoin, 10);
        console.log(this.animationId);
        this.coin = Math.floor(Math.random() * 2) == 0 ? "H" : "T";
      }
    },
    animateCoin() {
      if (this.coinWidth >= 1) {
        this.shrinkCoin = true;
        this.spinCount++;
        if (this.spinCount > 3) {
          this.coinWidth = 1;
          clearInterval(this.animationId);
          this.showCoin = true;
          this.spinCount = 0;
          this.animationId = null;
          this.$emit(
            "addHistory",
            `The coin was flipped ${this.coin == "H" ? "Heads" : "Tails"}.`
          );
          return;
        }
      }
      if (this.coinWidth <= 0) this.shrinkCoin = false;
      if (this.shrinkCoin) this.coinWidth -= 0.08;
      else this.coinWidth += 0.08;
    },
  },
});
