<template>
  <div class="page">
    <div class="menubottom">UPS &gt; Shutdown</div>

    <p class="title">UPS - Automatyczne wyłączanie</p>

    <div class="pagebody">

      <table class="table">
        <thead>
          <tr>
            <th>Parametr</th>
            <th>Wartość</th>
            <th>Jednostka</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>Napięcie wyłączenia</td>
            <td>
              <input
                v-model.number="cfg.min_voltage"
                type="number"
              />
            </td>
            <td>V</td>
          </tr>

          <tr>
            <td>Poziom baterii wyłączenia</td>
            <td>
              <input
                v-model.number="cfg.min_battery"
                type="number"
              />
            </td>
            <td>%</td>
          </tr>

          <tr>
            <td>Aktualne napięcie UPS</td>
            <td>{{ ups.input_voltage_v || "---" }}</td>
            <td>V</td>
          </tr>

          <tr>
            <td>Aktualny poziom baterii</td>
            <td>{{ ups.battery_percent || "---" }}</td>
            <td>%</td>
          </tr>

          <tr>
            <td>Napięcie wyjściowe</td>
            <td>{{ ups.output_voltage_v || "---" }}</td>
            <td>V</td>
          </tr>

          <tr>
            <td>Obciążenie UPS</td>
            <td>{{ ups.load_percent || "---" }}</td>
            <td>%</td>
          </tr>

          <tr>
            <td>Tryb pracy UPS</td>
            <td colspan="2">
              {{ ups.mode || "---" }}
            </td>
          </tr>

        </tbody>
      </table>

      <!-- DEBUG 
      <pre class="debug">{{ ups }}</pre>-->

      <div class="bottom-bar">
        <button @click="save">
          Zapisz
        </button>

        <button @click="load">
          Odśwież
        </button>

        <span>{{ status }}</span>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UpsShutdown",

  data() {
    return {

      // Node-RED API
      api: "http://192.168.1.155:1880",

      // UPS data
      ups: {
        input_voltage_v: null,
        battery_percent: null,
        output_voltage_v: null,
        load_percent: null,
        mode: null
      },

      // Config
      cfg: {
        min_voltage: 180,
        min_battery: 30
      },

      status: "",
      timer: null
    };
  },

  mounted() {

    this.load();

    this.timer = setInterval(() => {
      this.loadUps();
    }, 5000);

  },

  beforeUnmount() {

    clearInterval(this.timer);

  },

  methods: {

    async loadUps() {

      try {

        const r = await axios.get(
          `${this.api}/api/ups`
        );

        console.log("UPS DATA:", r.data);

        // WAŻNE
        this.ups = { ...r.data };

        this.status = "UPS OK";

      } catch (e) {

        console.log("UPS ERROR:", e);

        this.status = "Błąd odczytu UPS";

      }

    },

    async load() {

      await this.loadUps();

      try {

        const r = await axios.get(
          `${this.api}/api/ups-shutdown-config`
        );

        console.log("CONFIG:", r.data);

        this.cfg.min_voltage =
          r.data.min_voltage ?? 180;

        this.cfg.min_battery =
          r.data.min_battery ?? 30;

        this.status = "Dane odczytane";

      } catch (e) {

        console.log("CONFIG ERROR:", e);

        this.status =
          "Brak configu - użyto domyślnych";

      }

    },

    async save() {

      try {

        await axios.post(
          `${this.api}/api/ups-shutdown-config`,
          this.cfg
        );

        this.status = "Zapisano ustawienia";

      } catch (e) {

        console.log("SAVE ERROR:", e);

        this.status = "Błąd zapisu";

      }

    }

  }
};
</script>

<style scoped>
@import url('@/assets/css/mainC19.css');

.page {
  padding: 10px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
}

.pagebody {
  width: 100%;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: #3f434a;
  color: #ffffff;
}

.table th {
  background: #2f3338;
  padding: 12px;
  border: 1px solid #5a606b;
  text-align: left;
}

.table td {
  padding: 12px;
  border: 1px solid #5a606b;
}

.table tr:nth-child(even) {
  background: #4a4f57;
}

input {
  width: 100px;
  padding: 6px 8px;
  border: 1px solid #888;
  border-radius: 4px;
  background: #f5f5f5;
  color: #111;
  font-size: 14px;
}

.bottom-bar {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  padding: 8px 18px;
  border: none;
  border-radius: 4px;
  background: #2d8cff;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #1f75d6;
}

.bottom-bar span {
  font-weight: bold;
  color: #8ee68e;
}

.debug {
  margin-top: 20px;
  padding: 10px;
  background: #1f2227;
  color: #7CFF7C;
  border: 1px solid #555;
  font-size: 12px;
  overflow-x: auto;
}
</style>