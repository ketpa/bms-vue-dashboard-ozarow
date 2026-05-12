<template>
  <div class="page">
    <div class="menubottom">CH &gt; Chłodnia 2</div>

    <p class="title">Chłodnia CH2</p>

    <div class="pagebody">
      <table class="table">
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Wartość</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in ch2Data" :key="item.Name">
            <td>{{ formatName(item.Name) }}</td>

            <td>
              <span
                v-if="item.Name.includes('ALARM')"
                :class="item.Value == 1 ? 'alarm' : 'ok'"
              >
                {{ item.Value == 1 ? "ALARM" : "OK" }}
              </span>

              <span
                v-else-if="
                  item.Name.includes('PRACA') ||
                  item.Name.includes('STEROWANIE')
                "
              >
                {{ item.Value == 1 ? "ON" : "OFF" }}
              </span>

              <span v-else>
                {{ item.Value }}
              </span>
            </td>

            <td>{{ item.Um }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TableCH2",

  data() {
    return {
      allData: [],
      intervalId: null
    };
  },

  computed: {
    ch2Data() {
      return this.allData.filter(
        item =>
          item.Name.includes("CH2")
      );
    }
  },

  methods: {
    async loadData() {
      try {
        const res = await axios.get("http://192.168.1.155:1880/CH.json");

        this.allData = res.data;
      } catch (err) {
        console.error(err);
      }
    },

    formatName(name) {
      return name
        .replaceAll("_", " ")
        .replace("CH2", "")
        .trim();
    },

    startRefresh() {
      this.loadData();

      this.intervalId = setInterval(() => {
        if (!document.hidden) {
          this.loadData();
        }
      }, 3000);
    },

    stopRefresh() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  },

  mounted() {
    this.startRefresh();
  },

  beforeUnmount() {
    this.stopRefresh();
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
  margin-top: 10px;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #383b40;
  border: 1px solid #444;
  border-radius: 8px;
  overflow: hidden;
}

.table thead th {
  background: #202225;
  color: #ffffff;
  padding: 14px 16px;
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  border-bottom: 1px solid #555;
}

.table tr {
  background: #383b40;
}

.table tr:hover {
  background: #42454b;
}

.table td {
  padding: 14px 16px;
  border-bottom: 1px solid #4f5358;
  vertical-align: middle;
  color: #f1f1f1;
  font-size: 15px;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table td:first-child {
  width: 70%;
  font-weight: 700;
  font-size: 16px;
}

.table td:nth-child(2) {
  width: 20%;
  white-space: nowrap;
}

.table td:nth-child(3) {
  width: 10%;
  color: #ffffff;
  font-weight: 700;
}

.ok,
.alarm,
.table td:nth-child(2) span {
  display: inline-block;
  min-width: 120px;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #aaa;
  background: #f5f6fa;
  text-align: right;
  font-size: 15px;
  font-weight: 700;
  box-sizing: border-box;
}

.ok {
  color: #0d7c0d;
}

.alarm {
  color: #c90000;
}

.table td:nth-child(2) span:not(.ok):not(.alarm) {
  color: #111;
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