<template>
    <div id="wrapper" class="wrapper" :style="{ backgroundImage: `url(${require('@/assets/img/1_6.png')})` }">
      <div id="content">
        <ul></ul>
        <div id="punkty"></div>
  
<div id="WYJ_DO_WD5" style="top:68px; left:373px;">
  <span class="lowered">
    {{ Number(points.WYJ_DO_WD5) === 1 ? 'ON' : 'OFF' }}
  </span>
</div>

<div id="POMIAR_1_6TE1" style="top:243px; left:415px;">
  <span class="lowered">
    {{ points.POMIAR_1_6TE1 ?? '---' }}°C
  </span>
</div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  name: 'ConfigurationSystemD6',

  data() {
    return {
      points: {},
      intervalId: null
    };
  },

  mounted() {
    this.fetchData();
    this.startAutoRefresh();
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  },

  beforeUnmount() {
    this.stopAutoRefresh();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },

  methods: {
    fetchData() {
  axios.get('http://192.168.1.155:1880/api/wentylatornia-values')
    .then(response => {
      const data = response.data.values || {};

      this.points = {
        POMIAR_1_6TE1: data.t09059?.value,
        WYJ_DO_WD5: data.s09083?.value
      };
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
},

    startAutoRefresh() {
      if (this.intervalId) return;

      this.intervalId = setInterval(() => {
        if (!document.hidden) {
          this.fetchData();
        }
      }, 10000);
    },

    stopAutoRefresh() {
      if (!this.intervalId) return;

      clearInterval(this.intervalId);
      this.intervalId = null;
    },

    handleVisibilityChange() {
      if (document.hidden) {
        this.stopAutoRefresh();
      } else {
        this.fetchData();
        this.startAutoRefresh();
      }
    }
  }
};
</script>
<style scoped>
#WYJ_DO_WD5,
#POMIAR_1_6TE1 {
  position: absolute;
}

#WYJ_DO_WD5 .lowered,
#POMIAR_1_6TE1 .lowered {
  position: relative;
  top: 14px;
}
</style>
  