<template>
  <div id="wrapper" class="wrapper" :style="{ backgroundImage: `url(${require('@/assets/img/C0.png')})` }">
    <div id="content">
      <ul></ul>
      <div id="punkty"></div>

      <div id="WYJ_DO_PCT" class="lowered" style="top:210px; left:246px;">
        <span class="lowered">
          {{ (points.WYJ_DO_PCT === 1 || points.WYJ_DO_PCT1 === 1) ? 'ON' : 'OFF' }}
        </span>
      </div>

      <div id="WYJ_DO_PCT_img" v-if="points.WYJ_DO_PCT === 1">
        <img :src="require('@/assets/img/Pompa_praca.gif')" style="position:absolute; top:171px; left:413px;">
      </div>

      <div id="WYJ_DO_PCT1_img" v-if="points.WYJ_DO_PCT1 === 1">
        <img :src="require('@/assets/img/Pompa_praca.gif')" style="position:absolute; top:217px; left:413px;">
      </div>

      <div id="POMIAR_0TE1" style="top:-20px; left:47px;">
        <span class="lowered">{{ points.POMIAR_0TE1 }}°C</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CentralaNr0',

  data() {
    return {
      points: {
        WYJ_DO_PCT: 0,
        WYJ_DO_PCT1: 0,
        POMIAR_0TE1: 0
      },
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
          const updatedPoints = {
            WYJ_DO_PCT: 0,
            WYJ_DO_PCT1: 0,
            POMIAR_0TE1: 0
          };

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

#wrapper {
  background-image: url('@/assets/img/C0.png');
}

#WYJ_DO_PCT,
#WYJ_DO_PCT_img,
#WYJ_DO_PCT1_img,
#POMIAR_0TE1 {
  position: absolute;
}

.lowered {
  display: inline-block;
  transform: translateY(13px);
  font-size: 0.9em;
}
</style>