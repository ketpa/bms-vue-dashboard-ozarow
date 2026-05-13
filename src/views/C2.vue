<template>
  <div id="wrapper">
    <div id="content">
      <ul></ul>
      <div id="punkty"></div>
      <div id="divplus"></div>
      
      <div id="SYGN_2PJ1_img" v-if="points.SYGN_2PJ1 === 1">
        <img src="@/assets/img/Filtr_prawy_brudny.gif" style="position:absolute; top:568px; left: 243px;">
      </div>
      <div id="SYGN_2PJ1" class="sensor-box">
  <div class="sensor-name">2PJ1</div>
  <div class="sensor-value">
    {{ points.SYGN_2PJ1 ? 'ON' : 'OFF' }}
  </div>
</div>

<div id="SYGN_2PJ2" class="sensor-box">
  <div class="sensor-name">2PJ2</div>
  <div class="sensor-value">
    {{ points.SYGN_2PJ2 ? 'ON' : 'OFF' }}
  </div>
</div>
      <div id="SYGN_2PJ2_img" v-if="points.SYGN_2PJ2 === 1">
        <img src="@/assets/img/Filtr_prawy_brudny.gif" style="position:absolute; top:569px; left: 850px;">
      </div>
      <div id="SYGN_2PJ3" class="sensor-box">
  <div class="sensor-name">2PJ3</div>
  <div class="sensor-value">
    {{ points.SYGN_2PJ3 ? 'ON' : 'OFF' }}
  </div>
</div>
      <div id="SYGN_2PJ3_img" v-if="points.SYGN_2PJ3 === 1">
        <img src="@/assets/img/Filtr_lewy_brudny.gif" style="position:absolute; top:322px; left: 537px;">
      </div>
      <div id="SYGN_2PJ4" class="sensor-box">
  <div class="sensor-name">2PJ4</div>
  <div class="sensor-value">
    {{ points.SYGN_2PJ4 ? 'ON' : 'OFF' }}
  </div>
</div>
      <div id="SYGN_2PJ4_img" v-if="points.SYGN_2PJ4 === 1">
        <img src="@/assets/img/Filtr_lewy_brudny.gif" style="position:absolute; top:170px; left: 612px;">
      </div>
      <div id="SYGN_2PJ5" class="sensor-box">
  <div class="sensor-name">2PJ5</div>
  <div class="sensor-value">
    {{ points.SYGN_2PJ5 ? 'ON' : 'OFF' }}
  </div>
</div>
      <div id="SYGN_2PJ5_img" v-if="points.SYGN_2PJ5 === 1">
        <img src="@/assets/img/Filtr_lewy_brudny.gif" height="76" style="position:absolute; top:171px; left: 537px;">
      </div>
      <div id="SYGN_2PJ6" class="sensor-box">
  <div class="sensor-name">2PJ6</div>
  <div class="sensor-value">
    {{ points.SYGN_2PJ6 ? 'ON' : 'OFF' }}
  </div>
</div>
      <div id="SYGN_2PJ6_img" v-if="points.SYGN_2PJ6 === 1">
        <img src="@/assets/img/Filtr_lewy_brudny.gif" style="position:absolute; top:171px; left: 461px;">
      </div>
      <div id="WYJ_DO_N2_img" v-if="points.WYJ_DO_N2 === 1">
        <img src="@/assets/img/Wentylator_prawy_praca.gif" style="position:absolute; top:573px; left: 384px;">
      </div>
      <div id="WYJ_DO_W2_img" v-if="points.WYJ_DO_W2 === 1">
        <img src="@/assets/img/Wentylator_lewy_praca.gif" style="position:absolute; top:340px; left: 234px;">
      </div>
      <div id="WYJ_DO_W2A_img" v-if="points.WYJ_DO_W2A === 1">
        <img src="@/assets/img/Wentylator_lewy_praca.gif" style="position:absolute; top:189px; left: 234px;">
      </div>
      <div id="WYJ_DO_WD1_img" v-if="points.WYJ_DO_WD1 === 1">
        <img src="@/assets/img/Nagrzewnica_wymiennikG.gif" style="position:absolute; top:303px; left: 290px;">
      </div>
      <div id="WYJ_DO_2PO1" class="sensor-box">
  <div class="sensor-name">2PO1</div>
  <div class="sensor-value">
    {{ points.WYJ_DO_2PO1 ? 'ON' : 'OFF' }}
  </div>
</div>

