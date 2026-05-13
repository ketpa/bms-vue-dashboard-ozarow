<template>
  <div id="wrapper" class="wrapper" :style="{ backgroundImage: `url(${require('@/assets/img/C3.png')})` }">
    <div id="content">
      <ul></ul>
      <div id="punkty"></div>

      <div id="WYJ_AO_N3_img" v-if="points.WYJ_AO_N3 === 1">
        <img src="@/assets/img/Wentylator_prawy_praca.gif" style="position:absolute; top:99px; left:536px;">
      </div>
      <div id="WYJ_AO_N3" class="sensor-box" style="top:177px; left:535px;">
  <div class="sensor-name">N3</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_N3 ? 'ON' : 'OFF' }}
  </div>
</div>

      <div id="WYJ_AO_W3_img" v-if="points.WYJ_AO_W3 === 1">
        <img src="@/assets/img/Wentylator_lewy_praca.gif" style="position:absolute; top:38px; left:537px;">
      </div>
      <div id="WYJ_AO_W3" class="sensor-box" style="top:-45px; left:529px;">
  <div class="sensor-name">W3</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_W3 ? 'ON' : 'OFF' }}
  </div>
</div>

<div id="POMIAR_3TE1" class="sensor-box" style="top:104px; left:774px;">
  <div class="sensor-name">3TE1</div>
  <div class="sensor-value">
    {{ points.POMIAR_3TE1 }}°C
  </div>
</div>

<div id="POMIAR_3TE2" class="sensor-box" style="top:29px; left:773px;">
  <div class="sensor-name">3TE2</div>
  <div class="sensor-value">
    {{ points.POMIAR_3TE2 }}°C
  </div>
</div>

<div id="POMIAR_3TE3" class="sensor-box" style="top:108px; left:240px;">
  <div class="sensor-name">3TE3</div>
  <div class="sensor-value">
    {{ points.POMIAR_3TE3 }}°C
  </div>
</div>

      <div id="WYJ_AO_3NE1_img" v-if="points.WYJ_AO_3NE1 === 1">
        <img src="@/assets/img/Nagrzewnica_elektryczna.gif" style="position:absolute; top:20px; left:244px;">
      </div>
      <div id="WYJ_AO_3NE1" class="sensor-box" style="top:-44px; left:237px;">
  <div class="sensor-name">3NE1</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_3NE1 ? 'ON' : 'OFF' }}
  </div>
</div>

<div id="WYJ_AO_3NV1" class="sensor-box" style="top:180px; left:341px;">
  <div class="sensor-name">3NV1</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_3NV1 ? 'ON' : 'OFF' }}
  </div>
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
.sensor-box {
  width: 64px;
  height: 32px;

  background: #e9e9e9;
  border: 1px solid #7d7d7d;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  font-family: Arial, Helvetica, sans-serif;

  padding-top: 0px;

  transform: translateY(4px);
  overflow: hidden;
}

.sensor-name {
  font-size: 12px;
  font-weight: bold;

  margin-top: -2px;
}

.sensor-value {
  font-size: 13px;
  line-height: 13px;
  color: #000;
}
.sensor-name,
.sensor-value {
  background: transparent;
}
.sensor-box {
  border-top: none;
}
</style>
