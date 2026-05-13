<template>
  <div class="page">
    <div class="menubottom">System &gt; Alarmy</div>

    <p class="title">Tabela alarmów</p>

    <div class="toolbar">
      <button class="refresh-btn" @click="load">Odśwież</button>
      <input class="search-input" v-model="search" placeholder="Szukaj..." />
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>data</th>
          <th>wartość</th>
          <th>default</th>
          <th>akcept</th>
          <th>akceptował</th>
          <th>data akceptacji</th>
          <th>Opis</th>
          <th>adres</th>
          <th>Typ</th>
          <th>button</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="alarm in pagedActive"
          :key="alarm.id"
          :class="{ acceptedRow: Number(alarm.accept) === 1 }"
        >
          <td>{{ alarm.name }}</td>
          <td class="date-col">{{ alarm.date }}</td>
          <td class="value-col" :class="getValueClass(alarm.value)">
            {{ alarm.value }}
          </td>
          <td>{{ alarm.default_value ?? alarm.default }}</td>
          <td class="accept-col">{{ alarm.accept }}</td>
          <td>{{ alarm.accepted_user || "-" }}</td>
          <td class="date-col">{{ alarm.accepted_date || "-" }}</td>
          <td class="description-col">{{ alarm.description }}</td>
          <td class="address-col">{{ alarm.address }}</td>
          <td class="type-col">{{ alarm.type }}</td>
          <td class="button-col">
            <button
              :disabled="Number(alarm.accept) === 1"
              @click="acceptAlarm(alarm.id)"
            >
              {{ Number(alarm.accept) === 1 ? "OK" : "Akceptuj" }}
            </button>
          </td>
        </tr>

        <tr v-if="filteredActive.length === 0" class="empty-row">
          <td colspan="11">Brak aktywnych alarmów</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination" v-if="activePages > 1">
      <button @click="activePage--" :disabled="activePage <= 1">◀</button>
      <span>Strona {{ activePage }} / {{ activePages }}</span>
      <button @click="activePage++" :disabled="activePage >= activePages">▶</button>
    </div>

    <p class="title">Tabela alarmów historycznych</p>

    <table class="table">
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>data</th>
          <th>koniec</th>
          <th>wartość</th>
          <th>akcept</th>
          <th>akceptował</th>
          <th>data akceptacji</th>
          <th>Opis</th>
          <th>adres</th>
          <th>Typ</th>
          <th>button</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="alarm in pagedHistory"
          :key="alarm.id"
          :class="{ acceptedRow: Number(alarm.accept) === 1 }"
        >
          <td>{{ alarm.name }}</td>
          <td class="date-col">{{ alarm.date }}</td>
          <td class="date-col">{{ alarm.end_date || "-" }}</td>
          <td class="value-col" :class="getValueClass(alarm.value)">
            {{ alarm.value }}
          </td>
          <td class="accept-col">{{ alarm.accept }}</td>
          <td>{{ alarm.accepted_user || "-" }}</td>
          <td class="date-col">{{ alarm.accepted_date || "-" }}</td>
          <td class="description-col">{{ alarm.description }}</td>
          <td class="address-col">{{ alarm.address }}</td>
          <td class="type-col">{{ alarm.type }}</td>
          <td class="button-col">
            <button
              :disabled="Number(alarm.accept) === 1"
              @click="acceptAlarm(alarm.id)"
            >
              {{ Number(alarm.accept) === 1 ? "OK" : "Akceptuj" }}
            </button>
          </td>
        </tr>

        <tr v-if="filteredHistory.length === 0" class="empty-row">
          <td colspan="11">Brak alarmów historycznych</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination" v-if="historyPages > 1">
      <button @click="historyPage--" :disabled="historyPage <= 1">◀</button>
      <span>Strona {{ historyPage }} / {{ historyPages }}</span>
      <button @click="historyPage++" :disabled="historyPage >= historyPages">▶</button>
    </div>

    <div class="status">{{ status }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AlarmyView",

  data() {
    return {
      api: "http://192.168.1.155:1880",
      active: [],
      history: [],

       activePage: 1,
        historyPage: 1,
        perPage: 20,

      search: "",
      intervalId: null,
      status: ""
    };
  },

  computed: {
    filteredActive() {
      return this.filterRows(this.active);
    },

    filteredHistory() {
      return this.filterRows(this.history);
    },
    activePages() {
  return Math.ceil(this.filteredActive.length / this.perPage);
},

historyPages() {
  return Math.ceil(this.filteredHistory.length / this.perPage);
},

  pagedActive() {
    const start = (this.activePage - 1) * this.perPage;
    const end = start + this.perPage;

    return this.filteredActive.slice(start, end);
  },

  pagedHistory() {
    const start = (this.historyPage - 1) * this.perPage;
    const end = start + this.perPage;

    return this.filteredHistory.slice(start, end);
  }
  },

  mounted() {
    this.load();
    this.intervalId = setInterval(this.load, 3000);
  },

  beforeUnmount() {
    clearInterval(this.intervalId);
  },

  methods: {
    filterRows(rows) {
      const s = this.search.toLowerCase().trim();

      if (!s) return rows;

      return rows.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(s)
        )
      );
    },

    getValueClass(value) {
      const v = String(value || "").toLowerCase().trim();

      if (v === "alarm") return "status-alarm";

      if (v === "ok" || v === "normal" || v === "czysty") {
        return "status-ok";
      }

      return "status-warning";
    },

    getUserName() {
      try {
        const savedUser = localStorage.getItem("user");
        const currentUser = savedUser ? JSON.parse(savedUser) : null;

        return (
          currentUser?.username ||
          currentUser?.name ||
          currentUser?.login ||
          "unknown"
        );
      } catch (e) {
        return "unknown";
      }
    },

    async load() {
      try {
        const res = await axios.get(`${this.api}/api/alarms`);

        this.active = res.data.active || [];
        this.history = res.data.history || [];
        this.status = "";
      } catch (e) {
        console.error(e);
        this.status = "Błąd pobierania alarmów";
      }
    },

    async acceptAlarm(id) {
      try {
        await axios.post(`${this.api}/api/alarms-accept`, {
          id,
          user: this.getUserName()
        });

        this.status = "Alarm zaakceptowany";
        await this.load();
      } catch (e) {
        console.error(e);
        this.status = "Błąd akceptacji alarmu";
      }
    }
  }
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(
    180deg,
    rgba(35,35,35,0.96) 0%,
    rgba(55,55,55,0.92) 100%
  );
  color: #f2f2f2;
  font-family: Arial, Helvetica, sans-serif;
}

