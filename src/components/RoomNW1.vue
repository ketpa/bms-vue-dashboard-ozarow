<template>
  <div class="page">
    <div class="menubottom">NW1 &gt; Pomieszczenie {{ room }}</div>
    <p class="title">Pomieszczenie {{ room }}</p>

    <div class="pagebody">
      <p class="sectiontitle">Pomiary i wyjścia</p>

      <table class="table">
        <tr v-for="item in items" :key="item.point">
          <td>{{ item.label }}</td>
          <td>
            <span class="value">{{ getValue(item.point) }}</span>
            <span class="unit">{{ item.unit }}</span>
          </td>
        </tr>
      </table>

      <div class="bottom-bar">
        <button @click="load">Odśwież</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const roomMap = {
  "021": [
    { point: "POMIAR_021TE1", label: "021TE1 - Temperatura nawiewu", unit: "°C" },
    { point: "POMIAR_021THE1_T", label: "021THE1 - Temperatura pomieszczenia", unit: "°C" },
    { point: "POMIAR_021THE1_H", label: "021THE1 - Wilgotność pomieszczenia", unit: "%R.H." },
    { point: "WYJ_AO_021NE1", label: "021NE1 - Wysterowanie nagrzewnicy", unit: "%" },
    { point: "WYJ_AO_021NV1", label: "021NV1 - Regulator ciśnienia", unit: "%" }
  ],

  "020": [
    { point: "POMIAR_020TE1", label: "020TE1 - Temperatura nawiewu", unit: "°C" },
    { point: "POMIAR_020THE1_T", label: "020THE1 - Temperatura pomieszczenia", unit: "°C" },
    { point: "POMIAR_020THE1_H", label: "020THE1 - Wilgotność pomieszczenia", unit: "%R.H." },
    { point: "WYJ_AO_020NE1", label: "020NE1 - Wysterowanie nagrzewnicy", unit: "%" },
    { point: "WYJ_AO_020NV1", label: "020NV1 - Regulator ciśnienia", unit: "%" }
  ],

  "019": [
    { point: "POMIAR_019TE1", label: "019TE1 - Temperatura nawiewu", unit: "°C" },
    { point: "POMIAR_019THE1_T", label: "019THE1 - Temperatura pomieszczenia", unit: "°C" },
    { point: "POMIAR_019THE1_H", label: "019THE1 - Wilgotność pomieszczenia", unit: "%R.H." },
    { point: "WYJ_AO_019NE1", label: "019NE1 - Wysterowanie nagrzewnicy", unit: "%" },
    { point: "WYJ_AO_019NV1", label: "019NV1 - Regulator ciśnienia", unit: "%" }
  ],

  "03": [
    { point: "POMIAR_03TE1", label: "03TE1 - Temperatura nawiewu", unit: "°C" },
    { point: "POMIAR_03THE1_T", label: "03THE1 - Temperatura pomieszczenia", unit: "°C" },
    { point: "POMIAR_03THE1_H", label: "03THE1 - Wilgotność pomieszczenia", unit: "%R.H." },
    { point: "WYJ_AO_03NE1", label: "03NE1 - Wysterowanie nagrzewnicy", unit: "%" },
    { point: "WYJ_AO_03NV1", label: "03NV1 - Regulator ciśnienia", unit: "%" }
  ],
  "024": [
  { point: "POMIAR_024TE1", label: "024TE1 - Temperatura nawiewu", unit: "°C" },
  { point: "POMIAR_024THE1_T", label: "024THE1 - Temperatura pomieszczenia", unit: "°C" },
  { point: "POMIAR_024THE1_H", label: "024THE1 - Wilgotność pomieszczenia", unit: "%R.H." },
  { point: "WYJ_AO_024NE1", label: "024NE1 - Wysterowanie nagrzewnicy", unit: "%" },
  { point: "WYJ_AO_024NV1", label: "024NV1 - Regulator ciśnienia", unit: "%" }
],

"016": [
  { point: "POMIAR_016TE1", label: "016TE1 - Temperatura nawiewu", unit: "°C" },
  { point: "POMIAR_016THE1_T", label: "016THE1 - Temperatura pomieszczenia", unit: "°C" },
  { point: "POMIAR_016THE1_H", label: "016THE1 - Wilgotność pomieszczenia", unit: "%R.H." },
  { point: "WYJ_AO_016NE1", label: "016NE1 - Wysterowanie nagrzewnicy", unit: "%" },
  { point: "WYJ_AO_016NV1", label: "016NV1 - Regulator ciśnienia", unit: "%" },
  
],

"06": [
  { point: "POMIAR_06TE1", label: "06TE1 - Temperatura nawiewu", unit: "°C" },
  { point: "POMIAR_06THE1_T", label: "06THE1 - Temperatura pomieszczenia", unit: "°C" },
  { point: "POMIAR_06THE1_H", label: "06THE1 - Wilgotność pomieszczenia", unit: "%R.H." },
  { point: "WYJ_AO_06NE1", label: "06NE1 - Wysterowanie nagrzewnicy", unit: "%" },
  { point: "WYJ_AO_06NV1", label: "06NV1 - Regulator ciśnienia", unit: "%" },
  { point: "WYJ_DO_WD2", label: "WD2 - Wysterowanie", unit: "%" }
],

"04": [
  { point: "POMIAR_04TE1", label: "04TE1 - Temperatura nawiewu", unit: "°C" },
  { point: "POMIAR_04THE1_T", label: "04THE1 - Temperatura pomieszczenia", unit: "°C" },
  { point: "POMIAR_04THE1_H", label: "04THE1 - Wilgotność pomieszczenia", unit: "%R.H." },
  { point: "WYJ_AO_04NE1", label: "04NE1 - Wysterowanie nagrzewnicy", unit: "%" },
  { point: "WYJ_AO_04NV1", label: "04NV1 - Regulator ciśnienia", unit: "%" }
],

"07": [
  { point: "POMIAR_07TE1", label: "07TE1 - Temperatura nawiewu", unit: "°C" },
  { point: "POMIAR_07THE1_T", label: "07THE1 - Temperatura pomieszczenia", unit: "°C" },
  { point: "POMIAR_07THE1_H", label: "07THE1 - Wilgotność pomieszczenia", unit: "%R.H." },
  { point: "WYJ_AO_07NE1", label: "07NE1 - Wysterowanie nagrzewnicy", unit: "%" },
  { point: "WYJ_AO_07NV1", label: "07NV1 - Regulator ciśnienia", unit: "%" }
],

"018": [
  { point: "WYJ_AO_018NV1", label: "018NV1 - Regulator ciśnienia", unit: "%" }
],

"017": [
  { point: "WYJ_AO_017NV1", label: "017NV1 - Regulator ciśnienia", unit: "%" }
],

"015": [
  { point: "WYJ_AO_015NV1", label: "015NV1 - Regulator ciśnienia", unit: "%" }
],

"013": [
  { point: "WYJ_AO_013NV1", label: "013NV1 - Regulator ciśnienia", unit: "%" }
]
};

