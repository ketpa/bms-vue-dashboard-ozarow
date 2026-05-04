<template>
  <div id="wrapper" class="wrapper" :style="{ backgroundImage: `url(${require('@/assets/img/CH1.png')})` }">
    <div id="content">
      <ul></ul>
      <div id="punkty"></div>
      
      <div id="CH1_Alarmy_img" v-if="points.CH1_Alarmy === 1">
        <img src="@/assets/img/Chiller_alarm.gif" style="position:absolute; top:209px; left: 58px;">
      </div>
      
      <div id="CH1_In" style="position:absolute; top:301px; left: 265px;">
        <span class="lowered">{{ points.CH1_In ? points.CH1_In + '°C' : 'N/A' }}</span>
      </div>
      
      <div id="CH1_Out" style="position:absolute; top:217px; left: 265px;">
        <span class="lowered">{{ points.CH1_Out ? points.CH1_Out + '°C' : 'N/A' }}</span>
      </div>
      
      <div id="CH1_Praca" style="position:absolute; top:164px; left: 130px;">
        <span class="lowered">{{ points.CH1_Praca ? 'ON' : 'OFF' }}</span>
      </div>
      
      <div id="CH1_Praca_img" v-if="points.CH1_Praca === 1">
        <img src="@/assets/img/Chiller_praca.gif" style="position:absolute; top:209px; left: 58px;">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CH1System',

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
      axios.get('http://192.168.1.155:1880/CH1json.json')
        .then(response => {
          const updatedPoints = {};

          response.data.forEach(item => {
            updatedPoints[item.Name] = item.Value;
          });

          this.points = updatedPoints;
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
@import url('@/assets/css/mainC19.css');

.lowered {
  display: inline-block;
  transform: translateY(15px);
  font-size: 0.9em; /* Zmniejszenie czcionki o 1px */
}

#wrapper {
  top: 100px;
}

#content {
  min-width: 100%;
  min-height: 100%;
}
</style>
