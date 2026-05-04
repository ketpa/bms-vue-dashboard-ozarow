<template>
  <div class="page">
    <div class="menubottom">NW2 &gt; Pomiary</div>
    <p class="title">Pomiary</p>

    <div class="pagebody">
      <div v-for="section in sections" :key="section.title">
        <p class="sectiontitle">{{ section.title }}</p>

        <table class="table">
          <tr v-for="item in section.items" :key="item.point">
            <td>{{ item.label }}</td>
            <td>
              <span class="value">{{ getValue(item.point) }}</span>
              <span class="unit">{{ item.unit }}</span>
            </td>
          </tr>
        </table>
      </div>

      <div class="bottom-bar">
        <button @click="load">Odśwież</button>
        <span class="status">{{ status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NW2Pomiary",

  data() {
    return {
      source: "http://192.168.1.155:1880/C2.json",
      status: "",
      interval: null,
      f: {},

      sections: [
        {
          title: "Centrala wentylacyjna",
          items: [
            { point: "POMIAR_2PE1", label: "2PE1 - Przetwornik ciśnienia nawiewu N2", unit: "Pa" },
            { point: "POMIAR_2PE2", label: "2PE2 - Przetwornik ciśnienia wywiewu W2", unit: "Pa" },
            { point: "POMIAR_2PE3", label: "2PE3 - Przetwornik ciśnienia wywiewu W2A", unit: "Pa" },
            { point: "POMIAR_2TE1", label: "2TE1 - Czujnik temperatury odzysku N2", unit: "°C" },
            { point: "POMIAR_2TE2", label: "2TE2 - Czujnik temperatury nagrzewnicy wstępnej", unit: "°C" },
            { point: "POMIAR_2THE1_T", label: "2THE1 - Przetwornik temperatury nawiewu N2", unit: "°C" },
            { point: "POMIAR_2THE1_H", label: "2THE1 - Przetwornik wilgotności nawiewu N2", unit: "%R.H." },
            { point: "POMIAR_2THE2_T", label: "2THE2 - Przetwornik temperatury wywiewu W2", unit: "°C" },
            { point: "POMIAR_2THE2_H", label: "2THE2 - Przetwornik wilgotności wywiewu W2", unit: "%R.H." },
            { point: "POMIAR_2THE3_T", label: "2THE3 - Przetwornik temperatury wywiewu W2A", unit: "°C" },
            { point: "POMIAR_2THE3_H", label: "2THE3 - Przetwornik wilgotności wywiewu W2A", unit: "%R.H." },
            { point: "POMIAR_2THE1_X", label: "2THE1_x - Wilgotność bezwzględna nawiewu N2", unit: "g/kg" }
          ]
        },
        {
          title: "Pomieszczenie 023/2",
          items: [
            { point: "POMIAR_023_2TE1", label: "023/2TE1 - Czujnik temperatury nawiewu do pomieszczenia 023/2", unit: "°C" },
            { point: "POMIAR_023_2THE1_T", label: "023/2THE1 - Przetwornik temperatury pomieszczenia 023/2", unit: "°C" },
            { point: "POMIAR_023_2THE1_H", label: "023/2THE1 - Przetwornik wilgotności pomieszczenia 023/2", unit: "%R.H." }
          ]
        }
      ]
    };
  },

  mounted() {
    this.load();
    this.interval = setInterval(this.load, 5000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
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
        this.status = `Pobrano aktualne pomiary: ${(r.data || []).length} punktów`;
      } catch (e) {
        console.error(e);
        this.status = "Błąd pobierania danych";
      }
    },

    getValue(point) {
      const value = this.f[point];

      if (value === undefined || value === null || value === "") {
        return "-";
      }

      return value;
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
  margin: 24px 0 0;
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

.status {
  margin-left: 14px;
  font-weight: bold;
  font-size: 17px;
  color: #36d156;
}
</style>