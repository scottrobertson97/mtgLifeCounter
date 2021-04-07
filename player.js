app.component("player", {
  template:
  /*html*/
  `<div class="player" v-bind:style="playerColor">
    <div class="controls">      
      <div class="colorpicker" v-show="showColorPicker">
        <span 
          class="colorCircle"
          v-for="color in colors"
          v-bind:style="{backgroundColor: color}"
          @click="setColor(color)"
        ></span>
      </div>
      <div v-show="!showColorPicker" style="flex-grow:1;"></div>
      <div class="settings" 
        @click="showColorPicker=!showColorPicker"
        ><span v-if="showColorPicker" style="margin-right:10px;">X</span>
        <span v-else>&bull;&bull;&bull;</span>
      </div>
    </div>
    <div class="lifecontrols">
      <p class="minus" @click="incrementLife(-1)">-</p>
      <div class="lifeCounter">        
        <p class="lifeIncrement"
          v-show="showLifeIncrementAmount"
          >{{lifeIncrementAmount > 0 ? '+'+lifeIncrementAmount:lifeIncrementAmount}}
        </p>
        <p class="life">{{life}}</p>
      </div>
      
      <p class="plus" @click="incrementLife(1)">+</p>
    </div>
  </div>`,
  data() {
    return {
      life: 20,
      showColorPicker: false,
      colors: ["var(--mtg-white)", "var(--mtg-blue)", "var(--mtg-black)", "var(--mtg-red)", "var(--mtg-green)"],
      playerColor: "",
      settingsText:"\u2022\u2022\u2022",
      lastIncrementTime:0,
      showLifeIncrementAmount: false,
      lifeIncrementAmount:0,
    };
  },
  methods:{
    setColor(color){
      console.log(color);
      this.showColorPicker = false;
      this.playerColor = {backgroundColor: color};
    },
    incrementLife(amount){
      this.life += amount;
      this.lastIncrementTime = Date.now();
      this.showLifeIncrementAmount = true;
      this.lifeIncrementAmount += amount;      

      setTimeout(()=>{
        let now = Date.now();
        if(now - this.lastIncrementTime >= 3000) {
          this.showLifeIncrementAmount = false;
          this.lifeIncrementAmount = 0; 
        }
      }, 3000);
    },
  },
});