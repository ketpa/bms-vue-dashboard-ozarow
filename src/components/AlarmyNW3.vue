<template>
  <div class="page">
    <div class="menubottom">NW3 &gt; Alarmy</div>
    <p class="title">Alarmy NW3</p>

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
      { point: "SYGN_NW3", label: "NW3 - Alarm zbiorczy NW3" },
      { point: "SYGN_3TE1", label: "3TE1 - Czujnik temperatury" },
      { point: "SYGN_3TE2", label: "3TE2 - Czujnik temperatury" },
      { point: "SYGN_3TE3", label: "3TE3 - Czujnik temperatury" },
      { point: "SYGN_N3", label: "N3 - Wentylator nawiewu N3" },
      { point: "SYGN_W3", label: "W3 - Wentylator wywiewu W3" },
      { point: "SYGN_W3A", label: "W3A - Wentylator wywiewu W3A" },
      { point: "SYGN_3NE1", label: "3NE1 - Nagrzewnica" },
      { point: "SYGN_W4", label: "W4 - Wentylator W4" }
    ]
  },
  {
    title: "Sygnalizacja",
    items: [
      { point: "SYGN_WD1_MAN", label: "WD1 - Sterowanie manualne" },
      { point: "SYGN_NW3_AUTO", label: "NW3 - Sterowanie automatyczne" },
      { point: "SYGN_NW3_MAN", label: "NW3 - Sterowanie manualne" },
      { point: "SYGN_W4_AUTO", label: "W4 - Sterowanie automatyczne" },
      { point: "SYGN_W4_MAN", label: "W4 - Sterowanie manualne" }
    ]
  }
];

export default {
  name: "AlarmyNW3Vue",

  data() {
    return {
      source: "http://192.168.1.155:1880/C3.json",
      interval: null,
      f: {},
      sections
    };
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
        console.error("Błąd pobierania alarmów NW3:", e);
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

      const signalPoints = [
        "SYGN_WD1_MAN",
        "SYGN_NW3_AUTO",
        "SYGN_NW3_MAN",
        "SYGN_W4_AUTO",
        "SYGN_W4_MAN"
      ];

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

      const signalPoints = [
        "SYGN_WD1_MAN",
        "SYGN_NW3_AUTO",
        "SYGN_NW3_MAN",
        "SYGN_W4_AUTO",
        "SYGN_W4_MAN"
      ];

      if (signalPoints.includes(point)) {
        return Number(v) === 1 ? "status active" : "status inactive";
      }

      return Number(v) === 1 ? "status alarm" : "status ok";
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

.status.active {
  background: #1976d2;
  color: #fff;
}

.status.inactive {
  background: #555;
  color: #fff;
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