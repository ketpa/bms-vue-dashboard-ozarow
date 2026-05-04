<template>
  <div id="wrapper">
    <div id="content">
      <ul></ul>
      <div id="punkty"></div>
      <div id="divplus"></div>
      
      <div id="SYGN_1PJ1_img" v-if="points.SYGN_1PJ1 === 1">
        <img src="@/assets/img/Filtr_prawy_brudny.gif" style="position:absolute; top:415px; left: 239px;">
      </div>
      <div id="SYGN_1PJ1" >
        <span class="lowered">{{ points.SYGN_1PJ1 ? 'ON' : 'OFF' }}</span>
      </div>
      <div id="SYGN_1PJ2" >
        <span class="lowered">{{ points.SYGN_1PJ2 ? 'ON' : 'OFF' }}</span>
      </div>
      <div id="SYGN_1PJ2_img" v-if="points.SYGN_1PJ2 === 1">
        <img src="@/assets/img/Filtr_prawy_brudny.gif" style="position:absolute; top:416px; left: 843px;">
      </div>
      <div id="SYGN_1PJ4" >
        <span class="lowered">{{ points.SYGN_1PJ4 ? 'ON' : 'OFF' }}</span>
      </div>
      <div id="SYGN_1PJ4_img" v-if="points.SYGN_1PJ4 === 1">
        <img src="@/assets/img/Filtr_lewy_brudny.gif" height="77" style="position:absolute; top:169px; left: 609px;">
      </div>
      <div id="SYGN_1PJ5" >
        <span class="lowered">{{ points.SYGN_1PJ5 ? 'ON' : 'OFF' }}</span>
      </div>
      <div id="SYGN_1PJ5_img" v-if="points.SYGN_1PJ5 === 1">
        <img src="@/assets/img/Filtr_lewy_brudny.gif" height="77" style="position:absolute; top:170px; left: 533px;">
      </div>
      <div id="WYJ_AO_N1_1_img" v-if="points.WYJ_AO_N1_1 === 1">
        <img src="@/assets/img/Wentylator_prawy_praca.gif" style="position:absolute; top:420px; left: 381px;">
      </div>
      <div id="WYJ_AO_W1_img" v-if="points.WYJ_AO_W1 === 1">
        <img src="@/assets/img/Wentylator_lewy_praca.gif" style="position:absolute; top:189px; left: 229px;">
      </div>
      <div id="WYJ_DO_WD1_img" v-if="points.WYJ_DO_WD1 === 1">
        <img src="@/assets/img/Nagrzewnica_wymiennikG.gif" style="position:absolute; top:171px; left: 335px;">
      </div>
      <div id="WYJ_DO_W2A_img"></div>
      <div id="WYJ_DO_WD1_img"></div>
      <div id="WYJ_DO_1PO1" >
        <span class="lowered">{{ points.WYJ_DO_1PO1 ? 'ON' : 'OFF' }}</span>
      </div>
      <div id="WYJ_DO_1PO2" >
        <span class="lowered">{{ points.WYJ_DO_1PO2 ? 'ON' : 'OFF' }}</span>
      </div>
      <div id="WYJ_DO_1PO3" >
        <span class="lowered">{{ points.WYJ_DO_1PO3 ? 'ON' : 'OFF' }}</span>
      </div>
      <div id="WYJ_AO_N1_1" >
        <span class="lowered">{{ points.WYJ_AO_N1_1 ? 'ON' : 'OFF' }}</span>
      </div>
      <div id="WYJ_AO_W1" >
        <span class="lowered">{{ points.WYJ_AO_W1 ? 'ON' : 'OFF' }}</span>
      </div>
      <div id="WYJ_DO_1PO1_img" v-if="points.WYJ_DO_1PO1 === 1">
        <img src="@/assets/img/Pompa_praca.gif" style="position:absolute; top:548px; left: 445px;">
      </div>
      <div id="WYJ_DO_1PO2_img" v-if="points.WYJ_DO_1PO2 === 1">
        <img src="@/assets/img/Pompa_praca.gif" style="position:absolute; top:548px; left: 745px;">
      </div>
      <div id="WYJ_DO_1PO3_img" v-if="points.WYJ_DO_1PO3 === 1">
        <img src="@/assets/img/Pompa_praca.gif" style="position:absolute; top:284px; left: 294px;">
      </div>
      <div id="WYJ_DO_1NV1"><span class="lowered">{{ points.WYJ_DO_1NV1 }}%</span></div>
      <div id="WYJ_AO_1NV2"><span class="lowered">{{ points.WYJ_AO_1NV2 }}%</span></div>
      <div id="WYJ_AO_1NV3"><span class="lowered">{{ points.WYJ_AO_1NV3 }}%</span></div>
      <div id="WYJ_AO_1NV4"><span class="lowered">{{ points.WYJ_AO_1NV4 }}%</span></div>
      <div id="WYJ_AO_1NV5"><span class="lowered">{{ points.WYJ_AO_1NV5 }}%</span></div>
      <div id="WYJ_AO_1NV6"><span class="lowered">{{ points.WYJ_AO_1NV6 }}%</span></div>
      <div id="WYJ_AO_1NP1"><span class="lowered">{{ points.WYJ_AO_1NP1 }}%</span></div>
      <div id="WYJ_AO_1NV2_img" v-if="points.WYJ_AO_1NV2 === 1">
        <img src="@/assets/img/Nagrzewnica_wodna_100.gif" style="position:absolute; top:415px; left: 486px;">
      </div>
      <div id="WYJ_AO_1NV3_img" v-if="points.WYJ_AO_1NV3 === 1">
        <img src="@/assets/img/Chlodnica_wodna_100.gif" style="position:absolute; top:416px; left: 636px;">
      </div>
      <div id="WYJ_AO_1NV4_img" v-if="points.WYJ_AO_1NV4 === 1">
        <img src="@/assets/img/Nagrzewnica_wodna_100.gif" style="position:absolute; top:415px; left: 786px;">
      </div>
      <div id="WYJ_AO_1NV5_img"></div>
      <div id="WYJ_AO_1NV6_img" v-if="points.WYJ_AO_1NV6 === 1">
        <img src="@/assets/img/Przepustnica_pozioma_100.gif" style="position:absolute; top:171px; left: 467px;">
      </div>
      <div id="WYJ_DO_1NV1_img" v-if="points.WYJ_DO_1NV1 === 1">
        <img src="@/assets/img/Przepustnica_pozioma_100.gif" style="position:absolute; top:416px; left: 163px;">
      </div>
      <div id="WYJ_AO_1NP1_img" v-if="points.WYJ_AO_1NP1 === 1">
        <img src="@/assets/img/Nawilzacz_parowy_1.gif" style="position:absolute; top:422px; left: 942px;">
      </div>
      <div id="SYGN_1HJ1"><span class="lowered">{{ points.SYGN_1HJ1 }}°C</span></div>
      
      <!-- POMIAR punkty -->
      <div id="POMIAR_1TE1">
        <span class="lowered">{{ points.POMIAR_1TE1 }}°C</span>
      </div>
      <div id="POMIAR_1TE2">
        <span class="lowered">{{ points.POMIAR_1TE2 }}°C</span>
      </div>
      <div id="POMIAR_1THE1_T">
        <span class="lowered">{{ points.POMIAR_1THE1_T }}°C</span>
      </div>
      <div id="POMIAR_1THE1_H">
        <span class="lowered">{{ points.POMIAR_1THE1_H }}%</span>
      </div>
      <div id="POMIAR_1THE2_T">
        <span class="lowered">{{ points.POMIAR_1THE2_T }}°C</span>
      </div>
      <div id="POMIAR_1THE2_H">
        <span class="lowered">{{ points.POMIAR_1THE2_H }}%</span>
      </div>
      <div id="POMIAR_1PE1">
        <span class="lowered">{{ points.POMIAR_1PE1 }} Pa</span>
      </div>
      <div id="POMIAR_1PE2">
        <span class="lowered">{{ points.POMIAR_1PE2 }} Pa</span>
      </div>
      <div id="POMIAR_1PE3">
        <span class="lowered">{{ points.POMIAR_1PE3 }} Pa</span>
      </div>
      <div id="POMIAR_1THE1_X">
        <span class="lowered">{{ points.POMIAR_1THE1_X }}</span>
      </div>
      <div id="POMIAR_0TE1">
        <span class="lowered" >{{ points.POMIAR_0TE1 }}°C</span>
      </div>
      
      <div id="SYGN_NW2" >
        <span class="lowered">{{ points.SYGN_NW2 ? 'ON' : 'OFF' }}</span>
      </div>
      <div id="WYJ_AO_W_1" >
        <span class="lowered">{{ points.WYJ_AO_W_1 ? 'ON' : 'OFF' }}</span>
      </div>
      <div id="WYJ_AO_W_1_img" v-if="points.WYJ_AO_W_1 === 1">
        <img src="@/assets/img/Wentylator_prawy_praca.gif" style="position:absolute; top:24px; left: 455px;">
      </div>
      <div id="WYJ_AO_W_2" >
        <span class="lowered">{{ points.WYJ_AO_W_2 ? 'ON' : 'OFF' }}</span>
      </div>
      <div id="WYJ_AO_W_2_img" v-if="points.WYJ_AO_W_2 === 1">
        <img src="@/assets/img/Wentylator_prawy_praca.gif" style="position:absolute; top:24px; left: 304px;">
      </div>
      <div id="slonce" style="position:absolute; top:1px; left: 1018px;"></div>
      <div id="SAP" class="lowered" style="font-size:32px">{{ points.SAP }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'C1Centrala',

  data() {
    return {
      points: {
        SYGN_1PJ1: 0,
        SYGN_1PJ2: 0,
        SYGN_1PJ4: 0,
        SYGN_1PJ5: 0,
        WYJ_AO_N1_1: 0,
        WYJ_AO_W1: 0,
        WYJ_DO_WD1: 0,
        WYJ_DO_1PO1: 0,
        WYJ_DO_1PO2: 0,
        WYJ_DO_1PO3: 0,
        WYJ_DO_1NV1: 0,
        WYJ_AO_1NV2: 0,
        WYJ_AO_1NV3: 0,
        WYJ_AO_1NV4: 0,
        WYJ_AO_1NV5: 0,
        WYJ_AO_1NV6: 0,
        WYJ_AO_1NP1: 0,
        SYGN_1HJ1: 0,
        POMIAR_1TE1: 0,
        POMIAR_1TE2: 0,
        POMIAR_1THE1_T: 0,
        POMIAR_1THE1_H: 0,
        POMIAR_1THE2_T: 0,
        POMIAR_1THE2_H: 0,
        POMIAR_1PE1: 0,
        POMIAR_1PE2: 0,
        POMIAR_1PE3: 0,
        SYGN_NW2: 0,
        WYJ_AO_W_1: 0,
        WYJ_AO_W_2: 0,
        POMIAR_1THE1_X: 0,
        POMIAR_0TE1: 0,
        SAP: ''
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
          response.data.forEach(item => {
            this.points[item.Name] = item.Value;
          });
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
@import url('@/assets/css/mainC1.css');

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Ukrywa poziomy pasek przewijania */
  overflow-y: auto; /* Pozostawia pionowy pasek przewijania, jeśli jest potrzebny */
}
.lowered {
  display: inline-block;
  transform: translateY(15px);
  font-size: 0.9em; /* Zmniejszenie czcionki o 1px */
}

#wrapper {
	background-image: url('@/assets//img/C1.png');
	background-repeat: no-repeat;
	position: relative;
	top: 100px;
	width: 1250px;
	height: 900px;
	min-height: 100vh; /* Zapewnia, że wrapper rozciągnie się na całą wysokość ekranu */
  min-width:100vh;
	margin-left: auto;
	margin-right: auto;
	z-index: 0;
  }



</style>
