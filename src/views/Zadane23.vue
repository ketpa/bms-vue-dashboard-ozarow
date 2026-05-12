<template>
  <div class="page">
    <div class="menubottom">NW2 &gt; Zadane</div>

    <p class="title">Zadane</p>

    <div class="pagebody">




      <p class="sectiontitle">Zadane pomieszczenia 023/2</p>
      <table class="table">

        <tr>
          <td>Zadane wysterowanie regulatora ciśn. pom. 023/2</td>
          <td>
            <input v-model="form.t16435" type="number" step="0.1" />
            %
            <button @click="send('t16435')">Zapisz</button>
          </td>
        </tr>

        <tr>
          <td>Zadana temperatura pom 023/2</td>
          <td>
            <input v-model="form.t16424" type="number" step="0.1" />
            °C
            <button @click="send('t16424')">Zapisz</button>
          </td>
        </tr>
      </table>



      <div class="bottom-bar">
        <button @click="loadInitialValues">Odśwież ze sterownika</button>
        <span :class="['status', statusOk ? 'ok' : 'error']">{{ status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NW23zadane',

  data() {
    return {
      apiBase: 'http://192.168.1.155:1880',
      status: '',
      statusOk: true,

      form: {
        s16421: '0',
        t16388: '0',
        t16389: '0',
        t16394: '0',
        t16395: '0',
        t16400: '0',
        t16401: '0',
        s16449: '0',
        t16450: '21.0',
        t16458: '0.0',
        t16434: '0.0',
        t16435: '0.0',
        t16424: '21.0',
        t16407: '08:00',
        t16408: '17:00',
        t16409: '08:00',
        t16410: '17:00',
        t16411: '08:00',
        t16412: '17:00',
        t16413: '08:00',
        t16414: '17:00',
        t16415: '08:00',
        t16416: '17:00',
        t16417: '08:00',
        t16418: '17:00',
        t16419: '08:00',
        t16420: '17:00'
      },

      pressureFields: [
        { point: 't16388', label: 'Zadane ciśnienie 2PE1' },
        { point: 't16389', label: 'Tolerancja ciśnienia 2PE1' },
        { point: 't16394', label: 'Zadane ciśnienie 2PE2' },
        { point: 't16395', label: 'Tolerancja ciśnienia 2PE2' },
        { point: 't16400', label: 'Zadane ciśnienie 2PE3' },
        { point: 't16401', label: 'Tolerancja ciśnienia 2PE3' }
      ],

      scheduleFields: [
        { point: 't16407', label: 'Poniedziałek godzina załączenia' },
        { point: 't16408', label: 'Poniedziałek godzina wyłączenia' },
        { point: 't16409', label: 'Wtorek godzina załączenia' },
        { point: 't16410', label: 'Wtorek godzina wyłączenia' },
        { point: 't16411', label: 'Środa godzina załączenia' },
        { point: 't16412', label: 'Środa godzina wyłączenia' },
        { point: 't16413', label: 'Czwartek godzina załączenia' },
        { point: 't16414', label: 'Czwartek godzina wyłączenia' },
        { point: 't16415', label: 'Piątek godzina załączenia' },
        { point: 't16416', label: 'Piątek godzina wyłączenia' },
        { point: 't16417', label: 'Sobota godzina załączenia' },
        { point: 't16418', label: 'Sobota godzina wyłączenia' },
        { point: 't16419', label: 'Niedziela godzina załączenia' },
        { point: 't16420', label: 'Niedziela godzina wyłączenia' }
      ]
    };
  },

  mounted() {
    this.loadInitialValues();
  },

  methods: {
    async loadInitialValues() {
      try {
        const response = await axios.get(`${this.apiBase}/api/page3-values`);

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
  try {
    const savedUser = localStorage.getItem("user");
    const currentUser = savedUser ? JSON.parse(savedUser) : null;

    const value = this.form[point];

    await axios.post(`${this.apiBase}/api/page3-setpoint`, {
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
    this.status = `Błąd zapisu: ${point}`;
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
  width: 62%;
  font-weight: 700;
  font-size: 16px;
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
  color: #36d156;
}
</style>
