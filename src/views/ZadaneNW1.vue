<template>
  <div class="page">
    <div class="menubottom">NW1 &gt; Zadane</div>
    <p class="title">Zadane</p>

    <p class="sectiontitle">Tryb pracy</p>
    <table class="table">
      <tr>
        <td>Tryb pracy NW1</td>
        <td>
          <select v-model="f.s16421">
            <option value="0">Off</option>
            <option value="1">On</option>
            <option value="2">Harmonogram</option>
          </select>
          <button @click="send('s16421')">Zapisz</button>
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Ciśnienia</p>
    <table class="table">
      <tr v-for="item in pressures" :key="item.point">
        <td>{{ item.label }}</td>
        <td>
          <input v-model="f[item.point]" type="number" step="0.1" />
          Pa
          <button @click="send(item.point)">Zapisz</button>
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Temperatura i wilgotność nawiewu centrali</p>
    <table class="table">
      <tr>
        <td>Tryb zadawania temperatury nawiewu NW1</td>
        <td>
          <select v-model="f.s16532">
            <option value="0">Auto</option>
            <option value="1">Man</option>
          </select>
          <button @click="send('s16532')">Zapisz</button>
        </td>
      </tr>
      <tr>
        <td>Zadana temperatura nawiewu N1</td>
        <td>
          <input v-model="f.t16533" type="number" step="0.1" />
          °C
          <button @click="send('t16533')">Zapisz</button>
        </td>
      </tr>
      <tr>
        <td>Zadana wilgotność bezwzględna N1</td>
        <td>
          <input v-model="f.t16541" type="number" step="0.1" />
          g/kg
          <button @click="send('t16541')">Zapisz</button>
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Regulatory ciśnień w pomieszczeniach</p>
    <table class="table">
      <tr v-for="item in roomPressure" :key="item.point">
        <td>{{ item.label }}</td>
        <td>
          <input v-model="f[item.point]" type="number" step="0.1" />
          %
          <button @click="send(item.point)">Zapisz</button>
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Temperatury w pomieszczeniach</p>
    <table class="table">
      <tr v-for="item in roomTemps" :key="item.point">
        <td>{{ item.label }}</td>
        <td>
          <input v-model="f[item.point]" type="number" step="0.1" />
          °C
          <button @click="send(item.point)">Zapisz</button>
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Harmonogram</p>
    <table class="table">
      <tr v-for="item in schedule" :key="item.point">
        <td>{{ item.label }}</td>
        <td>
          <input v-model="f[item.point]" type="time" />
          <button @click="send(item.point)">Zapisz</button>
        </td>
      </tr>
    </table>

    <p class="sectiontitle">Temperatura maszynowni</p>
    <table class="table">
      <tr>
        <td>Zadana temperatura wentylatorni</td>
        <td>
          <input v-model="f.t16558" type="number" step="0.1" />
          °C
          <button @click="send('t16558')">Zapisz</button>
        </td>
      </tr>
      <tr>
        <td>Histereza temperatury wentylatorni</td>
        <td>
          <input v-model="f.t16559" type="number" step="0.1" />
          °C
          <button @click="send('t16559')">Zapisz</button>
        </td>
      </tr>
    </table>

    <div class="bottom-bar">
      <button @click="load">Odśwież ze sterownika</button>
      <span>{{ status }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NW1Zadane",

  data() {
    return {
      api: "http://192.168.1.155:1880",
      status: "",
      f: {
        s16421: "0",
        s16532: "0"
      },

      pressures: [
        { point: "t16388", label: "Zadane ciśnienie 1PE1" },
        { point: "t16389", label: "Tolerancja ciśnienia 1PE1" },
        { point: "t16394", label: "Zadane ciśnienie 1PE2" },
        { point: "t16395", label: "Tolerancja ciśnienia 1PE2" },
        { point: "t16400", label: "Zadane ciśnienie 1PE3" },
        { point: "t16401", label: "Tolerancja ciśnienia 1PE3" }
      ],

      roomPressure: [
        { point: "t16510", label: "Zadane wysterowanie regulatora ciśn. pom. 03" },
        { point: "t16514", label: "Zadane wysterowanie regulatora ciśn. pom. 04" },
        { point: "t16512", label: "Zadane wysterowanie regulatora ciśn. pom. 06" },
        { point: "t16516", label: "Zadane wysterowanie regulatora ciśn. pom. 07" },
        { point: "t16518", label: "Zadane wysterowanie regulatora ciśn. pom. 013" },
        { point: "t16517", label: "Zadane wysterowanie regulatora ciśn. pom. 015" },
        { point: "t16515", label: "Zadane wysterowanie regulatora ciśn. pom. 016" },
        { point: "t16508", label: "Zadane wysterowanie regulatora ciśn. pom. 017" },
        { point: "t16507", label: "Zadane wysterowanie regulatora ciśn. pom. 018" },
        { point: "t16506", label: "Zadane wysterowanie regulatora ciśn. pom. 019" },
        { point: "t16509", label: "Zadane wysterowanie regulatora ciśn. pom. 020" },
        { point: "t16511", label: "Zadane wysterowanie regulatora ciśn. pom. 021" },
        { point: "t16513", label: "Zadane wysterowanie regulatora ciśn. pom. 024" },
        
        
        
        
        
      ],

      roomTemps: [
        { point: "t16442", label: "Zadana temperatura pom 03" },
        { point: "t16460", label: "Zadana temperatura pom 06" },
        { point: "t16478", label: "Zadana temperatura pom 04" },
        { point: "t16496", label: "Zadana temperatura pom 07" },
        { point: "t16487", label: "Zadana temperatura pom 016" },
        { point: "t16424", label: "Zadana temperatura pom 019" },
        { point: "t16433", label: "Zadana temperatura pom 020" },
        { point: "t16451", label: "Zadana temperatura pom 021" },
        { point: "t16469", label: "Zadana temperatura pom 024" },

      ],

      schedule: [
        { point: "t16407", label: "Poniedziałek godzina załączenia" },
        { point: "t16408", label: "Poniedziałek godzina wyłączenia" },
        { point: "t16409", label: "Wtorek godzina załączenia" },
        { point: "t16410", label: "Wtorek godzina wyłączenia" },
        { point: "t16411", label: "Środa godzina załączenia" },
        { point: "t16412", label: "Środa godzina wyłączenia" },
        { point: "t16413", label: "Czwartek godzina załączenia" },
        { point: "t16414", label: "Czwartek godzina wyłączenia" },
        { point: "t16415", label: "Piątek godzina załączenia" },
        { point: "t16416", label: "Piątek godzina wyłączenia" },
        { point: "t16417", label: "Sobota godzina załączenia" },
        { point: "t16418", label: "Sobota godzina wyłączenia" },
        { point: "t16419", label: "Niedziela godzina załączenia" },
        { point: "t16420", label: "Niedziela godzina wyłączenia" }
      ]
    };
  },

  mounted() {
    this.load();
  },

  methods: {
    async load() {
      try {
        const r = await axios.get(this.api + "/api/nw1-zadane-values");
        this.f = {
          ...this.f,
          ...r.data.values
        };
        this.status = "Pobrano aktualne wartości";
      } catch (e) {
        console.error(e);
        this.status = "Błąd pobierania";
      }
    },

async send(point) {
  try {
    const savedUser = localStorage.getItem("user");
    const currentUser = savedUser ? JSON.parse(savedUser) : null;

    await axios.post(this.api + "/api/nw1-zadane-setpoint", {
      point,
      value: this.f[point],
      user: currentUser?.username || "unknown"
    });

    this.status = "Zapisano " + point;
    await this.load();
  } catch (e) {
    console.error(e);
    this.status = "Błąd zapisu " + point;
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