<template>
  <div id="wrapper" class="wrapper" :style="{ backgroundImage: `url(${require('@/assets/img/020.png')})` }">
    <div id="content">
      <ul></ul>
      <div id="punkty"></div>
      
      <div id="WYJ_AO_020NE1">
        <span class="lowered">{{ points.WYJ_AO_020NE1 ? 'ON' : 'OFF' }}</span>
      </div>
      <div id="WYJ_AO_020NE1_img" v-if="points.WYJ_AO_020NE1 === 1">
        <img src="@/assets/img/Nagrzewnica_elektryczna_poz.gif" style="position:absolute; top:133px; left: 95px;">
      </div>
      <div id="POMIAR_020TE1">
        <span class="lowered">{{ points.POMIAR_020TE1 }}°C</span>
      </div>
      <div id="POMIAR_020THE1_T">
        <span class="lowered">{{ points.POMIAR_020THE1_T }}°C</span>
      </div>
      <div id="POMIAR_020THE1_H">
        <span class="lowered">{{ points.POMIAR_020THE1_H }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ConfigurationSystemC20',

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
      axios.get('http://192.168.1.155:1880/C1.json')
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
