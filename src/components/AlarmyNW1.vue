<template>
  <div class="page">
    <div class="menubottom">NW1 &gt; Alarmy &gt; {{ title }}</div>
    <p class="title">Alarmy {{ title }}</p>

    <div class="pagebody">
      <p class="sectiontitle">Sygnalizacje / alarmy</p>

      <table class="table">
        <tr v-for="item in items" :key="item.point">
          <td>{{ item.label }}</td>
          <td>
            <span :class="statusClass(item.point)">
              {{ statusText(item.point) }}
            </span>
          </td>
        </tr>
      </table>

<p class="sectiontitle">Kasowanie alarmu</p>
<table class="table">
  <tr>
    <td>Reset alarmów NW1</td>
    <td>
      <button class="reset-btn" @click="resetAlarm">Reset</button>
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

const alarmMap = {
    centrala: [
    { point: "SYGN_NW1", label: "NW1 - Alarm zbiorczy NW1" },
    { point: "SYGN_8A1", label: "8A1 - Wyspa IO" },
    { point: "SYGN_8A2", label: "8A2 - Wyspa IO" },
    { point: "SYGN_0TE1", label: "0TE1 - Czujnik temperatury zewnętrznej" },
    { point: "SYGN_1TE1", label: "1TE1 - Czujnik temperatury odzysku N1" },
    { point: "SYGN_1TE2", label: "1TE2 - Czujnik temperatury nagrzewnicy wstępnej" },
    { point: "SYGN_1THE1_T", label: "1THE1 - Przetwornik temperatury nawiewu N1" },
    { point: "SYGN_1THE1_H", label: "1THE1 - Przetwornik wilgotności nawiewu N1" },
    { point: "SYGN_1THE2_T", label: "1THE2 - Przetwornik temperatury wywiewu W1" },
    { point: "SYGN_1THE2_H", label: "1THE2 - Przetwornik wilgotności wywiewu W1" },
    { point: "SYGN_1PE1", label: "1PE1 - Przetwornik ciśnienia nawiewu N1" },
    { point: "SYGN_1PE2", label: "1PE2 - Przetwornik ciśnienia wywiewu W1" },
    { point: "SYGN_1PE3", label: "1PE3 - Przetwornik ciśnienia wywiewu W" },

    { point: "SYGN_N1_1", label: "N1/1 - Wentylator nawiewu N1/1" },
    { point: "SYGN_N1_2", label: "N1/2 - Wentylator nawiewu N1/2" },
    { point: "SYGN_W1", label: "W1 - Wentylator wywiewu W1" },
    { point: "SYGN_W_1", label: "W/1 - Wentylator wywiewu W/1" },
    { point: "SYGN_W_2", label: "W/2 - Wentylator wywiewu W/2" },

    { point: "SYGN_1PO1", label: "1PO1 - Pompa nagrzewnicy pierwotnej NW1" },
    { point: "SYGN_1PO2", label: "1PO2 - Pompa nagrzewnicy wtórnej NW1" },
    { point: "SYGN_1PO3", label: "1PO3 - Pompa odzysku glikolowego NW1" },
    { point: "SYGN_1NP1", label: "1NP1 - Nawilżacz parowy NW1" },

    { point: "SYGN_WD2", label: "WD2 - Wentylator WD2" },
    { point: "SYGN_WD3", label: "WD3 - Wentylator WD3" },
    { point: "SYGN_WD4", label: "WD4 - Wentylator WD4" },

    { point: "SYGN_1PJ1", label: "1PJ1 - Filtr wstępny nawiewu N1" },
    { point: "SYGN_1PJ2", label: "1PJ2 - Filtr wtórny nawiewu N1" },
    { point: "SYGN_1PJ3", label: "1PJ3 - Filtr 1° wywiewu W1" },
    { point: "SYGN_1PJ4", label: "1PJ4 - Filtr 2° wywiewu W1" },
    { point: "SYGN_1PJ5", label: "1PJ5 - Filtr 3° wywiewu W1" },

    { point: "SYGN_1NP1_PRACA", label: "Praca nawilżacza 1NP1" },
    { point: "SYGN_1NP1_CZYSZCZENIE", label: "Czyszczenie nawilżacza 1NP1" },
    { point: "SYGN_NW1_AUTO", label: "Sterowanie automatyczne 1NW1" },
    { point: "SYGN_NW1_MAN", label: "Sterowanie manualne 1NW1" },

    { point: "SYGN_9Q1_N1", label: "Przycisk bezpieczeństwa N1" },
    { point: "SYGN_9Q2_W1", label: "Przycisk bezpieczeństwa W1" },
    { point: "SYGN_9Q3_W", label: "Przycisk bezpieczeństwa W" },

    { point: "SAP", label: "Sygnalizacja pożaru" },
    { point: "SYGN_1HJ1", label: "Higrostat nawilżacza" },

    { point: "SYGN_WD2_MAN", label: "Sterowanie manualne WD2" },
    { point: "SYGN_WD3_MAN", label: "Sterowanie manualne WD3" },
    { point: "SYGN_WD4_MAN", label: "Sterowanie manualne WD4" },

    { point: "SYGN_7K1_ZASILANIE", label: "Zasilanie szafy SAK1" }
    ],

  "019": [
    { point: "SYGN_019TE1", label: "019TE1 - Temperatura nawiewu" },
    { point: "SYGN_019THE1_T", label: "019THE1 - Temperatura pomieszczenia" },
    { point: "SYGN_019THE1_H", label: "019THE1 - Wilgotność pomieszczenia" },
    { point: "SYGN_019NE1", label: "019NE1 - Nagrzewnica" },
    
  ],

  "020": [
    { point: "SYGN_020TE1", label: "020TE1 - Temperatura nawiewu" },
    { point: "SYGN_020THE1_T", label: "020THE1 - Temperatura pomieszczenia" },
    { point: "SYGN_020THE1_H", label: "020THE1 - Wilgotność pomieszczenia" },
    { point: "SYGN_020NE1", label: "020NE1 - Nagrzewnica" },
    { point: "SYGN_020PJ1", label: "020PJ1 - Filtr / presostat" }
  ],

  "03": [
    { point: "SYGN_03TE1", label: "03TE1 - Temperatura nawiewu" },
    { point: "SYGN_03THE1_T", label: "03THE1 - Temperatura pomieszczenia" },
    { point: "SYGN_03THE1_H", label: "03THE1 - Wilgotność pomieszczenia" },
    { point: "SYGN_03NE1", label: "03NE1 - Nagrzewnica" },
    { point: "SYGN_03PJ1", label: "03PJ1 - Filtr / presostat" }
  ],

  "021": [
    { point: "SYGN_021TE1", label: "021TE1 - Temperatura nawiewu" },
    { point: "SYGN_021THE1_T", label: "021THE1 - Temperatura pomieszczenia" },
    { point: "SYGN_021THE1_H", label: "021THE1 - Wilgotność pomieszczenia" },
    { point: "SYGN_021NE1", label: "021NE1 - Nagrzewnica" },
    { point: "SYGN_021PJ1", label: "021PJ1 - Filtr / presostat" }
  ],

  "024": [
    { point: "SYGN_024TE1", label: "024TE1 - Temperatura nawiewu" },
    { point: "SYGN_024THE1_T", label: "024THE1 - Temperatura pomieszczenia" },
    { point: "SYGN_024THE1_H", label: "024THE1 - Wilgotność pomieszczenia" },
    { point: "SYGN_024NE1", label: "024NE1 - Nagrzewnica" },
    { point: "SYGN_024PJ1", label: "024PJ1 - Filtr / presostat" }
  ],

  "016": [
    { point: "SYGN_016TE1", label: "016TE1 - Temperatura nawiewu" },
    { point: "SYGN_016THE1_T", label: "016THE1 - Temperatura pomieszczenia" },
    { point: "SYGN_016THE1_H", label: "016THE1 - Wilgotność pomieszczenia" },
    { point: "SYGN_016NE1", label: "016NE1 - Nagrzewnica" },
    { point: "SYGN_016PJ1", label: "016PJ1 - Filtr / presostat" }
  ],

  "06": [
    { point: "SYGN_06TE1", label: "06TE1 - Temperatura nawiewu" },
    { point: "SYGN_06THE1_T", label: "06THE1 - Temperatura pomieszczenia" },
    { point: "SYGN_06THE1_H", label: "06THE1 - Wilgotność pomieszczenia" },
    { point: "SYGN_06NE1", label: "06NE1 - Nagrzewnica" },
    { point: "SYGN_06PJ1", label: "06PJ1 - Filtr / presostat" },
    { point: "SYGN_WD2", label: "WD2 - Wentylator WD2" },
    
  ],

  "04": [
    { point: "SYGN_04TE1", label: "04TE1 - Temperatura nawiewu" },
    { point: "SYGN_04THE1_T", label: "04THE1 - Temperatura pomieszczenia" },
    { point: "SYGN_04THE1_H", label: "04THE1 - Wilgotność pomieszczenia" },
    { point: "SYGN_04NE1", label: "04NE1 - Nagrzewnica" },
    { point: "SYGN_04PJ1", label: "04PJ1 - Filtr / presostat" }
  ],

  "07": [
    { point: "SYGN_07TE1", label: "07TE1 - Temperatura nawiewu" },
    { point: "SYGN_07THE1_T", label: "07THE1 - Temperatura pomieszczenia" },
    { point: "SYGN_07THE1_H", label: "07THE1 - Wilgotność pomieszczenia" },
    { point: "SYGN_07NE1", label: "07NE1 - Nagrzewnica" },
    { point: "SYGN_07PJ1", label: "07PJ1 - Filtr / presostat" }
  ],

  "018": [
    { point: "SYGN_018PJ1", label: "018PJ1 - Filtr / presostat" }
  ],

  "017": [
    { point: "SYGN_017PJ1", label: "017PJ1 - Filtr / presostat" }
  ],

  "015": [
    { point: "SYGN_015PJ1", label: "015PJ1 - Filtr / presostat" }
  ],

  "013": [
    { point: "SYGN_013PJ1", label: "013PJ1 - Filtr / presostat" }
  ]
};

