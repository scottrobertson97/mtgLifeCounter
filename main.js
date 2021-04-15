const app = Vue.createApp({
  data() {
    return {
      playerCount: 2,
      showGlobalSettings:false,
      settingOptions:[
        {option:'playercount', click(){}, img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTcuOTk3IDE4aC0xMS45OTVsLS4wMDItLjYyM2MwLTEuMjU5LjEtMS45ODYgMS41ODgtMi4zMyAxLjY4NC0uMzg5IDMuMzQ0LS43MzYgMi41NDUtMi4yMDktMi4zNjYtNC4zNjMtLjY3NC02LjgzOCAxLjg2Ni02LjgzOCAyLjQ5MSAwIDQuMjI2IDIuMzgzIDEuODY2IDYuODM5LS43NzUgMS40NjQuODI2IDEuODEyIDIuNTQ1IDIuMjA5IDEuNDkuMzQ0IDEuNTg5IDEuMDcyIDEuNTg5IDIuMzMzbC0uMDAyLjYxOXptNC44MTEtMi4yMTRjLTEuMjktLjI5OC0yLjQ5LS41NTktMS45MDktMS42NTcgMS43NjktMy4zNDIuNDY5LTUuMTI5LTEuNC01LjEyOS0xLjI2NSAwLTIuMjQ4LjgxNy0yLjI0OCAyLjMyNCAwIDMuOTAzIDIuMjY4IDEuNzcgMi4yNDYgNi42NzZoNC41MDFsLjAwMi0uNDYzYzAtLjk0Ni0uMDc0LTEuNDkzLTEuMTkyLTEuNzUxem0tMjIuODA2IDIuMjE0aDQuNTAxYy0uMDIxLTQuOTA2IDIuMjQ2LTIuNzcyIDIuMjQ2LTYuNjc2IDAtMS41MDctLjk4My0yLjMyNC0yLjI0OC0yLjMyNC0xLjg2OSAwLTMuMTY5IDEuNzg3LTEuMzk5IDUuMTI5LjU4MSAxLjA5OS0uNjE5IDEuMzU5LTEuOTA5IDEuNjU3LTEuMTE5LjI1OC0xLjE5My44MDUtMS4xOTMgMS43NTFsLjAwMi40NjN6Ii8+PC9zdmc+'},
        {option:'reset', click: this.resetLife, img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTMuNSAyYy01LjYyOSAwLTEwLjIxMiA0LjQzNi0xMC40NzUgMTBoLTMuMDI1bDQuNTM3IDUuOTE3IDQuNDYzLTUuOTE3aC0yLjk3NWMuMjYtMy45MDIgMy41MDgtNyA3LjQ3NS03IDQuMTM2IDAgNy41IDMuMzY0IDcuNSA3LjVzLTMuMzY0IDcuNS03LjUgNy41Yy0yLjM4MSAwLTQuNTAyLTEuMTE5LTUuODc2LTIuODU0bC0xLjg0NyAyLjQ0OWMxLjkxOSAyLjA4OCA0LjY2NCAzLjQwNSA3LjcyMyAzLjQwNSA1Ljc5OCAwIDEwLjUtNC43MDIgMTAuNS0xMC41cy00LjcwMi0xMC41LTEwLjUtMTAuNXoiLz48L3N2Zz4='},
        {option:'coin', click:this.flipCoin, img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMmM1LjUxNCAwIDEwIDQuNDg2IDEwIDEwcy00LjQ4NiAxMC0xMCAxMC0xMC00LjQ4Ni0xMC0xMCA0LjQ4Ni0xMCAxMC0xMHptMC0yYy02LjYyNyAwLTEyIDUuMzczLTEyIDEyczUuMzczIDEyIDEyIDEyIDEyLTUuMzczIDEyLTEyLTUuMzczLTEyLTEyLTEyem00IDE0LjA4M2MwLTIuMTQ1LTIuMjMyLTIuNzQyLTMuOTQzLTMuNTQ2LTEuMDM5LS41NC0uOTA4LTEuODI5LjU4MS0xLjkxNi44MjYtLjA1IDEuNjc1LjE5NSAyLjQ0My40NjVsLjM2Mi0xLjY0N2MtLjkwNy0uMjc2LTEuNzE5LS40MDItMi40NDMtLjQyMXYtMS4wMThoLTF2MS4wNjdjLTEuOTQ1LjI2Ny0yLjk4NCAxLjQ4Ny0yLjk4NCAyLjg1IDAgMi40MzggMi44NDcgMi44MSAzLjc3OCAzLjI0MyAxLjI3LjU2OCAxLjAzNSAxLjc1LS4xMTQgMi4wMTEtLjk5Ny4yMjYtMi4yNjktLjE2OC0zLjIyNS0uNTRsLS40NTUgMS42NDRjLjg5NC40NjIgMS45NjUuNzA4IDMgLjcyN3YuOTk4aDF2LTEuMDUzYzEuNjU3LS4yMzIgMy4wMDItMS4xNDYgMy0yLjg2NHoiLz48L3N2Zz4='},
        {option:'history', click(){}, img:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMTJjMCA2LjYyNy01LjM3MyAxMi0xMiAxMnMtMTItNS4zNzMtMTItMTJoMmMwIDUuNTE0IDQuNDg2IDEwIDEwIDEwczEwLTQuNDg2IDEwLTEwLTQuNDg2LTEwLTEwLTEwYy0yLjc3NyAwLTUuMjg3IDEuMTQxLTcuMDk5IDIuOTc3bDIuMDYxIDIuMDYxLTYuOTYyIDEuMzU0IDEuMzA1LTcuMDEzIDIuMTc5IDIuMThjMi4xNzItMi4xOTYgNS4xODItMy41NTkgOC41MTYtMy41NTkgNi42MjcgMCAxMiA1LjM3MyAxMiAxMnptLTEzLTZ2OGg3di0yaC01di02aC0yeiIvPjwvc3ZnPg=='},
        {option:'startinglife', click(){}, img:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMiA2YzEuMTA0IDAgMiAuODk2IDIgMnYxMmMwIDEuMTA0LS44OTYgMi0yIDJoLTIwYy0xLjEwNCAwLTItLjg5Ni0yLTJ2LTEyYzAtMS4xMDQuODk2LTIgMi0yaDV2LTJjMC0xLjEwNC44OTYtMiAyLTJoNmMxLjEwNCAwIDIgLjg5NiAyIDJ2Mmg1em0wIDIuNWMwLS4yNzYtLjIyNC0uNS0uNS0uNWgtMTljLS4yNzYgMC0uNS4yMjQtLjUuNXYxMWMwIC4yNzYuMjI0LjUuNS41aDE5Yy4yNzYgMCAuNS0uMjI0LjUtLjV2LTExem0tOSA0LjVoM3YyaC0zdjNoLTJ2LTNoLTN2LTJoM3YtM2gydjN6bTEuNS05aC01Yy0uMjc2IDAtLjUuMjI0LS41LjV2MS41aDZ2LTEuNWMwLS4yNzYtLjIyNC0uNS0uNS0uNSIvPjwvc3ZnPg=='},
      ],
      settingState:'global',
      defaultLife:20,
      reset:false,
      history:[],
      coin:'heads',
      coinColor:0,
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
        this.history.push(`A player was ${amount>0?'added to':'removed from'} the game.`);
      }
    },
    resetLife(){
      console.log('click');
      this.reset = !this.reset;
      this.showGlobalSettings = false;
      this.settingState = 'global';
      this.history.push(`All player's life was reset.`);
    },
    changeStartingLife(e){
      this.defaultLife = Math.trunc(Number(e.target.value));
      this.resetLife();
      console.log(e);
    },
    flipCoin(){
      this.coin=Math.floor(Math.random()*2) == 0?'Heads':'Tails';
      this.coinColor=Math.floor(Math.random() * 256);
    },
  },
});