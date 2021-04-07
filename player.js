app.component("player", {
  template:
  /*html*/
  `<div class="player" v-bind:style="playerColor">
    <div class="settings" @click="showColorPicker=!showColorPicker">&bull;&bull;&bull;</div>
    <div class="colorpicker" v-show="showColorPicker">
      <p v-for="color in colors"
        v-bind:style="{color: color}"
        @click="setColor(color)"
      >&bull;</p>
    </div>
    <div class="lifecontrols">
      <p class="minus" @click="life--">-</p>
      <p class="life">{{life}}</p>
      <p class="plus" @click="life++">+</p>
    </div>
  </div>`,
  data() {
    return {
      life: 20,
      showColorPicker: false,
      colors: ["var(--mtg-white)", "var(--mtg-blue)", "var(--mtg-black)", "var(--mtg-red)", "var(--mtg-green)"],
      playerColor: "",
    };
  },
  methods:{
    setColor(color){
      console.log(color);
      this.showColorPicker = false;
      this.playerColor = {"background-color": color};
    }
  },
});