<div id="WYJ_DO_2PO2" class="sensor-box">
  <div class="sensor-name">2PO2</div>
  <div class="sensor-value">
    {{ points.WYJ_DO_2PO2 ? 'ON' : 'OFF' }}
  </div>
</div>

<div id="WYJ_DO_2PO3" class="sensor-box">
  <div class="sensor-name">2PO3</div>
  <div class="sensor-value">
    {{ points.WYJ_DO_2PO3 ? 'ON' : 'OFF' }}
  </div>
</div>
      <div id="WYJ_DO_2PO1_img" v-if="points.WYJ_DO_2PO1 === 1">
        <img src="@/assets/img/Pompa_praca.gif" style="position:absolute; top:700px; left: 449px;">
      </div>
      <div id="WYJ_DO_2PO2_img" v-if="points.WYJ_DO_2PO2 === 1">
        <img src="@/assets/img/Pompa_praca.gif" style="position:absolute; top:699px; left: 750px;">
      </div>
      <div id="WYJ_DO_2PO3_img" v-if="points.WYJ_DO_2PO3 === 1">
        <img src="@/assets/img/Pompa_praca.gif" style="position:absolute; top:435px; left: 298px;">
      </div>
      <div id="WYJ_AO_2NV2" class="sensor-box">
  <div class="sensor-name">2NV2</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_2NV2 ? 'ON' : 'OFF' }}
  </div>
</div>
      <div id="WYJ_AO_2NV2_img" v-if="points.WYJ_AO_2NV2 === 1">
        <img src="@/assets/img/Nagrzewnica_wodna_100.gif" style="position:absolute; top:569px; left: 489px;">
      </div>
      <div id="WYJ_AO_2NV3" class="sensor-box">
  <div class="sensor-name">2NV3</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_2NV3 ? 'ON' : 'OFF' }}
  </div>
</div>
      <div id="WYJ_AO_2NV3_img" v-if="points.WYJ_AO_2NV3 === 1">
        <img src="@/assets/img/Chlodnica_wodna_100.gif" style="position:absolute; top:567px; left: 641px;">
      </div>
      <div id="WYJ_AO_2NV4" class="sensor-box">
  <div class="sensor-name">2NV4</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_2NV4 ? 'ON' : 'OFF' }}
  </div>
</div>
      <div id="WYJ_AO_2NV4_img" v-if="points.WYJ_AO_2NV4 === 1">
        <img src="@/assets/img/Nagrzewnica_wodna_100.gif" style="position:absolute; top:567px; left: 790px;">
      </div>
      <div id="WYJ_AO_2NV5" class="sensor-box">
  <div class="sensor-name">2NV5</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_2NV5 ? 'ON' : 'OFF' }}
  </div>
</div>

<div id="WYJ_AO_2NV6" class="sensor-box">
  <div class="sensor-name">2NV6</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_2NV6 ? 'ON' : 'OFF' }}
  </div>
</div>
      <div id="WYJ_AO_2NV6_img" v-if="points.WYJ_AO_2NV6 === 1">
        <img src="@/assets/img/Przepustnica_pozioma_100.gif" style="position:absolute; top:171px; left: 395px;">
      </div>
      <div id="WYJ_DO_2NV1_img" v-if="points.WYJ_DO_2NV1 === 1">
        <img src="@/assets/img/Przepustnica_pozioma_100.gif" style="position:absolute; top:568px; left: 166px;">
      </div>
      <div id="WYJ_AO_2NP1_img" v-if="points.WYJ_AO_2NP1 === 1">
        <img src="@/assets/img/Nawilzacz_parowy_1.gif" style="position:absolute; top:571px; left: 946px;">
      </div>
      <div id="WYJ_AO_2NP1" class="sensor-box">
  <div class="sensor-name">2NP1</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_2NP1 ? 'ON' : 'OFF' }}
  </div>
</div>
      
      <!-- POMIAR punkty -->
      <div id="POMIAR_2TE1" class="sensor-box">
  <div class="sensor-name">2TE1</div>
  <div class="sensor-value">{{ points.POMIAR_2TE1 }}°C</div>
</div>

<div id="POMIAR_2TE2" class="sensor-box">
  <div class="sensor-name">2TE2</div>
  <div class="sensor-value">{{ points.POMIAR_2TE2 }}°C</div>
</div>

<div id="POMIAR_2THE1_T" class="sensor-box">
  <div class="sensor-name">2THE1_T</div>
  <div class="sensor-value">{{ points.POMIAR_2THE1_T }}°C</div>
