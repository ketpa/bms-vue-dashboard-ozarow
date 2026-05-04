<template>
  <div class="page">
    <div class="menubottom">NW2 &gt; Wymuszenia</div>
    <p class="title">Wymuszenia</p>

    <p class="sectiontitle">Centrala NW2</p>
    <table class="table">
      <tr v-for="item in centrala" :key="item.enable">
        <td>{{ item.label }}</td>
        <td>
          <select v-model="form[item.enable]">
            <option value="0">Auto</option>
            <option value="1">Wymuszenie</option>
          </select>
          <button @click="send(item.enable)">Zapisz</button>
        </td>
        <td>
          <select v-if="item.type === 'onoff'" v-model="form[item.value]">
            <option value="0">Off</option>
            <option value="1">On</option>
          </select>

          <input v-else v-model="form[item.value]" type="number" min="0" max="100" step="0.1" />
          <span v-if="item.type === 'percent'"> %</span>

          <button @click="send(item.value)">Zapisz</button>
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Wentylatory dachowe</p>
    <table class="table">
      <tr>
        <td>Wymuszenie WD1</td>
        <td>
          <select v-model="form.s09133">
            <option value="0">Auto</option>
            <option value="1">Wymuszenie</option>
          </select>
          <button @click="send('s09133')">Zapisz</button>
        </td>
        <td>
          <select v-model="form.s09159">
            <option value="0">Off</option>
            <option value="1">On</option>
          </select>
          <button @click="send('s09159')">Zapisz</button>
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Nagrzewnice pomieszczeniowe</p>
    <table class="table">
      <tr>
        <td>Wymuszenie 023/2NE1</td>
        <td>
          <select v-model="form.s09134">
            <option value="0">Auto</option>
            <option value="1">Wymuszenie</option>
          </select>
          <button @click="send('s09134')">Zapisz</button>
        </td>
        <td>
          <input v-model="form.t09166" type="number" min="0" max="100" step="0.1" />
          %
          <button @click="send('t09166')">Zapisz</button>
        </td>
      </tr>
    </table>

    <div class="bottom-bar">
      <button @click="loadInitialValues">Odśwież ze sterownika</button>
      <span :class="['status', statusOk ? 'ok' : 'error']">{{ status }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NW2Wymuszenia',

  data() {
    return {
      apiBase: 'http://192.168.1.155:1880',
      userName: 'pawel',
      status: '',
      statusOk: true,

      form: {
        s09120: '0', t09152: '0.0',
        s09121: '0', t09153: '0.0',
        s09122: '0', t09154: '0.0',
        s09123: '0', s09155: '0',
        s09124: '0', s09156: '0',
        s09125: '0', s09157: '0',
        s09126: '0', s09158: '0',
        s09127: '0', t09160: '0.0',
        s09128: '0', t09161: '0.0',
        s09129: '0', t09162: '0.0',
        s09130: '0', t09163: '0.0',
        s09131: '0', t09164: '0.0',
        s09132: '0', t09165: '0.0',
        s09133: '0', s09159: '0',
        s09134: '0', t09166: '0.0'
      },

      centrala: [
        { label: 'Wymuszenie N2', enable: 's09120', value: 't09152', type: 'percent' },
        { label: 'Wymuszenie W2', enable: 's09121', value: 't09153', type: 'percent' },
        { label: 'Wymuszenie W2A', enable: 's09122', value: 't09154', type: 'percent' },
        { label: 'Wymuszenie 2PO1', enable: 's09123', value: 's09155', type: 'onoff' },
        { label: 'Wymuszenie 2PO2', enable: 's09124', value: 's09156', type: 'onoff' },
        { label: 'Wymuszenie 2PO3', enable: 's09125', value: 's09157', type: 'onoff' },
        { label: 'Wymuszenie 2NV1', enable: 's09126', value: 's09158', type: 'onoff' },
        { label: 'Wymuszenie 2NV2', enable: 's09127', value: 't09160', type: 'percent' },
        { label: 'Wymuszenie 2NV3', enable: 's09128', value: 't09161', type: 'percent' },
        { label: 'Wymuszenie 2NV4', enable: 's09129', value: 't09162', type: 'percent' },
        { label: 'Wymuszenie 2NV5', enable: 's09130', value: 't09163', type: 'percent' },
        { label: 'Wymuszenie 2NV6', enable: 's09131', value: 't09164', type: 'percent' },
        { label: 'Wymuszenie 2NP1', enable: 's09132', value: 't09165', type: 'percent' }
      ]
    };
  },

  mounted() {
    this.loadInitialValues();
  },

  methods: {
    async loadInitialValues() {
      try {
        const response = await axios.get(`${this.apiBase}/api/page4-values`);

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
      const value = this.form[point];

      try {
        await axios.post(`${this.apiBase}/api/page4-force`, {
          point,
          value,
          user: this.userName
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
  width: 42%;
  font-weight: 700;
  font-size: 16px;
}

.table td:nth-child(2),
.table td:nth-child(3) {
  width: 29%;
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
  padding: 18px 0;
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