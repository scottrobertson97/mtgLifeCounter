app.component("player", {
  props: {
    playerCount: Number,
    index: Number
  },
  template:
  /*html*/
  `<div class="player" v-bind:style="[playerColor, playerSizing]" :class="{half:isHalf, quarter:!isHalf}">
    <div class="playerContent" v-bind:style="playerContentSizingAndRotation">
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
        <div class="minus" @click="incrementLife(-1)"><p>-</p></div>
        <div class="lifeCounter">        
          <p class="lifeIncrement"
            v-show="showLifeIncrementAmount"
            >{{lifeIncrementAmount > 0 ? '+'+lifeIncrementAmount:lifeIncrementAmount}}
          </p>
          <p class="life">{{life}}</p>
        </div>        
        <div class="plus" @click="incrementLife(1)"><p>+</p></div>
      </div>
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
  created(){
    this.playerColor = {backgroundColor: this.colors[this.index-1]};
  },
  computed:{
    isHalf() {
      console.log(this.playerCount);
      console.log(this.playerCount < 3 || (this.playerCount == 3 && this.index == 3));
      return this.playerCount < 3 || (this.playerCount == 3 && this.index == 3);
    },    
    playerSizing() {
      return {
        'width': this.isHalf ? '100vw' : '50vw',
        'height': this.playerCount > 4 ? '33vh' : '50vh',        
      };
    },
    playerContentSizingAndRotation(){
      return {
        'width': this.isHalf ? '100vw' : '50vh',
        'height': this.isHalf ? '50vh' : '50vw',
        'transform': this.isHalf && this.index == 1 ? 'rotate(180deg)' :
          this.isHalf ? '' :
          this.index == 1 || this.index == 3 ? 'rotate(90deg)translateX(-50vw)' :
          'rotate(-90deg)translateX(-50vh)',
        'transform-origin': this.isHalf ? '' : 
          this.index == 1 || this.index == 3 ? 'bottom left' : 'top left',
      }
    }
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