</div>

<div id="POMIAR_2THE1_H" class="sensor-box">
  <div class="sensor-name">2THE1_H</div>
  <div class="sensor-value">{{ points.POMIAR_2THE1_H }}%</div>
</div>

<div id="POMIAR_2THE2_T" class="sensor-box">
  <div class="sensor-name">2THE2_T</div>
  <div class="sensor-value">{{ points.POMIAR_2THE2_T }}°C</div>
</div>

<div id="POMIAR_2THE2_H" class="sensor-box">
  <div class="sensor-name">2THE2_H</div>
  <div class="sensor-value">{{ points.POMIAR_2THE2_H }}%</div>
</div>

<div id="POMIAR_2PE1" class="sensor-box">
  <div class="sensor-name">2PE1</div>
  <div class="sensor-value">{{ points.POMIAR_2PE1 }} Pa</div>
</div>

<div id="POMIAR_2PE2" class="sensor-box">
  <div class="sensor-name">2PE2</div>
  <div class="sensor-value">{{ points.POMIAR_2PE2 }} Pa</div>
</div>

<div id="POMIAR_2PE3" class="sensor-box">
  <div class="sensor-name">2PE3</div>
  <div class="sensor-value">{{ points.POMIAR_2PE3 }} Pa</div>
</div>

<div id="POMIAR_2THE1_X" class="sensor-box">
  <div class="sensor-name">2THE1_X</div>
  <div class="sensor-value">{{ points.POMIAR_2THE1_X }}</div>
</div>

<div id="POMIAR_0TE1" class="sensor-box">
  <div class="sensor-name">0TE1</div>
  <div class="sensor-value">{{ points.POMIAR_0TE1 }}°C</div>
</div>
      
      <div id="SYGN_2HJ1" class="sensor-box">
  <div class="sensor-name">2HJ1</div>
  <div class="sensor-value">
    {{ points.SYGN_2HJ1 ? 'ON' : 'OFF' }}
  </div>
</div>

<div id="SYGN_NW2" class="sensor-box">
  <div class="sensor-name">NW2</div>
  <div class="sensor-value">
    {{ points.SYGN_NW2 ? 'ON' : 'OFF' }}
  </div>
</div>

<div id="WYJ_AO_W2A" class="sensor-box">
  <div class="sensor-name">W2A</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_W2A ? 'ON' : 'OFF' }}
  </div>
</div>

<div id="WYJ_AO_N2" class="sensor-box">
  <div class="sensor-name">N2</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_N2 ? 'ON' : 'OFF' }}
  </div>
</div>

<div id="WYJ_AO_W2" class="sensor-box">
  <div class="sensor-name">W2</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_W2 ? 'ON' : 'OFF' }}
  </div>
</div>

<div id="WYJ_AO_W_1" class="sensor-box">
  <div class="sensor-name">W_1</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_W_1 ? 'ON' : 'OFF' }}
  </div>
</div>
      <div id="WYJ_AO_W_1_img" v-if="points.WYJ_AO_W_1 === 1">
        <img src="@/assets/img/Wentylator_prawy_praca.gif" style="position:absolute; top:24px; left: 460px;">
      </div>
      <div id="WYJ_AO_W_2" class="sensor-box">
  <div class="sensor-name">W_2</div>
  <div class="sensor-value">
    {{ points.WYJ_AO_W_2 ? 'ON' : 'OFF' }}
  </div>
</div>
      <div id="WYJ_AO_W_2_img" v-if="points.WYJ_AO_W_2 === 1">
        <img src="@/assets/img/Wentylator_prawy_praca.gif" style="position:absolute; top:25px; left: 309px;">
      </div>
      <div id="slonce" style="position:absolute; top:1px; left: 1018px;"></div>
      <div id="SAP" class="lowered" style="font-size:32px">{{ points.SAP }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ConfigurationSystem',

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
      axios.get('http://192.168.1.155:1880/C2.json') // 👈 bez zmian
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
@import url('@/assets/css/mainC2.css');

.lowered {
  display: inline-block;
  transform: translateY(15px);
  font-size: 0.9em; /* Zmniejszenie czcionki o 1px */
}
#POMIAR_0TE1
	{
	background-image:url('@/assets//img/tabliczka.png');
	background-repeat:no-repeat;
	z-index:1;
	position:absolute;
	padding-bottom:4px;
	width: 63px;
	height: 40px;
	text-align:center;
	line-height:15px;
  top:584px; 
  left:86px;
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
</style>
