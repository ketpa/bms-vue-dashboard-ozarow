<template>
  <div class="page">
    <div class="menubottom">Pozostałe &gt; Chłodz. wentylatorni</div>

    <p class="title">Chłodzenie wentylatorni</p>

    <div class="pagebody">
      <p class="sectiontitle">Pomiary</p>
      <table class="table">
        <tr>
          <td>1.6TE1 - Czujnik temperatury wentylatorni</td>
          <td>{{ display("t09059") }} °C</td>
        </tr>
      </table>

      <p class="sectiontitle">Wyjścia</p>
      <table class="table">
        <tr>
          <td>WD5 - Start wentylatora chłodzenia wentylatorni</td>
          <td>{{ onOff(display("s09083")) }}</td>
        </tr>
      </table>

      <p class="sectiontitle">Alarmy</p>
      <table class="table">
        <tr>
          <td>1.6TE1 - Czujnik temperatury wentylatorni</td>
          <td>{{ alarm(display("s08993")) }}</td>
        </tr>
      </table>

      <p class="sectiontitle">Zadane</p>
      <table class="table">
        <tr>
          <td>Temperatura zadana wentylatorni</td>
          <td>
            <input v-model="form.t16554" type="number" step="0.1" />
            °C
            <button @click="send('t16554')">Zapisz</button>
          </td>
        </tr>

        <tr>
          <td>Histereza zadana wentylatorni</td>
          <td>
            <input v-model="form.t16555" type="number" step="0.1" />
            °C
            <button @click="send('t16555')">Zapisz</button>
          </td>
        </tr>
      </table>

      <p class="sectiontitle">Wymuszenia</p>
      <table class="table">
        <tr>
          <td>Załączenie wymuszenia wentylatora WD5</td>
          <td>
            <select v-model="form.s09141">
              <option value="0">Auto</option>
              <option value="1">Wymuszenie</option>
            </select>
            <button @click="send('s09141')">Zapisz</button>
          </td>
        </tr>

        <tr>
          <td>Wartość wymuszenia wentylatora WD5</td>
          <td>
            <select v-model="form.s09173">
              <option value="0">Off</option>
              <option value="1">On</option>
            </select>
            <button @click="send('s09173')">Zapisz</button>
          </td>
        </tr>
      </table>

      <div v-if="status" class="status">
        {{ status }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WentylatorniaView",

  data() {
    return {
      api: "http://192.168.1.155:1880",
      values: {},
      form: {
        t16554: "",
        t16555: "",
        s09141: "0",
        s09173: "0"
      },
      status: "",
      intervalId: null
    };
  },

  mounted() {
    this.load();

    this.intervalId = setInterval(() => {
      if (!document.hidden) {
        this.load();
      }
    }, 13000);
  },

  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },

  methods: {
    async load() {
      try {
        const res = await axios.get(`${this.api}/api/wentylatornia-values`);
        const data = res.data.values || {};

        this.values = data;

        for (const key of Object.keys(this.form)) {
          if (data[key] && data[key].value !== null) {
            this.form[key] = String(data[key].value);
          }
        }
      } catch (e) {
        console.error(e);
        this.status = "Błąd odczytu danych";
      }
    },

    display(point) {
      return this.values?.[point]?.value ?? "---";
    },

    onOff(v) {
      if (String(v) === "1") return "On";
      if (String(v) === "0") return "Off";
      return "---";
    },

    alarm(v) {
      if (String(v) === "1") return "Alarm";
      if (String(v) === "0") return "OK";
      return "---";
    },

    async send(point) {
      try {
        const savedUser = localStorage.getItem("user");
        const currentUser = savedUser ? JSON.parse(savedUser) : null;

        await axios.post(`${this.api}/api/wentylatornia-setpoint`, {
          point,
          value: this.form[point],
          user: currentUser?.username || "unknown"
        });

        this.status = `Zapisano ${point}`;
        await this.load();
      } catch (e) {
        console.error(e);
        this.status = `Błąd zapisu ${point}`;
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
