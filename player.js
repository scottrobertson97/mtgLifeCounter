app.component("player", {
  template:
  /*html*/
  `<div class="player" v-bind:style="[playerColor, playerSizing]" :class="{half:isHalf, quarter:isQuarter, third:isThird}">
    <div class="playerContent" v-bind:style="playerContentSizingAndRotation">
      <div class="controls">
        <div v-show="isHalf" style="flex-grow:1;"></div>
        <div class="settings" 
          @click="showColorPicker=!showColorPicker"
          ><span v-if="showColorPicker" :style="isHalf?{marginRight:'10px'}:{}">X</span>
          <span v-else>&bull;&bull;&bull;</span>
        </div>
      </div>
      <div class="lifeControls" v-show="!showColorPicker">
        <div class="minus" @click="incrementLife(-1)">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAxMGgyNHY0aC0yNHoiLz48L3N2Zz4=">
        </div>
        <div class="lifeCounter">        
          <p class="lifeIncrement"
            v-show="showLifeIncrementAmount"
            >{{lifeIncrementAmount > 0 ? '+'+lifeIncrementAmount:lifeIncrementAmount}}
          </p>
          <p class="life">{{life}}</p>
        </div>        
        <div class="plus" @click="incrementLife(1)">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMTBoLTEwdi0xMGgtNHYxMGgtMTB2NGgxMHYxMGg0di0xMGgxMHoiLz48L3N2Zz4=">
        </div>
      </div>
      <div class="settingsControls" v-show="showColorPicker">
        <div class="colorpicker">
          <span 
            class="colorCircle"
            v-for="color in colors"
            v-bind:style="{backgroundColor: color}"
            @click="setColor(color)"
          ></span>
        </div>
      </div>
    </div>
  </div>`,
  props: {
    playerCount: Number,
    index: Number
  },  
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
      appHeight: document.getElementById('app').offsetHeight,
      appWidth: document.getElementById('app').offsetWidth,
    };
  },
  mounted: function () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  created(){
    if(this.colors[this.index-1]) this.playerColor = {backgroundColor: this.colors[this.index-1]};
    else this.playerColor = {backgroundColor: this.colors[0]};
  },
  computed:{
    isHalf() {
      return this.playerCount < 3 || (this.playerCount == 3 && this.index == 3);
    },
    isQuarter(){
      return (this.playerCount > 2 && this.playerCount <= 4)
        || (this.playerCount == 5 && this.index >= 4);
    },
    isThird(){
      return this.playerCount == 6 || (this.playerCount == 5 && this.index < 4);
    },
    playerSizing() {
      return {
        'width': this.isHalf ? `${this.appWidth}px` : `${this.appWidth/2}px`,
        'height': this.isThird ? `${this.appHeight/3}px` : `${this.appHeight/2}px`,     
      };
    },
    playerContentSizingAndRotation(){
      return {
        'width': this.isHalf ? `${this.appWidth}px` 
          :this.isQuarter ? `${this.appHeight/2}px`
          :`${this.appHeight/3}px`,
        'height': this.isHalf ? `${this.appHeight/2}px`:`${this.appWidth/2}px`,
        'transform': this.isHalf && this.index == 1 ? 'rotate(180deg)'
          :this.isHalf ? ''
          :((this.index == 1 || this.index == 3) && this.playerCount < 5)
            ||((this.index <= 3) && this.playerCount >= 5) 
            ? `rotate(90deg)translateX(-${this.appWidth/2}px)`
          :this.isQuarter ? `rotate(-90deg)translateX(-${this.appHeight/2}px)`
          : `rotate(-90deg)translateX(-${this.appHeight/3}px)`,
        'transform-origin': this.isHalf ? '' : 
          ((this.index == 1 || this.index == 3) && this.playerCount < 5)
          || ((this.index <= 3) && this.playerCount >= 5)? 'bottom left' : 'top left',
        'flex-direction': this.isThird ? 'column-reverse':'column',
      }
    }
  },
  methods:{
    handleResize () {
      this.appHeight = document.getElementById('app').offsetHeight;
      this.appWidth = document.getElementById('app').offsetWidth;
    },
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