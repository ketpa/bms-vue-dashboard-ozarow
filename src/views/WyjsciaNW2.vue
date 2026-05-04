<template>
  <div class="page">
    <div class="menubottom">NW2 &gt; Wyjścia</div>
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
  name: "NW2Wyjscia",

  data() {
    return {
      source: "http://192.168.1.155:1880/C2.json",
      status: "",
      interval: null,
      f: {},

      sections: [
        {
          title: "Wyjścia cyfrowe",
          items: [
            { point: "WYJ_DO_N2", label: "N2 - Start wentylatora N2", type: "onoff" },
            { point: "WYJ_DO_W2", label: "W2 - Start wentylatora W2", type: "onoff" },
            { point: "WYJ_DO_W2A", label: "W2A - Start wentylatora W2A", type: "onoff" },
            { point: "WYJ_DO_WD1", label: "WD1 - Start wentylatora WD1", type: "onoff" },
            { point: "WYJ_DO_2PO1", label: "2PO1 - Start pompy nagrzewnicy pierwotnej", type: "onoff" },
            { point: "WYJ_DO_2PO2", label: "2PO2 - Start pompy nagrzewnicy wtórnej", type: "onoff" },
            { point: "WYJ_DO_2PO3", label: "2PO3 - Start pompy odzysku glikolowego", type: "onoff" },
            { point: "WYJ_DO_2NV1", label: "2NV1 - Siłownik przepustnicy zewnętrznej N2", type: "onoff" },
            { point: "WYJ_AO_2NP1", label: "2NP1 - Start nawilżacza 2NP1", type: "onoff" }
          ]
        },
        {
          title: "Wyjścia analogowe - centrala NW2",
          items: [
            { point: "WYJ_AO_2NV2", label: "2NV2 - Siłownik nagrzewnicy wstępnej", type: "number", unit: "%" },
            { point: "WYJ_AO_2NV3", label: "2NV3 - Siłownik chłodnicy", type: "number", unit: "%" },
            { point: "WYJ_AO_2NV4", label: "2NV4 - Siłownik nagrzewnicy wtórnej", type: "number", unit: "%" },
            { point: "WYJ_AO_2NV5", label: "2NV5 - Siłownik odzysku glikolowego", type: "number", unit: "%" },
            { point: "WYJ_AO_2NV6", label: "2NV6 - Siłownik przepustnicy wywiewu W1", type: "number", unit: "%" },
            { point: "WYJ_AO_N2", label: "N2 - Wysterowanie wentylatora N2", type: "number", unit: "%" },
            { point: "WYJ_AO_W2", label: "W2 - Wysterowanie wentylatora W2", type: "number", unit: "%" },
            { point: "WYJ_AO_W2A", label: "W2A - Wysterowanie wentylatora W2A", type: "number", unit: "%" },
            { point: "WYJ_AO_2NP1_PROC", label: "2NP1 - Wysterowanie nawilżacza parowego", type: "number", unit: "%" }
          ]
        },
        {
          title: "Wyjścia analogowe - pomieszczenia",
          items: [
            { point: "WYJ_AO_023_2NE1", label: "023/2NE1 - Wysterowanie nagrzewnicy pomieszczenia 023/2", type: "number", unit: "%" },
            { point: "WYJ_AO_022A_NV1", label: "022aNV1 - Wysterowanie regulatora ciśnienia pomieszczenia 022a", type: "number", unit: "%" },
            { point: "WYJ_AO_023_2NV1", label: "023aNV1 - Wysterowanie regulatora ciśnienia pomieszczenia 023/2", type: "number", unit: "%" }
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