export default {
  name: "RoomNW1",

  data() {
    return {
      source: "http://192.168.1.155:1880/C1.json",
      interval: null,
      f: {}
    };
  },

  computed: {
    room() {
      return this.$route.params.room;
    },

    items() {
      return roomMap[this.room] || [];
    }
  },

  mounted() {
    this.startAutoRefresh();
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  },

  beforeUnmount() {
    this.stopAutoRefresh();
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  },

  methods: {
    async load() {
      try {
        const r = await axios.get(this.source + "?_=" + Date.now());

        const values = {};
        for (const item of r.data || []) {
          values[item.Name] = item.Value;
        }

        this.f = values;
      } catch (e) {
        console.error("Błąd pobierania danych:", e);
      }
    },

    startAutoRefresh() {
      if (this.interval) return;

      this.load();

      this.interval = setInterval(() => {
        if (!document.hidden) {
          this.load();
        }
      }, 10000);
    },

    stopAutoRefresh() {
      if (!this.interval) return;

      clearInterval(this.interval);
      this.interval = null;
    },

    handleVisibilityChange() {
      if (document.hidden) {
        this.stopAutoRefresh();
      } else {
        this.startAutoRefresh();
      }
    },

    getValue(point) {
      const value = this.f[point];
      return value === undefined || value === null || value === "" ? "-" : value;
    }
  }
};
</script>

<style scoped>
.page {
  max-width: 1120px;
  font-family: Arial, Helvetica, sans-serif;
  color: #eaeaea;
}

.menubottom {
  background: #f1f1f1;
  color: #111;
  padding: 10px 14px;
  font-weight: 700;
  font-size: 20px;
}

.title {
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;
  margin: 36px 0 30px;
}

.pagebody {
  background: #2f3136;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 28px 24px;
}

.sectiontitle {
  background: #202225;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  padding: 12px 16px;
  margin: 0;
  border-radius: 8px 8px 0 0;
  border: 1px solid #444;
  border-bottom: none;
  text-align: center;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: #383b40;
  border: 1px solid #444;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  margin-bottom: 22px;
}

.table tr {
  border-bottom: 1px solid #555;
}

.table tr:last-child {
  border-bottom: none;
}

.table td {
  padding: 14px 16px;
  vertical-align: middle;
  color: #f1f1f1;
  font-size: 15px;
}

.table td:first-child {
  width: 70%;
  font-weight: 700;
  font-size: 16px;
}

.table td:nth-child(2) {
  width: 30%;
  white-space: nowrap;
}

.value {
  display: inline-block;
  min-width: 120px;
  padding: 8px 10px;
  background: #f5f6fa;
  color: #111;
  border-radius: 6px;
  border: 1px solid #aaa;
  font-size: 15px;
  box-sizing: border-box;
  text-align: right;
  font-weight: 700;
}

.unit {
  margin-left: 8px;
  color: #ffffff;
  font-weight: 700;
}

.bottom-bar {
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid #555;
}

button {
  padding: 8px 15px;
  border-radius: 6px;
  border: none;
  background: #2d8cff;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  background: #1f75d6;
}
</style>