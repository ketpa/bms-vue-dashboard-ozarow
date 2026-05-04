<template>
  <div class="page">
    <div class="menubottom">NW1 &gt; Wyjścia</div>
    <p class="title">Wyjścia</p>

    <div class="pagebody">
      <div v-for="section in sections" :key="section.title">
        <p class="sectiontitle">{{ section.title }}</p>

        <table class="table">
          <tr v-for="item in section.items" :key="item.point">
            <td>{{ item.label }}</td>
            <td>
              <span
                v-if="item.type === 'onoff'"
                :class="['state', getValue(item.point) == 1 ? 'on' : 'off']"
              >
                {{ getValue(item.point) == 1 ? 'On' : 'Off' }}
              </span>

              <template v-else>
                <span class="value">{{ getValue(item.point) }}</span>
                <span class="unit">{{ item.unit }}</span>
              </template>
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
  name: "NW1Wyjscia",

  data() {
    return {
      source: "http://192.168.1.155:1880/C1.json",
      status: "",
      interval: null,
      f: {},

      sections: [
        {
          title: "Wyjścia cyfrowe",
          items: [
            { point: "WYJ_DO_N1", label: "N1 - Start wentylatora N1", type: "onoff" },
            { point: "WYJ_DO_W1", label: "W1 - Start wentylatora W1", type: "onoff" },
            { point: "WYJ_DO_W", label: "W - Start wentylatora W", type: "onoff" },
            { point: "WYJ_DO_WD2", label: "WD2 - Start wentylatora WD2", type: "onoff" },
            { point: "WYJ_DO_WD3", label: "WD3 - Start wentylatora WD3", type: "onoff" },
            { point: "WYJ_DO_WD4", label: "WD4 - Start wentylatora WD4", type: "onoff" },
            { point: "WYJ_DO_1PO1", label: "1PO1 - Start pompy nagrzewnicy pierwotnej", type: "onoff" },
            { point: "WYJ_DO_1PO2", label: "1PO2 - Start pompy nagrzewnicy wtórnej", type: "onoff" },
            { point: "WYJ_DO_1PO3", label: "1PO3 - Start pompy odzysku glikolowego", type: "onoff" },
            { point: "WYJ_DO_PCT", label: "PCT - Start pompy ciepła technologicznego", type: "onoff" },
            { point: "WYJ_DO_1NV1", label: "1NV1 - Siłownik przepustnicy zewnętrznej N1", type: "onoff" },
            { point: "WYJ_AO_1NP1", label: "1NP1 - Start nawilżacza 1NP1", type: "onoff" },
            { point: "WYJ_DO_6WN1", label: "6WN1 - Start wentylatora szafy SAK1", type: "onoff" },
            { point: "WYJ_DO_WD5", label: "WD5 - Start wentylatora wentylatorni", type: "onoff" }
          ]
        },
        {
          title: "Wyjścia analogowe - centrala NW1",
          items: [
            { point: "WYJ_AO_1NV2", label: "1NV2 - Siłownik nagrzewnicy wstępnej", type: "number", unit: "%" },
            { point: "WYJ_AO_1NV3", label: "1NV3 - Siłownik chłodnicy", type: "number", unit: "%" },
            { point: "WYJ_AO_1NV4", label: "1NV4 - Siłownik nagrzewnicy wtórnej", type: "number", unit: "%" },
            { point: "WYJ_AO_1NV5", label: "1NV5 - Siłownik odzysku glikolowego", type: "number", unit: "%" },
            { point: "WYJ_AO_1NV6", label: "1NV6 - Siłownik przepustnicy wywiewu W1", type: "number", unit: "%" },
            { point: "WYJ_AO_N1_1", label: "N1/1 - Wysterowanie wentylatora N1/1", type: "number", unit: "%" },
            { point: "WYJ_AO_N1_2", label: "N1/2 - Wysterowanie wentylatora N1/2", type: "number", unit: "%" },
            { point: "WYJ_AO_W1", label: "W1 - Wysterowanie wentylatora W1", type: "number", unit: "%" },
            { point: "WYJ_AO_W_1", label: "W/1 - Wysterowanie wentylatora W/1", type: "number", unit: "%" },
            { point: "WYJ_AO_W_2", label: "W/2 - Wysterowanie wentylatora W/2", type: "number", unit: "%" },
            { point: "WYJ_AO_1NP1_PROC", label: "1NP1 - Wysterowanie nawilżacza parowego", type: "number", unit: "%" }
          ]
        },
        {
          title: "Wyjścia analogowe - nagrzewnice pomieszczeniowe",
          items: [
            { point: "WYJ_AO_019NE1", label: "019NE1 - Wysterowanie nagrzewnicy pomieszczenia 019", type: "number", unit: "%" },
            { point: "WYJ_AO_020NE1", label: "020NE1 - Wysterowanie nagrzewnicy pomieszczenia 020", type: "number", unit: "%" },
            { point: "WYJ_AO_03NE1", label: "03NE1 - Wysterowanie nagrzewnicy pomieszczenia 03", type: "number", unit: "%" },
            { point: "WYJ_AO_021NE1", label: "021NE1 - Wysterowanie nagrzewnicy pomieszczenia 021", type: "number", unit: "%" },
            { point: "WYJ_AO_06NE1", label: "06NE1 - Wysterowanie nagrzewnicy pomieszczenia 06", type: "number", unit: "%" },
            { point: "WYJ_AO_024NE1", label: "024NE1 - Wysterowanie nagrzewnicy pomieszczenia 024", type: "number", unit: "%" },
            { point: "WYJ_AO_04NE1", label: "04NE1 - Wysterowanie nagrzewnicy pomieszczenia 04", type: "number", unit: "%" },
            { point: "WYJ_AO_016NE1", label: "016NE1 - Wysterowanie nagrzewnicy pomieszczenia 016", type: "number", unit: "%" },
            { point: "WYJ_AO_07NE1", label: "07NE1 - Wysterowanie nagrzewnicy pomieszczenia 07", type: "number", unit: "%" }
          ]
        },
        {
          title: "Wyjścia analogowe - regulatory ciśnienia",
          items: [
            { point: "WYJ_AO_019NV1", label: "019NV1 - Wysterowanie regulatora ciśnienia pomieszczenia 019", type: "number", unit: "%" },
            { point: "WYJ_AO_018NV1", label: "018NV1 - Wysterowanie regulatora ciśnienia pomieszczenia 018", type: "number", unit: "%" },
            { point: "WYJ_AO_017NV1", label: "017NV1 - Wysterowanie regulatora ciśnienia pomieszczenia 017", type: "number", unit: "%" },
            { point: "WYJ_AO_020NV1", label: "020NV1 - Wysterowanie regulatora ciśnienia pomieszczenia 020", type: "number", unit: "%" },
            { point: "WYJ_AO_03NV1", label: "03NV1 - Wysterowanie regulatora ciśnienia pomieszczenia 03", type: "number", unit: "%" },
            { point: "WYJ_AO_021NV1", label: "021NV1 - Wysterowanie regulatora ciśnienia pomieszczenia 021", type: "number", unit: "%" },
            { point: "WYJ_AO_06NV1", label: "06NV1 - Wysterowanie regulatora ciśnienia pomieszczenia 06", type: "number", unit: "%" },
            { point: "WYJ_AO_024NV1", label: "024NV1 - Wysterowanie regulatora ciśnienia pomieszczenia 024", type: "number", unit: "%" },
            { point: "WYJ_AO_04NV1", label: "04NV1 - Wysterowanie regulatora ciśnienia pomieszczenia 04", type: "number", unit: "%" },
            { point: "WYJ_AO_016NV1", label: "016NV1 - Wysterowanie regulatora ciśnienia pomieszczenia 016", type: "number", unit: "%" },
            { point: "WYJ_AO_07NV1", label: "07NV1 - Wysterowanie regulatora ciśnienia pomieszczenia 07", type: "number", unit: "%" },
            { point: "WYJ_AO_015NV1", label: "015NV1 - Wysterowanie regulatora ciśnienia pomieszczenia 015", type: "number", unit: "%" },
            { point: "WYJ_AO_013NV1", label: "013NV1 - Wysterowanie regulatora ciśnienia pomieszczenia 013", type: "number", unit: "%" }
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
        this.status = `Pobrano aktualne wartości: ${(r.data || []).length} punktów`;
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

.state {
  display: inline-block;
  min-width: 90px;
  padding: 8px 14px;
  border-radius: 6px;
  font-weight: 700;
  text-align: center;
}

.state.on {
  background: #1f9d55;
  color: white;
}

.state.off {
  background: #555b63;
  color: #eaeaea;
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