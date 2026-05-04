<template>
  <div id="wrapper" class="wrapper" :style="{ backgroundImage: `url(${require('@/assets/img/C3.png')})` }">
    <div id="content">
      <ul></ul>
      <div id="punkty"></div>

      <div id="WYJ_AO_N3_img" v-if="points.WYJ_AO_N3 === 1">
        <img src="@/assets/img/Wentylator_prawy_praca.gif" style="position:absolute; top:99px; left:536px;">
      </div>
      <div id="WYJ_AO_N3" style="top:177px; left:535px;">
        <span class="lowered">{{ points.WYJ_AO_N3 ? 'ON' : 'OFF' }}</span>
      </div>

      <div id="WYJ_AO_W3_img" v-if="points.WYJ_AO_W3 === 1">
        <img src="@/assets/img/Wentylator_lewy_praca.gif" style="position:absolute; top:38px; left:537px;">
      </div>
      <div id="WYJ_AO_W3" style="top:-45px; left:529px;">
        <span class="lowered">{{ points.WYJ_AO_W3 ? 'ON' : 'OFF' }}</span>
      </div>

      <div id="POMIAR_3TE1" style="top:104px; left:774px;">
        <span class="lowered">{{ points.POMIAR_3TE1 }}°C</span>
      </div>
      <div id="POMIAR_3TE2" style="top:29px; left:773px;">
        <span class="lowered">{{ points.POMIAR_3TE2 }}°C</span>
      </div>
      <div id="POMIAR_3TE3" style="top:108px; left:240px;">
        <span class="lowered">{{ points.POMIAR_3TE3 }}°C</span>
      </div>

      <div id="WYJ_AO_3NE1_img" v-if="points.WYJ_AO_3NE1 === 1">
        <img src="@/assets/img/Nagrzewnica_elektryczna.gif" style="position:absolute; top:20px; left:244px;">
      </div>
      <div id="WYJ_AO_3NE1" style="top:-44px; left:237px;">
        <span class="lowered">{{ points.WYJ_AO_3NE1 ? 'ON' : 'OFF' }}</span>
      </div>

      <div id="WYJ_AO_3NV1" style="top:180px; left:341px;">
        <span class="lowered">{{ points.WYJ_AO_3NV1 ? 'ON' : 'OFF' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'C3ConfigurationSystem',

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
      axios.get('http://192.168.1.155:1880/C3.json') // 👈 bez zmian
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