.menubottom {
  margin-bottom: 10px;
  color: #d0d0d0;
}

.title {
  text-align: center;
  font-size: 34px;
  margin: 22px 0 25px;
  color: #7ea6ff;
  font-weight: 300;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 15px;
}

.refresh-btn {
  background: #2d6cdf;
  border: none;
  color: white;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.refresh-btn:hover {
  background: #4d84e8;
}

.search-input {
  background: #111;
  border: 1px solid #555;
  color: white;
  padding: 8px 10px;
  border-radius: 4px;
  width: 240px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  color: #f2f2f2;
  font-size: 15px;
}

.table th {
  background: #1f1f1f;
  color: #ffffff;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #555;
  font-weight: 600;
  white-space: nowrap;
}

.table td {
  padding: 10px;
  border-bottom: 1px solid #444;
  background: rgba(30, 30, 30, 0.92);
  color: #f5f5f5;
  vertical-align: top;
}

.table tr:nth-child(even) td {
  background: rgba(45, 45, 45, 0.92);
}

.table tr:hover td {
  background: rgba(70, 70, 70, 0.95);
}

.value-col {
  width: 110px;
  text-align: center;
  white-space: nowrap;
}

.status-alarm {
  color: #ff5c7a !important;
  font-weight: bold;
  text-align: center;
}

.status-ok {
  color: #67d67a !important;
  font-weight: bold;
  text-align: center;
}

.status-warning {
  color: #ffd24d !important;
  font-weight: bold;
  text-align: center;
}

.acceptedRow td,
.acceptedRow .value-col,
.acceptedRow .status-alarm,
.acceptedRow .status-ok,
.acceptedRow .status-warning {
  color: #9a9a9a !important;
}

.accept-col {
  width: 80px;
  text-align: center;
}

.button-col {
  width: 110px;
  text-align: center;
}

.date-col {
  white-space: nowrap;
}

.description-col {
  min-width: 260px;
}

.type-col {
  min-width: 180px;
}

.address-col {
  min-width: 80px;
}

.table button {
  background: #2d6cdf;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.table button:hover {
  background: #4d84e8;
}

.table button:disabled {
  background: #555;
  opacity: 0.8;
  cursor: default;
}

.empty-row td {
  text-align: center;
  padding: 20px;
  color: #bbb;
  font-style: italic;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin: 18px 0 35px;
}

.pagination span {
  color: #ddd;
  font-size: 14px;
}

.pagination button {
  background: #2d6cdf;
  border: none;
  color: white;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:hover {
  background: #4d84e8;
}

.pagination button:disabled {
  background: #555;
  cursor: default;
}

.status {
  margin-top: 15px;
  font-weight: bold;
  color: #ff9a9a;
}

@media (max-width: 1200px) {
  .table {
    font-size: 13px;
  }

  .table td,
  .table th {
    padding: 8px;
  }

  .search-input {
    width: 160px;
  }
}
</style>