<template>
  <div class="page">
    <div class="menubottom"> W4 &gt; Wymuszenia</div>

    <p class="title">Wymuszenia</p>

    <div class="pagebody">
      <p class="sectiontitle"></p>

      <table class="table">


        <tr>
          <td>Załączenie wymuszenia W4</td>
          <td>
            <select v-model="form.s09139">
              <option value="0">Auto</option>
              <option value="1">Wymuszenie</option>
            </select>
            <button @click="send('s09139')">Zapisz</button>
          </td>
        </tr>

        <tr>
          <td>Wartość wymuszenia W4</td>
          <td>
            <input v-model="form.t09171" type="number" min="0" max="100" step="1" />
            <button @click="send('t09171')">Zapisz</button>
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
import axios from 'axios';

export default {
  name: 'W4Wymuszenia',

  data() {
    return {
      apiBase: 'http://192.168.1.155:1880',

      status: '',
      statusOk: true,

      form: {
        s09136: '0',
        t09168: '0',
        s09137: '0',
        t09169: '0',
        s09138: '0',
        t09170: '0',
        s09139: '0',
        t09171: '0'
      }
    };
  },

  mounted() {
    this.loadInitialValues();
  },

  methods: {
    async loadInitialValues() {
      try {
        const response = await axios.get(`${this.apiBase}/api/page9-values`);

        if (response.data && response.data.values) {
          this.form = {
            ...this.form,
            ...response.data.values
          };
        }

        this.statusOk = true;
        this.status = 'Pobrano aktualne wartości ze sterownika';
      } catch (error) {
        console.error(error);
        this.statusOk = false;
        this.status = 'Błąd pobierania wartości ze sterownika';
      }
    },

    async send(point) {
      let value = this.form[point];

      try {
        const savedUser = localStorage.getItem("user");
        const currentUser = savedUser ? JSON.parse(savedUser) : null;

        const response = await axios.post(`${this.apiBase}/api/page9-force`, {
          point,
          value,
          user: currentUser?.username || "unknown"
        });

        console.log(response.data);

        this.statusOk = true;
        this.status = `Zapisano: ${point} = ${value}`;

        await this.loadInitialValues();
      } catch (error) {
        console.error(error);
        this.statusOk = false;

        if (error.response && error.response.data && error.response.data.error) {
          this.status = `Błąd: ${error.response.data.error}`;
        } else {
          this.status = `Błąd zapisu: ${point}`;
        }
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
  display: none;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: #383b40;
  border: 1px solid #444;
  border-radius: 8px;
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
  width: 65%;
  font-weight: 700;
  font-size: 16px;
}

.table td:nth-child(2) {
  width: 35%;
  white-space: nowrap;
}

input,
select {
  width: 155px;
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

.bottom-bar {
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid #555;
}

.bottom-bar button {
  margin-left: 0;
}

.status {
  margin-left: 14px;
  font-weight: bold;
  font-size: 17px;
}

.status.ok {
  color: #36d156;
}

.status.error {
  color: #ff5c5c;
}
</style>
