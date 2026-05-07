<template>
  <div class="page">
    <div class="menubottom">Chillery &gt; Wymuszenia</div>

    <p class="title">Wymuszenia</p>

    <div class="pagebody">
      <p class="sectiontitle"></p>

      <table class="table">
        <tr>
          <td>Załączenie wymuszenia CH1</td>
          <td>
            <select v-model="form.s09140">
              <option value="0">Auto</option>
              <option value="1">Wymuszenie</option>
            </select>
            <button @click="send('s09140')">Zapisz</button>
          </td>
        </tr>

        <tr>
          <td>Wartość wymuszenia CH1</td>
          <td>
            <select v-model="form.s09172">
              <option value="0">Off</option>
              <option value="1">On</option>
            </select>
            <button @click="send('s09172')">Zapisz</button>
          </td>
        </tr>
      </table>

      <div class="bottom-bar">
        <button @click="loadInitialValues">Odśwież ze sterownika</button>
        <span :class="['status', statusOk ? 'ok' : 'error']">
          {{ status }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChilleryWymuszenia",

  data() {
    return {
      apiBase: "http://192.168.1.155:1880",

      status: "",
      statusOk: true,

      form: {
        s09140: "0",
        s09172: "0"
      }
    };
  },

  mounted() {
    this.loadInitialValues();
  },

  methods: {
    async loadInitialValues() {
      try {
        const response = await axios.get(`${this.apiBase}/api/chillery-force-values`);

        if (response.data && response.data.values) {
          this.form = {
            ...this.form,
            ...response.data.values
          };
        }

        this.statusOk = true;
        this.status = "Pobrano aktualne wartości ze sterownika";
      } catch (error) {
        console.error(error);
        this.statusOk = false;
        this.status = "Błąd pobierania wartości ze sterownika";
      }
    },

    async send(point) {
      const value = this.form[point];

      try {
        const savedUser = localStorage.getItem("user");
        const currentUser = savedUser ? JSON.parse(savedUser) : null;

        await axios.post(`${this.apiBase}/api/chillery-force-setpoint`, {
          point,
          value,
          user: currentUser?.username || "unknown"
        });

        this.statusOk = true;
        this.status = `Zapisano: ${point} = ${value}`;

        await this.loadInitialValues();
      } catch (error) {
        console.error(error);
        this.statusOk = false;
        this.status = error.response?.data?.error
          ? `Błąd: ${error.response.data.error}`
          : `Błąd zapisu: ${point}`;
      }
    }
  }
};
</script>

<style scoped>
.page {
  max-width: 900px;
  font-family: Arial, Helvetica, sans-serif;
  color: #eaeaea;
}

/* pasek na górze */
.menubottom {
  background: #f1f1f1;
  color: #111;
  border-bottom: 1px solid #bbb;
  padding: 8px 12px;
  margin-bottom: 20px;
  font-weight: 600;
}

/* tytuł */
.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #ffffff;
}

/* kontener */
.pagebody {
  background: #2f3136;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #444;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

/* tabela */
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
  padding: 14px;
  color: #f1f1f1;
}

.table td:first-child {
  width: 65%;
  font-weight: 600;
}

.table td:nth-child(2) {
  width: 35%;
  white-space: nowrap;
}

/* select */
select {
  width: 140px;
  padding: 6px 8px;
  background: #f5f6fa;
  color: #111;
  border-radius: 6px;
  border: 1px solid #aaa;
}

/* button */
button {
  margin-left: 10px;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: #2d8cff;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: #1f75d6;
}

/* dolny pasek */
.bottom-bar {
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid #555;
}

/* status */
.status {
  margin-left: 12px;
  font-weight: bold;
}

.status.ok {
  color: #36d156;
}

.status.error {
  color: #ff5c5c;
}
</style>
