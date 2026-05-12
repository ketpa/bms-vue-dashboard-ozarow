<template>
  <div class="page">
    <div class="menubottom">NW2 &gt; Alarmy</div>
    <p class="title">Alarmy NW2</p>

    <div class="pagebody">
      <template v-for="section in sections" :key="section.title">
        <p class="sectiontitle">{{ section.title }}</p>

        <table class="table">
          <tr v-for="item in section.items" :key="item.point">
            <td>{{ item.label }}</td>
            <td>
              <span :class="statusClass(item.point)">
                {{ statusText(item.point) }}
              </span>
            </td>
          </tr>
        </table>
      </template>

      <p class="sectiontitle">Kasowanie alarmu</p>

      <table class="table">
        <tr>
          <td>Reset</td>
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

const sections = [
  {
    title: "Alarmy",
    items: [
      { point: "SYGN_NW2", label: "NW2 - Alarm zbiorczy NW2" },
      { point: "SYGN_9A1", label: "9A1 - Wyspa IO" },
      { point: "SYGN_2TE1", label: "2TE1 - Czujnik temperatury odzysku N2" },
      { point: "SYGN_2TE2", label: "2TE2 - Czujnik temperatury nagrzewnicy wstępnej" },
      { point: "SYGN_2THE1_T", label: "2THE1 - Przetwornik temperatury nawiewu N2" },
      { point: "SYGN_2THE1_H", label: "2THE1 - Przetwornik wilgotności nawiewu N2" },
      { point: "SYGN_2THE2_T", label: "2THE2 - Przetwornik temperatury wywiewu W2" },
      { point: "SYGN_2THE2_H", label: "2THE2 - Przetwornik wilgotności wywiewu W2" },
      { point: "SYGN_2THE3_T", label: "2THE3 - Przetwornik temperatury wywiewu W2A" },
      { point: "SYGN_2THE3_H", label: "2THE3 - Przetwornik wilgotności wywiewu W2A" },
      { point: "SYGN_2PE3", label: "2PE3 - Przetwornik ciśnienia wywiewu W2A" },
      { point: "SYGN_2PE2", label: "2PE2 - Przetwornik ciśnienia wywiewu W2" },
      { point: "SYGN_023_2TE1", label: "023/2TE1 - Czujnik temperatury nawiewu do pomieszczenia 023/2" },
      { point: "SYGN_023_2THE1_T", label: "023/2THE1 - Przetwornik temperatury pomieszczenia 023/2" },
      { point: "SYGN_023_2THE1_H", label: "023/2THE1 - Przetwornik wilgotności pomieszczenia 023/2" },
      { point: "SYGN_WENT_N2", label: "N2 - Wentylator nawiewu N2" },
      { point: "SYGN_WENT_W2", label: "W2 - Wentylator wywiewu W2" },
      { point: "SYGN_WENT_W2A", label: "W2A - Wentylator wywiewu W2A" },
      { point: "SYGN_2PO1", label: "2PO1 - Pompa nagrzewnicy pierwotnej NW2" },
      { point: "SYGN_2PO2", label: "2PO2 - Pompa nagrzewnicy wtórnej NW2" },
      { point: "SYGN_2PO3", label: "2PO3 - Pompa odzysku glikolowego NW2" },
      { point: "SYGN_2NP1", label: "2NP1 - Nawilżacz parowy NW2" },
      { point: "SYGN_WD1", label: "WD1 - Wentylator WD1" },
      { point: "SYGN_023_2NE1", label: "023/2NE1 - Nagrzewnica pomieszczenia 023/2" },
      { point: "SYGN_SAK1TE1", label: "SAK1TE1 - Alarm czujnika szafy SAK1" }
    ]
  },

  {
    title: "Filtry",
    items: [
      { point: "SYGN_2PJ1", label: "2PJ1 - Filtr wstępny nawiewu N2" },
      { point: "SYGN_2PJ2", label: "2PJ2 - Filtr wtórny nawiewu N2" },
      { point: "SYGN_2PJ3", label: "2PJ3 - Filtr wywiewu W2" },
      { point: "SYGN_2PJ4", label: "2PJ4 - Filtr 1° wywiewu W2A" },
      { point: "SYGN_2PJ5", label: "2PJ5 - Filtr 2° wywiewu W2A" },
      { point: "SYGN_2PJ6", label: "2PJ6 - Filtr 3° wywiewu W2A" }
    ]
  },

  {
    title: "Sygnalizacja",
    items: [
      { point: "SYGN_2NP1_PRACA", label: "Praca nawilżacza 2NP1" },
      { point: "SYGN_2NP1_CZYSZCZENIE", label: "Czyszczenie nawilżacza 2NP1" },
      { point: "SYGN_NW2_AUTO", label: "Sterowanie automatyczne NW2" },
      { point: "SYGN_NW2_MAN", label: "Sterowanie manualne NW2" },
      { point: "SYGN_9Q1_N2", label: "Przycisk bezpieczeństwa N2" },
      { point: "SYGN_9Q2_W2", label: "Przycisk bezpieczeństwa W2" },
      { point: "SYGN_9Q3_W2A", label: "Przycisk bezpieczeństwa W2A" },
      { point: "SAP", label: "Sygnalizacja pożaru" },
      { point: "SYGN_2HJ1", label: "Higrostat nawilżacza" }
    ]
  }
];

