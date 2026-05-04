<template>
  <div class="page">
    <div class="menubottom">NW3, W4 &gt; Zadane</div>

    <p class="title">Zadane</p>

    <div class="pagebody">
      <p class="sectiontitle">Tryby pracy</p>

      <table class="table">
        <tr>
          <td>Tryb pracy NW3</td>
          <td>
            <select v-model="form.s16482">
              <option value="0">Off</option>
              <option value="1">On</option>
              <option value="2">Harmonogram</option>
            </select>
            <button @click="send('s16482')">Zapisz</button>
          </td>
        </tr>

        <tr>
          <td>Tryb pracy W4</td>
          <td>
            <select v-model="form.s16516">
              <option value="0">Off</option>
              <option value="1">On</option>
              <option value="2">Harmonogram</option>
            </select>
            <button @click="send('s16516')">Zapisz</button>
          </td>
        </tr>
      </table>

      <p class="sectiontitle">Temperatura zadana</p>

      <table class="table">
        <tr>
          <td>Tryb zadawania temperatury nawiewu NW3</td>
          <td>
            <select v-model="form.s16483">
              <option value="0">Auto</option>
              <option value="1">Man</option>
            </select>
            <button @click="send('s16483')">Zapisz</button>
          </td>
        </tr>

        <tr>
          <td>Zadana temperatura nawiewu NW3</td>
          <td>
            <input
              v-model="form.t16486"
              type="number"
              step="0.1"
              min="10"
              max="35"
            />
            °C
            <button @click="send('t16486')">Zapisz</button>
          </td>
        </tr>
      </table>

      <p class="sectiontitle">Harmonogram NW3</p>

      <table class="table">
        <tr v-for="item in nw3Schedule" :key="item.point">
          <td>{{ item.label }}</td>
          <td>
            <input v-model="form[item.point]" type="time" />
            <button @click="send(item.point)">Zapisz</button>
          </td>
        </tr>
      </table>

      <p class="sectiontitle">Harmonogram W4</p>

      <table class="table">
        <tr v-for="item in w4Schedule" :key="item.point">
          <td>{{ item.label }}</td>
          <td>
            <input v-model="form[item.point]" type="time" />
            <button @click="send(item.point)">Zapisz</button>
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
  name: 'NW3W4Zadane',

  data() {
    return {
      apiBase: 'http://192.168.1.155:1880',
      userName: 'pawel',

      status: '',
      statusOk: true,

      form: {
        s16482: '0',
        s16516: '0',
        s16483: '0',
        t16486: '21.0',

        t16468: '08:00',
        t16469: '17:00',
        t16470: '08:00',
        t16471: '17:00',
        t16472: '08:00',
        t16473: '17:00',
        t16474: '08:00',
        t16475: '17:00',
        t16476: '08:00',
        t16477: '17:00',
        t16478: '08:00',
        t16479: '17:00',
        t16480: '08:00',
        t16481: '17:00',

        t16502: '08:00',
        t16503: '17:00',
        t16504: '08:00',
        t16505: '17:00',
        t16506: '08:00',
        t16507: '17:00',
        t16508: '08:00',
        t16509: '17:00',
        t16510: '08:00',
        t16511: '17:00',
        t16512: '08:00',
        t16513: '17:00',
        t16514: '08:00',
        t16515: '17:00'
      },

      nw3Schedule: [
        { point: 't16468', label: 'Poniedziałek godzina załączenia' },
        { point: 't16469', label: 'Poniedziałek godzina wyłączenia' },
        { point: 't16470', label: 'Wtorek godzina załączenia' },
        { point: 't16471', label: 'Wtorek godzina wyłączenia' },
        { point: 't16472', label: 'Środa godzina załączenia' },
        { point: 't16473', label: 'Środa godzina wyłączenia' },
        { point: 't16474', label: 'Czwartek godzina załączenia' },
        { point: 't16475', label: 'Czwartek godzina wyłączenia' },
        { point: 't16476', label: 'Piątek godzina załączenia' },
        { point: 't16477', label: 'Piątek godzina wyłączenia' },
        { point: 't16478', label: 'Sobota godzina załączenia' },
        { point: 't16479', label: 'Sobota godzina wyłączenia' },
        { point: 't16480', label: 'Niedziela godzina załączenia' },
        { point: 't16481', label: 'Niedziela godzina wyłączenia' }
      ],

      w4Schedule: [
        { point: 't16502', label: 'Poniedziałek godzina załączenia' },
        { point: 't16503', label: 'Poniedziałek godzina wyłączenia' },
        { point: 't16504', label: 'Wtorek godzina załączenia' },
        { point: 't16505', label: 'Wtorek godzina wyłączenia' },
        { point: 't16506', label: 'Środa godzina załączenia' },
        { point: 't16507', label: 'Środa godzina wyłączenia' },
        { point: 't16508', label: 'Czwartek godzina załączenia' },
        { point: 't16509', label: 'Czwartek godzina wyłączenia' },
        { point: 't16510', label: 'Piątek godzina załączenia' },
        { point: 't16511', label: 'Piątek godzina wyłączenia' },
        { point: 't16512', label: 'Sobota godzina załączenia' },
        { point: 't16513', label: 'Sobota godzina wyłączenia' },
        { point: 't16514', label: 'Niedziela godzina załączenia' },
        { point: 't16515', label: 'Niedziela godzina wyłączenia' }
      ]
    };
  },

  mounted() {
    this.loadInitialValues();
  },

  methods: {
    async loadInitialValues() {
      try {
        const response = await axios.get(`${this.apiBase}/api/page8-values`);

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

      if (point === 't16486') {
        value = String(value).replace(',', '.');

        if (!value.includes('.')) {
          value = value + '.0';
        }
      }

      try {
        const response = await axios.post(`${this.apiBase}/api/setpoint`, {
          point,
          value,
          user: this.userName
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