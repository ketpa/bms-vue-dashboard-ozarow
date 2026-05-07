<template>
  <div class="page">
    <div class="menubottom">SAK1 &gt; Sterowanie</div>
    <p class="title">Szafa SAK1</p>

    <p class="sectiontitle">Pomiary</p>
    <table class="table">
      <tr>
        <td>SAK1TE1 - Czujnik temperatury szafy SAK1</td>
        <td>
          <input v-model="f.t09089" type="number" step="0.1" readonly />
          °C
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Wyjścia</p>
    <table class="table">
      <tr>
        <td>6WN1 - Start wentylatora szafy SAK1</td>
        <td>
          <select v-model="f.s09117" disabled>
            <option value="0">Off</option>
            <option value="1">On</option>
          </select>
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Alarmy</p>
    <table class="table">
      <tr>
        <td>SAK1TE1 - Czujnik temperatury szafy SAK1</td>
        <td>
          <select v-model="f.s08993" disabled>
            <option value="0">OK</option>
            <option value="1">Alarm</option>
          </select>
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Zadane</p>
    <table class="table">
      <tr>
        <td>Temperatura zadana szafy SAK1</td>
        <td>
          <input v-model="f.t16551" type="number" step="0.1" />
          °C
          <button @click="send('t16551')">Zapisz</button>
        </td>
      </tr>

      <tr>
        <td>Histereza zadana szafy SAK1</td>
        <td>
          <input v-model="f.t16552" type="number" step="0.1" />
          °C
          <button @click="send('t16552')">Zapisz</button>
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Wymuszenia</p>
    <table class="table">
      <tr>
        <td>Załączenie wymuszenia wentylatora 6WN1</td>
        <td>
          <select v-model="f.s09226">
            <option value="0">Off</option>
            <option value="1">On</option>
          </select>
          <button @click="send('s09226')">Zapisz</button>
        </td>
      </tr>

      <tr>
        <td>Wartość wymuszenia wentylatora 6WN1</td>
        <td>
          <select v-model="f.s09242">
            <option value="0">Off</option>
            <option value="1">On</option>
          </select>
          <button @click="send('s09242')">Zapisz</button>
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
  name: "SAK1",

  data() {
    return {
      api: "http://192.168.1.155:1880",
      interval: null,
      status: "",
      f: {
        t09089: "",
        s09117: "0",
        s08993: "0",
        t16551: "",
        t16552: "",
        s09226: "0",
        s09242: "0"
      }
    };
  },

  methods: {
    async load() {
      try {
        const res = await axios.get(this.api + "/api/page6-values");

        console.log("ODCZYT page6-values:", res.data);

        if (res.data && res.data.ok && res.data.values) {
          Object.keys(this.f).forEach(point => {
            if (res.data.values[point] !== undefined) {
              this.f[point] = String(res.data.values[point]);
            }
          });
        }

        this.status = "Odczytano";
      } catch (e) {
        console.error("Błąd odczytu page6-values:", e);
        this.status = "Błąd odczytu";
      }
    },

    async send(point) {
      try {
        const savedUser = localStorage.getItem("user");
        const currentUser = savedUser ? JSON.parse(savedUser) : null;

        const res = await axios.post(this.api + "/api/page6-setpoint", {
          point,
          value: this.f[point],
          user: currentUser?.username || "unknown"
        });

        console.log("ZAPIS page6-setpoint:", res.data);

        this.status = "Zapisano " + point;
        await this.load();
      } catch (e) {
        console.error("Błąd zapisu page6-setpoint:", e);
        this.status = "Błąd zapisu " + point;
      }
    }
  },

  mounted() {
    this.load();
    this.interval = setInterval(this.load, 13000);
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