<template>
  <div class="page">
    <div class="menubottom">System &gt; Historia zmian</div>
    <p class="title">Historia zmian zadanych</p>

    <div class="pagebody">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Czas</th>
            <th>Użytkownik</th>
            <th>Pomieszczenie</th>
            <th>Punkt</th>
            <th>Opis</th>
            <th>Wartość</th>
            <th>Jedn.</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ formatDate(row.czas) }}</td>
            <td>{{ row.user }}</td>
            <td>{{ row.room }}</td>
            <td>{{ row.point }}</td>
            <td>{{ row.label }}</td>
            <td class="value">{{ row.value }}</td>
            <td>{{ row.unit }}</td>
          </tr>
        </tbody>
      </table>

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
  name: "HistoriaZmianView",

  data() {
    return {
      api: "http://192.168.1.155:1880",
      rows: [],
      status: "",
      interval: null
    };
  },

  mounted() {
    this.load();
    this.interval = setInterval(this.load, 2000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
  },

  methods: {
    async load() {
      try {
        const res = await axios.get(`${this.api}/api/zmiany`);
        this.rows = Array.isArray(res.data) ? res.data : [];
        this.status = "Odczytano: " + this.rows.length;
      } catch (e) {
        console.error(e);
        this.status = "Błąd odczytu historii zmian";
      }
    },

    formatDate(v) {
      if (!v) return "";
      return String(v).replace("T", " ").replace("Z", "").slice(0, 19);
    }
  }
};
</script>

<style scoped>
.page {
  color: #eaeaea;
  font-family: Arial, Helvetica, sans-serif;
}

.title {
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  margin: 20px 0;
  color: #ffffff;
}

.pagebody {
  max-width: 1200px;
  margin: 0 auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: #3a3d42;
  border: 1px solid #4a4d52;
  border-radius: 10px;
  overflow: hidden;
}

.table th {
  background: #2d3035;
  color: #ffffff;
  padding: 10px;
  text-align: left;
  font-size: 14px;
}

.table td {
  padding: 9px 10px;
  border-top: 1px solid #4a4d52;
  font-size: 14px;
}

.table tr:hover {
  background: #454951;
}

.value {
  font-weight: bold;
  color: #36d156;
}

.bottom-bar {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

button {
  padding: 7px 14px;
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

.status {
  font-weight: bold;
  color: #36d156;
}
</style>