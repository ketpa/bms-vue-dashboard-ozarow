<template>
  <div class="page">
    <div class="menubottom">NW2 &gt; Pomieszczenie 023/2</div>
    <p class="title">Pomieszczenie 023/2</p>

    <div class="pagebody">
      <p class="sectiontitle">Pomiary</p>

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

export default {
  name: "P023_2",

  data() {
    return {
      source: "http://192.168.1.155:1880/C2.json",
      interval: null,
      f: {},

      items: [
        { point: "POMIAR_023_2TE1", label: "023/2TE1 - Temperatura nawiewu", unit: "°C" },
        { point: "POMIAR_023_2THE1_T", label: "023/2THE1 - Temperatura pomieszczenia", unit: "°C" },
        { point: "POMIAR_023_2THE1_H", label: "023/2THE1 - Wilgotność pomieszczenia", unit: "%R.H." },
         { point: "WYJ_AO_023_2NE1", label: "023/2NE1 - Nagrzewnica", unit: "" },
  { point: "WYJ_AO_023_2NV1", label: "023/2NV1 - Zawór", unit: "%" }
      ]
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