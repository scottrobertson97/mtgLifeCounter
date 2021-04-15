app.component("playercount", {
	template:
  /*html*/
	`<div id="playerCountSettings">
    <div class="plus" @click="$emit('increment-player', +1)">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMTBoLTEwdi0xMGgtNHYxMGgtMTB2NGgxMHYxMGg0di0xMGgxMHoiLz48L3N2Zz4=">
    </div>          
    <div id="playerCount">
      <div>
        <img v-for="i in playerCount" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjAuODIyIDE4LjA5NmMtMy40MzktLjc5NC02LjY0LTEuNDktNS4wOS00LjQxOCA0LjcyLTguOTEyIDEuMjUxLTEzLjY3OC0zLjczMi0xMy42NzgtNS4wODIgMC04LjQ2NCA0Ljk0OS0zLjczMiAxMy42NzggMS41OTcgMi45NDUtMS43MjUgMy42NDEtNS4wOSA0LjQxOC0zLjA3My43MS0zLjE4OCAyLjIzNi0zLjE3OCA0LjkwNGwuMDA0IDFoMjMuOTlsLjAwNC0uOTY5Yy4wMTItMi42ODgtLjA5Mi00LjIyMi0zLjE3Ni00LjkzNXoiLz48L3N2Zz4=">
      </div>
    </div>
    <div class="minus" @click="$emit('increment-player', -1)">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAxMGgyNHY0aC0yNHoiLz48L3N2Zz4=">
    </div>
  </div>`,
	props:{
		playerCount: Number
	},
	data(){return {};},
	computed:{},
	methods:{},
});