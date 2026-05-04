<template>
  <div class="page">
    <div class="menubottom">NW1 &gt; Pomiary</div>
    <p class="title">Pomiary</p>

    <div class="pagebody">
      <div v-for="section in sections" :key="section.title">
        <p class="sectiontitle">{{ section.title }}</p>

        <table class="table">
          <tr v-for="item in section.items" :key="item.point">
            <td>{{ item.label }}</td>
            <td>
              <span class="value">{{ getValue(item) }}</span>
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
  name: "NW1Pomiary",

  data() {
    return {
      source: "http://192.168.1.155:1880/C1.json",
      status: "",
      interval: null,
      f: {},

      sections: [
        {
          title: "Temperatura zewnętrzna",
          items: [
            {
              point: "POMIAR_0TE1",
              aliases: ["t09057"],
              label: "0TE1 - Czujnik temperatury zewnętrznej",
              unit: "°C"
            }
          ]
        },
        {
          title: "Centrala wentylacyjna",
          items: [
            { point: "POMIAR_1PE1", aliases: ["t09062"], label: "1PE1 - Przetwornik ciśnienia nawiewu N1", unit: "Pa" },
            { point: "POMIAR_1PE2", aliases: ["t09063"], label: "1PE2 - Przetwornik ciśnienia wywiewu W1", unit: "Pa" },
            { point: "POMIAR_1PE3", aliases: ["t09064"], label: "1PE3 - Przetwornik ciśnienia wywiewu W", unit: "Pa" },
            { point: "POMIAR_1TE1", aliases: ["t09056"], label: "1TE1 - Czujnik temperatury odzysku N1", unit: "°C" },
            { point: "POMIAR_1TE2", aliases: ["t09093"], label: "1TE2 - Czujnik temperatury nagrzewnicy wstępnej", unit: "°C" },
            { point: "POMIAR_1THE1_T", aliases: ["t09058"], label: "1THE1 - Przetwornik temperatury nawiewu N1", unit: "°C" },
            { point: "POMIAR_1THE1_H", aliases: ["t09059"], label: "1THE1 - Przetwornik wilgotności nawiewu N1", unit: "%R.H." },
            { point: "POMIAR_1THE1_X", aliases: ["t09094"], label: "1THE1_x - Wilgotność bezwzględna nawiewu N1", unit: "g/kg" },
            { point: "POMIAR_1THE2_T", aliases: ["POMIAR_2THE2_T", "t09060"], label: "2THE2 - Przetwornik temperatury wywiewu W1", unit: "°C" },
            { point: "POMIAR_1THE2_H", aliases: ["POMIAR_2THE2_H", "t09061"], label: "2THE2 - Przetwornik wilgotności wywiewu W1", unit: "%R.H." }
          ]
        },
        {
          title: "Pomieszczenie 03",
          items: [
            { point: "POMIAR_03TE1", aliases: ["t09071"], label: "03TE1 - Czujnik temperatury nawiewu do pomieszczenia 03", unit: "°C" },
            { point: "POMIAR_03THE1_T", aliases: ["t09073"], label: "03THE1 - Przetwornik temperatury pomieszczenia 03", unit: "°C" },
            { point: "POMIAR_03THE1_H", aliases: ["t09074"], label: "03THE1 - Przetwornik wilgotności pomieszczenia 03", unit: "%R.H." }
          ]
        },
        {
          title: "Pomieszczenie 04",
          items: [
            { point: "POMIAR_04TE1", aliases: ["t09083"], label: "04TE1 - Czujnik temperatury nawiewu do pomieszczenia 04", unit: "°C" },
            { point: "POMIAR_04THE1_T", aliases: ["t09085"], label: "04THE1 - Przetwornik temperatury pomieszczenia 04", unit: "°C" },
            { point: "POMIAR_04THE1_H", aliases: ["t09086"], label: "04THE1 - Przetwornik wilgotności pomieszczenia 04", unit: "%R.H." }
          ]
        },
        {
          title: "Pomieszczenie 06",
          items: [
            { point: "POMIAR_06TE1", aliases: ["t09077"], label: "06TE1 - Czujnik temperatury nawiewu do pomieszczenia 06", unit: "°C" },
            { point: "POMIAR_06THE1_T", aliases: ["t09079"], label: "06THE1 - Przetwornik temperatury pomieszczenia 06", unit: "°C" },
            { point: "POMIAR_06THE1_H", aliases: ["t09080"], label: "06THE1 - Przetwornik wilgotności pomieszczenia 06", unit: "%R.H." }
          ]
        },
        {
          title: "Pomieszczenie 07",
          items: [
            { point: "POMIAR_07TE1", aliases: ["t09090"], label: "07TE1 - Czujnik temperatury nawiewu do pomieszczenia 07", unit: "°C" },
            { point: "POMIAR_07THE1_T", aliases: ["t09091"], label: "07THE1 - Przetwornik temperatury pomieszczenia 07", unit: "°C" },
            { point: "POMIAR_07THE1_H", aliases: ["t09092"], label: "07THE1 - Przetwornik wilgotności pomieszczenia 07", unit: "%R.H." }
          ]
        },
        {
          title: "Pomieszczenie 016",
          items: [
            { point: "POMIAR_016TE1", aliases: ["t09084"], label: "016TE1 - Czujnik temperatury nawiewu do pomieszczenia 016", unit: "°C" },
            { point: "POMIAR_016THE1_T", aliases: ["t09087"], label: "016THE1 - Przetwornik temperatury pomieszczenia 016", unit: "°C" },
            { point: "POMIAR_016THE1_H", aliases: ["t09088"], label: "016THE1 - Przetwornik wilgotności pomieszczenia 016", unit: "%R.H." }
          ]
        },
        {
          title: "Pomieszczenie 019",
          items: [
            { point: "POMIAR_019TE1", aliases: ["t09065"], label: "019TE1 - Czujnik temperatury nawiewu do pomieszczenia 019", unit: "°C" },
            { point: "POMIAR_019THE1_T", aliases: ["t09067"], label: "019THE1 - Przetwornik temperatury pomieszczenia 019", unit: "°C" },
            { point: "POMIAR_019THE1_H", aliases: ["t09068"], label: "019THE1 - Przetwornik wilgotności pomieszczenia 019", unit: "%R.H." }
          ]
        },
        {
          title: "Pomieszczenie 020",
          items: [
            { point: "POMIAR_020TE1", aliases: ["t09066"], label: "020TE1 - Czujnik temperatury nawiewu do pomieszczenia 020", unit: "°C" },
            { point: "POMIAR_020THE1_T", aliases: ["t09069"], label: "020THE1 - Przetwornik temperatury pomieszczenia 020", unit: "°C" },
            { point: "POMIAR_020THE1_H", aliases: ["t09070"], label: "020THE1 - Przetwornik wilgotności pomieszczenia 020", unit: "%R.H." }
          ]
        },
        {
          title: "Pomieszczenie 021",
          items: [
            { point: "POMIAR_021TE1", aliases: ["t09072"], label: "021TE1 - Czujnik temperatury nawiewu do pomieszczenia 021", unit: "°C" },
            { point: "POMIAR_021THE1_T", aliases: ["t09075"], label: "021THE1 - Przetwornik temperatury pomieszczenia 021", unit: "°C" },
            { point: "POMIAR_021THE1_H", aliases: ["t09076"], label: "021THE1 - Przetwornik wilgotności pomieszczenia 021", unit: "%R.H." }
          ]
        },
        {
          title: "Pomieszczenie 024",
          items: [
            { point: "POMIAR_024TE1", aliases: ["t09078"], label: "024TE1 - Czujnik temperatury nawiewu do pomieszczenia 024", unit: "°C" },
            { point: "POMIAR_024THE1_T", aliases: ["t09081"], label: "024THE1 - Przetwornik temperatury pomieszczenia 024", unit: "°C" },
            { point: "POMIAR_024THE1_H", aliases: ["t09082"], label: "024THE1 - Przetwornik wilgotności pomieszczenia 024", unit: "%R.H." }
          ]
        },
        {
          title: "Pozostałe",
          items: [
            { point: "POMIAR_SAK1TE1", aliases: ["t09089"], label: "SAK1TE1 - Czujnik temperatury szafy SAK1", unit: "°C" },
            { point: "POMIAR_16TE1", aliases: ["POMIAR_1_6TE1", "POMIAR_0TE1", "t09095"], label: "1.6TE1 - Czujnik temperatury wentylatorni", unit: "°C" }
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

        this.f = {
          ...this.f,
          ...values
        };

        this.status = `Pobrano aktualne pomiary: ${(r.data || []).length} punktów`;
      } catch (e) {
        console.error(e);
        this.status = "Błąd pobierania pomiarów";
      }
    },

    getValue(item) {
      const keys = [item.point, ...(item.aliases || [])];

      for (const key of keys) {
        if (
          this.f[key] !== undefined &&
          this.f[key] !== null &&
          this.f[key] !== ""
        ) {
          return this.f[key];
        }
      }

      return "-";
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