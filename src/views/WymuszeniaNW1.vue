<template>
  <div class="page">
    <div class="menubottom">NW1 &gt; Wymuszenia</div>

    <h2 class="title">Wymuszenia</h2>

    <div class="pagebody">
      <div v-for="group in rows" :key="group.section" class="section">
        <p class="sectiontitle">{{ group.section }}</p>

        <table class="table">
          <tr v-for="row in group.items" :key="row.enable">
            <td>
              <b>{{ row.label }}</b>
            </td>

            <td>
              <select v-model="f[row.enable]">
                <option value="0">Auto</option>
                <option value="1">Wymuszenie</option>
              </select>
              <button @click="send(row.enable)">Zapisz</button>
            </td>

            <td>
              <input
                v-if="row.type === 'percent'"
                v-model="f[row.value]"
                type="number"
                step="0.1"
              >

              <select v-if="row.type === 'onoff'" v-model="f[row.value]">
                <option value="0">Off</option>
                <option value="1">On</option>
              </select>

              <span v-if="row.type === 'percent'" class="unit">%</span>

              <button @click="send(row.value)">Zapisz</button>
            </td>
          </tr>
        </table>
      </div>

      <div class="bottom-bar">
        <button @click="load">Odśwież ze sterownika</button>
        <span class="status">{{ status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      api: "http://192.168.1.155:1880",
      status: "",
      f: {},

      rows: [
  {
    section: "Centrala NW1",
    items: [
      { label: "N1", enable: "s09184", value: "t09200", type: "percent" },
      { label: "W1", enable: "s09185", value: "t09201", type: "percent" },
      { label: "W", enable: "s09186", value: "t09202", type: "percent" },
      { label: "1PO1", enable: "s09187", value: "s09203", type: "onoff" },
      { label: "1PO2", enable: "s09188", value: "s09204", type: "onoff" },
      { label: "1PO3", enable: "s09189", value: "s09205", type: "onoff" },
      { label: "1NV1", enable: "s09190", value: "s09206", type: "onoff" },
      { label: "1NV2", enable: "s09191", value: "t09207", type: "percent" },
      { label: "1NV3", enable: "s09192", value: "t09208", type: "percent" },
      { label: "1NV4", enable: "s09193", value: "t09209", type: "percent" },
      { label: "1NV5", enable: "s09194", value: "t09210", type: "percent" },
      { label: "1NV6", enable: "s09195", value: "t09211", type: "percent" },
      { label: "1NP1", enable: "s09196", value: "t09212", type: "percent" }
    ]
  },
  {
    section: "Wentylatory dachowe",
    items: [
      { label: "WD2", enable: "s09197", value: "s09213", type: "onoff" },
      { label: "WD3", enable: "s09198", value: "s09214", type: "onoff" },
      { label: "WD4", enable: "s09199", value: "s09215", type: "onoff" },
      { label: "WD5", enable: "s09226", value: "s09242", type: "onoff" }
    ]
  },
  {
    section: "Nagrzewnice pomieszczeniowe",
    items: [
      { label: "019NE1", enable: "s09216", value: "t09232", type: "percent" },
      { label: "020NE1", enable: "s09217", value: "t09233", type: "percent" },
      { label: "03NE1", enable: "s09218", value: "t09234", type: "percent" },
      { label: "021NE1", enable: "s09219", value: "t09235", type: "percent" },
      { label: "06NE1", enable: "s09220", value: "t09236", type: "percent" },
      { label: "024NE1", enable: "s09221", value: "t09237", type: "percent" },
      { label: "04NE1", enable: "s09222", value: "t09238", type: "percent" },
      { label: "016NE1", enable: "s09223", value: "t09239", type: "percent" },
      { label: "07NE1", enable: "s09224", value: "t09240", type: "percent" }
    ]
  },
  {
    section: "Pompa ciepła technologicznego",
    items: [
      { label: "PCT", enable: "s09225", value: "t09241", type: "percent" }
    ]
  }
]
    };
  },

  mounted(){
    this.load();
  },

  methods:{
    async load(){
      let r = await axios.get(this.api + "/api/nw1-force-values");
      this.f = r.data.values;
      this.status = "OK";
    },

    async send(point) {
      try {
        const savedUser = localStorage.getItem("user");
        const currentUser = savedUser ? JSON.parse(savedUser) : null;

        await axios.post(this.api + "/api/nw1-force-setpoint", {
          point,
          value: this.f[point],
          user: currentUser?.username || "unknown"
        });

        this.status = "Zapisano " + point;
        await this.load();
      } catch (e) {
        console.error(e);
        this.status = "Błąd zapisu " + point;
      }
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
  color: #fff;
  margin: 36px 0 30px;
}

.pagebody {
  background: #2f3136;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 28px 24px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: #383b40;
  border-radius: 8px;
  overflow: hidden;
}

.table tr {
  border-bottom: 1px solid #555;
}

.table td {
  padding: 14px 16px;
  vertical-align: middle;
  color: #f1f1f1;
}

.table td:first-child {
  width: 18%;
  font-size: 20px;
}

.table td:nth-child(2) {
  width: 40%;
}

.table td:nth-child(3) {
  width: 42%;
}

select,
input {
  width: 170px;
  padding: 8px 10px;
  background: #f5f6fa;
  color: #111;
  border-radius: 6px;
  border: 1px solid #aaa;
  font-size: 15px;
  box-sizing: border-box;
}

button {
  margin-left: 10px;
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

.unit {
  margin-left: 8px;
  font-size: 18px;
  font-weight: bold;
}

.bottom-bar {
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid #555;
}

.status {
  margin-left: 14px;
  color: #36d156;
  font-weight: bold;
  font-size: 18px;
}
</style>