export default {
  name: "AlarmyNW1",

  data() {
    return {
      source: "http://192.168.1.155:1880/C1.json",
      resetSource: "http://192.168.1.155:1880/api/nw1-reset-alarm",
      interval: null,
      status: "",
      f: {}
    };
  },

computed: {
  group() {
    const g = this.$route.params.group;

    if (g === "1") return "centrala";

    return g || "centrala";
  },

  title() {
    return this.group === "centrala"
      ? "Centrala"
      : `Pomieszczenie ${this.group}`;
  },

  items() {
    return alarmMap[this.group] || [];
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
        console.error("Błąd pobierania alarmów:", e);
      }
    },

    async resetAlarm() {
      try {
        await axios.post(this.resetSource, {
          reset: "NW1"
        });

        setTimeout(() => {
          this.load();
        }, 500);
      } catch (e) {
        console.error("Błąd kasowania alarmu NW1:", e);
      }
    },

    startAutoRefresh() {
      if (this.interval) return;

      this.load();

      this.interval = setInterval(() => {
        if (!document.hidden) this.load();
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

    value(point) {
      return this.f[point];
    },

    statusText(point) {
  const v = this.value(point);

  if (v === undefined || v === null || v === "") {
    return "BRAK DANYCH";
  }

  const filterPoints = [
    "SYGN_1PJ1",
    "SYGN_1PJ2",
    "SYGN_1PJ3",
    "SYGN_1PJ4",
    "SYGN_1PJ5",

    "SYGN_018PJ1",
    "SYGN_017PJ1",
    "SYGN_020PJ1",
    "SYGN_03PJ1",
    "SYGN_021PJ1",
    "SYGN_06PJ1",
    "SYGN_024PJ1",
    "SYGN_04PJ1",
    "SYGN_016PJ1",
    "SYGN_07PJ1",
    "SYGN_015PJ1",
    "SYGN_013PJ1"
  ];

  const signalPoints = [
    "SYGN_1NP1_PRACA",
    "SYGN_1NP1_CZYSZCZENIE",
    "SYGN_NW1_AUTO",
    "SYGN_NW1_MAN",
    "SYGN_9Q1_N1",
    "SYGN_9Q2_W1",
    "SYGN_9Q3_W",
    "SAP",
    "SYGN_1HJ1",
    "SYGN_WD2_MAN",
    "SYGN_WD3_MAN",
    "SYGN_WD4_MAN",
    "SYGN_7K1_ZASILANIE"
  ];

  // FILTRY
  if (filterPoints.includes(point)) {
    return Number(v) === 1 ? "Brudny" : "Czysty";
  }

  // SYGNALIZACJA
  if (signalPoints.includes(point)) {
    return Number(v) === 1 ? "On" : "Off";
  }

  // RESZTA
  return Number(v) === 1 ? "ALARM" : "OK";
},

    statusClass(point) {
  const v = this.value(point);

  if (v === undefined || v === null || v === "") {
    return "status nodata";
  }

  const filterPoints = [
    "SYGN_1PJ1",
    "SYGN_1PJ2",
    "SYGN_1PJ3",
    "SYGN_1PJ4",
    "SYGN_1PJ5",

    "SYGN_018PJ1",
    "SYGN_017PJ1",
    "SYGN_020PJ1",
    "SYGN_03PJ1",
    "SYGN_021PJ1",
    "SYGN_06PJ1",
    "SYGN_024PJ1",
    "SYGN_04PJ1",
    "SYGN_016PJ1",
    "SYGN_07PJ1",
    "SYGN_015PJ1",
    "SYGN_013PJ1"
  ];

  const signalPoints = [
    "SYGN_1NP1_PRACA",
    "SYGN_1NP1_CZYSZCZENIE",
    "SYGN_NW1_AUTO",
    "SYGN_NW1_MAN",
    "SYGN_9Q1_N1",
    "SYGN_9Q2_W1",
    "SYGN_9Q3_W",
    "SAP",
    "SYGN_1HJ1",
    "SYGN_WD2_MAN",
    "SYGN_WD3_MAN",
    "SYGN_WD4_MAN",
    "SYGN_7K1_ZASILANIE"
  ];

  // FILTRY
  if (filterPoints.includes(point)) {
    return Number(v) === 1
      ? "status alarm"
      : "status ok";
  }

  // SYGNALIZACJA
  if (signalPoints.includes(point)) {
    return Number(v) === 1
      ? "status active"
      : "status inactive";
  }

  // RESZTA
  return Number(v) === 1
    ? "status alarm"
    : "status ok";
},
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

.status {
  display: inline-block;
  min-width: 120px;
  padding: 8px 12px;
  border-radius: 6px;
  text-align: center;
  font-weight: 700;
}

.status.ok {
  background: #2f7d32;
  color: #ffffff;
}

.status.alarm {
  background: #c62828;
  color: #ffffff;
}

.status.nodata {
  background: #777;
  color: #ffffff;
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
.status.active {
  background: #1976d2;
  color: #fff;
}

.status.inactive {
  background: #555;
  color: #fff;
}
.reset-btn {
  background: #c62828;
}

.reset-btn:hover {
  background: #a91f1f;
}
</style>