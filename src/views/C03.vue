<template>
   <div
  id="wrapper"
  class="wrapper"
  :style="{ backgroundImage: `url(${bgImage})` }"
>
      <div id="content">
        <ul></ul>
        <div id="punkty"></div>
        
        <div id="WYJ_AO_3NE1" style="top:141px; left:194px;">
          <span class="lowered">{{ points.WYJ_AO_3NE1 ? 'ON' : 'OFF' }}</span>
        </div>
        <div id="YJ_AO_3NE1_img" v-if="points.WYJ_AO_3NV1 === 1">
          <img src="@/assets/img/Nagrzewnica_elektryczna_poz.gif" style="position:absolute; top:133px; left: 95px;">
        </div>
        <div id="POMIAR_3TE1" style="top:219px; left:106px;">
          <span class="lowered" >{{ points.POMIAR_03TE1 }}°C</span>
        </div>
        <div id="POMIAR_03THE1_T" style="top:381px; left:406px;">
          <span class="lowered">{{ points.POMIAR_03THE1_T }}°C</span>
        </div>
        <div id="POMIAR_03THE1_H" style="top:416px; left:406px;">
          <span class="lowered">{{ points.POMIAR_03THE1_H }}%</span>
        </div>
        <div id="SYGN_03PJ1_img" v-if="points.SYGN_03PJ1 === 1">
          <img src="@/assets/img/Filtr_lewy_brudny_pion.gif" style="position:absolute; top:274px; left: 96px;">
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import bg03 from '@/assets/img/03.png';

export default {
  name: 'ConfigurationSystemC23',

  data() {
    return {
      points: {},
      bgImage: bg03,
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

          response.data
            .filter(item => /_03(?!\d)/.test(item.Name))
            .forEach(item => {
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
  