<template>
  <div class="page">
    <div class="menubottom">PCT &gt; Sterowanie</div>
    <p class="title">Pompy ciepła technologicznego</p>

    <p class="sectiontitle">Praca</p>
    <table class="table">
      <tr>
        <td>PCT - Start pomp ciepła technologicznego</td>
        <td>
          <select v-model="f.s10303" disabled>
            <option value="0">Off</option>
            <option value="1">On</option>
          </select>
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Alarmy</p>
    <table class="table">
      <tr>
        <td>PCT - Pompy ciepła technologicznego</td>
        <td>
          <select v-model="f.s09019" disabled>
            <option value="0">OK</option>
            <option value="1">Alarm</option>
          </select>
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Wymuszenia</p>
    <table class="table">
      <tr>
        <td>Załączenie wymuszenia PCT</td>
        <td>
          <select v-model="f.s09225">
            <option value="0">Off</option>
            <option value="1">On</option>
          </select>
          <button @click="send('s09225')">Zapisz</button>
        </td>
      </tr>

      <tr>
        <td>Wartość wymuszenia PCT</td>
        <td>
          <select v-model="f.s09241">
            <option value="0">Off</option>
            <option value="1">On</option>
          </select>
          <button @click="send('s09241')">Zapisz</button>
        </td>
      </tr>
    </table>

    <div class="bottom-bar">
      <button @click="load">Odśwież</button>
      <span>{{ status }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PCT",

  data() {
    return {
      api: "http://192.168.1.155:1880",
      interval: null,
      status: "",
      f: {
        s10303: "0",
        s09019: "0",
        s09225: "0",
        s09241: "0"
      }
    };
  },

  methods: {
    async load() {
      try {
        const res = await axios.get(this.api + "/api/page5-values");

        console.log("ODCZYT page5-values:", res.data);

        if (res.data && res.data.ok && res.data.values) {
          Object.keys(this.f).forEach(point => {
            if (res.data.values[point] !== undefined) {
              this.f[point] = String(res.data.values[point]);
            }
          });
        }

        this.status = "Odczytano";
      } catch (e) {
        console.error("Błąd odczytu page5-values:", e);
        this.status = "Błąd odczytu";
      }
    },

    async send(point) {
      try {
        const savedUser = localStorage.getItem("user");
        const currentUser = savedUser ? JSON.parse(savedUser) : null;

        const res = await axios.post(this.api + "/api/page5-setpoint", {
          point,
          value: this.f[point],
          user: currentUser?.username || "unknown"
        });

        console.log("ZAPIS page5-setpoint:", res.data);

        this.status = "Zapisano " + point;
        await this.load();
      } catch (e) {
        console.error("Błąd zapisu page5-setpoint:", e);
        this.status = "Błąd zapisu " + point;
      }
    }
  },

  mounted() {
    this.load();
    this.interval = setInterval(this.load, 3000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
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