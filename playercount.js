app.component("playercount", {
  template:
    /*html*/
    `<div id="playerCountSettings">
    <div class="plus" @click="$emit('increment-player', +1)">
      <img :src="IMAGES.PLUS">
    </div>          
    <div id="playerCount">
      <div>
        <img v-for="i in playerCount" :src="IMAGES.PERSON">
      </div>
    </div>
    <div class="minus" @click="$emit('increment-player', -1)">
      <img :src="IMAGES.MINUS">
    </div>
  </div>`,
  props: {
    playerCount: Number,
  },
  data() {
    return {
      IMAGES: IMAGES,
    };
  },
  computed: {},
  methods: {},
});