export default {
  name: "AlarmyNW2Vue",

  data() {
    return {
      source: "http://192.168.1.155:1880/C2.json",
      resetSource: "http://192.168.1.155:1880/api/nw2-reset-alarm",
      interval: null,
      f: {},
      sections
    };
  },

  mounted() {
    this.startAutoRefresh();
    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
  },

  beforeUnmount() {
    this.stopAutoRefresh();
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
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
        console.error("Błąd pobierania alarmów NW2:", e);
      }
    },

    async resetAlarm() {
      try {
        await axios.post(this.resetSource, {
          reset: "NW2"
        });

        setTimeout(() => {
          this.load();
        }, 500);
      } catch (e) {
        console.error("Błąd kasowania alarmu NW2:", e);
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

    value(point) {
      return this.f[point];
    },

    statusText(point) {
      const v = this.value(point);

      if (v === undefined || v === null || v === "") {
        return "BRAK DANYCH";
      }

      const filterPoints = [
        "SYGN_2PJ1",
        "SYGN_2PJ2",
        "SYGN_2PJ3",
        "SYGN_2PJ4",
        "SYGN_2PJ5",
        "SYGN_2PJ6"
      ];

      const signalPoints = [
        "SYGN_2NP1_PRACA",
        "SYGN_2NP1_CZYSZCZENIE",
        "SYGN_NW2_AUTO",
        "SYGN_NW2_MAN",
        "SYGN_9Q1_N2",
        "SYGN_9Q2_W2",
        "SYGN_9Q3_W2A",
        "SAP",
        "SYGN_2HJ1"
      ];

      if (filterPoints.includes(point)) {
        return Number(v) === 1 ? "Brudny" : "Czysty";
      }

      if (signalPoints.includes(point)) {
        return Number(v) === 1 ? "On" : "Off";
      }

      return Number(v) === 1 ? "ALARM" : "OK";
    },

    statusClass(point) {
      const v = this.value(point);

      if (v === undefined || v === null || v === "") {
        return "status nodata";
      }

      const filterPoints = [
        "SYGN_2PJ1",
        "SYGN_2PJ2",
        "SYGN_2PJ3",
        "SYGN_2PJ4",
        "SYGN_2PJ5",
        "SYGN_2PJ6"
      ];

      const signalPoints = [
        "SYGN_2NP1_PRACA",
        "SYGN_2NP1_CZYSZCZENIE",
        "SYGN_NW2_AUTO",
        "SYGN_NW2_MAN",
        "SYGN_9Q1_N2",
        "SYGN_9Q2_W2",
        "SYGN_9Q3_W2A",
        "SAP",
        "SYGN_2HJ1"
      ];

      if (filterPoints.includes(point)) {
        return Number(v) === 1
          ? "status alarm"
          : "status ok";
      }

      if (signalPoints.includes(point)) {
        return Number(v) === 1
          ? "status active"
          : "status inactive";
      }

      return Number(v) === 1
        ? "status alarm"
        : "status ok";
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

.reset-btn {
  background: #c62828;
}

.reset-btn:hover {
  background: #a91f1f;
}
.status.active {
  background: #1976d2;
  color: #fff;
}

.status.inactive {
  background: #555;
  color: #fff;
}
</style>