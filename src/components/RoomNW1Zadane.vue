<template>
  <div class="page">
    <div class="menubottom">NW1 &gt; Pomieszczenie {{ room }} &gt; Zadane</div>
    <p class="title">Zadane pomieszczenia {{ room }}</p>

    <div class="pagebody">
      <template v-for="section in sections" :key="section.title">
        <p class="sectiontitle">{{ section.title }}</p>

        <table class="table">
          <tr v-for="item in section.items" :key="item.point">
            <td>{{ item.label }}</td>
            <td>
              <select v-if="item.type === 'select'" v-model="f[item.point]">
                <option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>

              <input
                v-else-if="item.type === 'time'"
                v-model="f[item.point]"
                type="time"
              />

              <input
                v-else
                v-model="f[item.point]"
                type="number"
                step="0.1"
              />

              <span class="unit">{{ item.unit }}</span>

              <button @click="send(item)">Zapisz</button>
            </td>
          </tr>
        </table>
      </template>

      <div class="bottom-bar">
        <button @click="load">Odśwież ze sterownika</button>
        <span class="status">{{ status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const commonSections = [
  {
    title: "Tryb pracy",
    items: [
      {
        point: "s16421",
        label: "Tryb pracy NW1",
        type: "select",
        unit: "",
        options: [
          { value: "0", label: "Off" },
          { value: "1", label: "On" },
          { value: "2", label: "Harmonogram" }
        ]
      }
    ]
  },

  {
    title: "Ciśnienia centrali",
    items: [
      { point: "t16388", label: "Zadane ciśnienie 1PE1", unit: "Pa" },
      { point: "t16389", label: "Tolerancja ciśnienia 1PE1", unit: "Pa" },
      { point: "t16394", label: "Zadane ciśnienie 1PE2", unit: "Pa" },
      { point: "t16395", label: "Tolerancja ciśnienia 1PE2", unit: "Pa" },
      { point: "t16400", label: "Zadane ciśnienie 1PE3", unit: "Pa" },
      { point: "t16401", label: "Tolerancja ciśnienia 1PE3", unit: "Pa" }
    ]
  },

  {
    title: "Temperatura i wilgotność nawiewu centrali",
    items: [
      {
        point: "s16532",
        label: "Tryb zadawania temperatury nawiewu NW1",
        type: "select",
        unit: "",
        options: [
          { value: "0", label: "Auto" },
          { value: "1", label: "Man" }
        ]
      },
      { point: "t16533", label: "Zadana temperatura nawiewu N1", unit: "°C" },
      { point: "t16541", label: "Zadana wilgotność bezwzględna N1", unit: "g/kg" }
    ]
  },

  {
    title: "Harmonogram",
    items: [
      { point: "t16407", label: "Poniedziałek godzina załączenia", type: "time", unit: "" },
      { point: "t16408", label: "Poniedziałek godzina wyłączenia", type: "time", unit: "" },
      { point: "t16409", label: "Wtorek godzina załączenia", type: "time", unit: "" },
      { point: "t16410", label: "Wtorek godzina wyłączenia", type: "time", unit: "" },
      { point: "t16411", label: "Środa godzina załączenia", type: "time", unit: "" },
      { point: "t16412", label: "Środa godzina wyłączenia", type: "time", unit: "" },
      { point: "t16413", label: "Czwartek godzina załączenia", type: "time", unit: "" },
      { point: "t16414", label: "Czwartek godzina wyłączenia", type: "time", unit: "" },
      { point: "t16415", label: "Piątek godzina załączenia", type: "time", unit: "" },
      { point: "t16416", label: "Piątek godzina wyłączenia", type: "time", unit: "" },
      { point: "t16417", label: "Sobota godzina załączenia", type: "time", unit: "" },
      { point: "t16418", label: "Sobota godzina wyłączenia", type: "time", unit: "" },
      { point: "t16419", label: "Niedziela godzina załączenia", type: "time", unit: "" },
      { point: "t16420", label: "Niedziela godzina wyłączenia", type: "time", unit: "" }
    ]
  },

  {
    title: "Temperatura maszynowni",
    items: [
      { point: "t16558", label: "Zadana temperatura wentylatorni", unit: "°C" },
      { point: "t16559", label: "Histereza temperatury wentylatorni", unit: "°C" }
    ]
  }
];

const roomSetpoints = {
  "03": [
    {
      title: "Regulator ciśnienia pomieszczenia",
      items: [
        { point: "t16510", label: "Zadane wysterowanie regulatora ciśn. pom. 03", unit: "%" }
      ]
    },
    {
      title: "Temperatura pomieszczenia",
      items: [
        { point: "t16442", label: "Zadana temperatura pom. 03", unit: "°C" }
      ]
    }
  ],

  "04": [
    {
      title: "Regulator ciśnienia pomieszczenia",
      items: [
        { point: "t16514", label: "Zadane wysterowanie regulatora ciśn. pom. 04", unit: "%" }
      ]
    },
    {
      title: "Temperatura pomieszczenia",
      items: [
        { point: "t16478", label: "Zadana temperatura pom. 04", unit: "°C" }
      ]
    }
  ],

  "06": [
    {
      title: "Regulator ciśnienia pomieszczenia",
      items: [
        { point: "t16512", label: "Zadane wysterowanie regulatora ciśn. pom. 06", unit: "%" }
      ]
    },
    {
      title: "Temperatura pomieszczenia",
      items: [
        { point: "t16460", label: "Zadana temperatura pom. 06", unit: "°C" }
      ]
    }
  ],

  "07": [
    {
      title: "Regulator ciśnienia pomieszczenia",
      items: [
        { point: "t16516", label: "Zadane wysterowanie regulatora ciśn. pom. 07", unit: "%" }
      ]
    },
    {
      title: "Temperatura pomieszczenia",
      items: [
        { point: "t16496", label: "Zadana temperatura pom. 07", unit: "°C" }
      ]
    }
  ],

  "013": [
    {
      title: "Regulator ciśnienia pomieszczenia",
      items: [
        { point: "t16518", label: "Zadane wysterowanie regulatora ciśn. pom. 013", unit: "%" }
      ]
    }
  ],

  "015": [
    {
      title: "Regulator ciśnienia pomieszczenia",
      items: [
        { point: "t16517", label: "Zadane wysterowanie regulatora ciśn. pom. 015", unit: "%" }
      ]
    }
  ],

  "016": [
    {
      title: "Regulator ciśnienia pomieszczenia",
      items: [
        { point: "t16515", label: "Zadane wysterowanie regulatora ciśn. pom. 016", unit: "%" }
      ]
    },
    {
      title: "Temperatura pomieszczenia",
      items: [
        { point: "t16487", label: "Zadana temperatura pom. 016", unit: "°C" }
      ]
    }
  ],

  "017": [
    {
      title: "Regulator ciśnienia pomieszczenia",
      items: [
        { point: "t16508", label: "Zadane wysterowanie regulatora ciśn. pom. 017", unit: "%" }
      ]
    }
  ],

  "018": [
    {
      title: "Regulator ciśnienia pomieszczenia",
      items: [
        { point: "t16507", label: "Zadane wysterowanie regulatora ciśn. pom. 018", unit: "%" }
      ]
    }
  ],

  "019": [
    {
      title: "Regulator ciśnienia pomieszczenia",
      items: [
        { point: "t16506", label: "Zadane wysterowanie regulatora ciśn. pom. 019", unit: "%" }
      ]
    },
    {
      title: "Temperatura pomieszczenia",
      items: [
        { point: "t16424", label: "Zadana temperatura pom. 019", unit: "°C" }
      ]
    }
  ],

  "020": [
    {
      title: "Regulator ciśnienia pomieszczenia",
      items: [
        { point: "t16509", label: "Zadane wysterowanie regulatora ciśn. pom. 020", unit: "%" }
      ]
    },
    {
      title: "Temperatura pomieszczenia",
      items: [
        { point: "t16433", label: "Zadana temperatura pom. 020", unit: "°C" }
      ]
    }
  ],

  "021": [
    {
      title: "Regulator ciśnienia pomieszczenia",
      items: [
        { point: "t16511", label: "Zadane wysterowanie regulatora ciśn. pom. 021", unit: "%" }
      ]
    },
    {
      title: "Temperatura pomieszczenia",
      items: [
        { point: "t16451", label: "Zadana temperatura pom. 021", unit: "°C" }
      ]
    }
  ],

  "024": [
    {
      title: "Regulator ciśnienia pomieszczenia",
      items: [
        { point: "t16513", label: "Zadane wysterowanie regulatora ciśn. pom. 024", unit: "%" }
      ]
    },
    {
      title: "Temperatura pomieszczenia",
      items: [
        { point: "t16469", label: "Zadana temperatura pom. 024", unit: "°C" }
      ]
    }
  ]
};

export default {
  name: "RoomNW1Zadane",

  data() {
    return {
      api: "http://192.168.1.155:1880",
      status: "",
      f: {
        s16421: "0",
        s16532: "0"
      }
    };
  },

  computed: {
    room() {
      return this.$route.params.room;
    },

    roomSections() {
      return roomSetpoints[this.room] || [];
    },

    isRoom() {
      return Boolean(this.room);
    },

    sections() {
      if (this.isRoom) {
        return this.roomSections; // tylko pomieszczenie
      }

      return commonSections; // tylko centrala
    }
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

    async send(item) {
      const point = item.point;
      const value = this.f[point];

      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const user =
        userData.username ||
        userData.name ||
        userData.login ||
        "unknown";

      const payload = {
        point,
        label: item.label,
        value,
        unit: item.unit || "",
        room: this.room,
        user,
        time: new Date().toISOString()
      };

      try {
        await axios.post(this.api + "/api/nw1-zadane-setpoint", payload);

        this.status =
          "Zapisano: " +
          item.label +
          " = " +
          value +
          " " +
          (item.unit || "") +
          " przez " +
          user;

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

.pagebody {
  background: #2f3136;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 28px 24px;
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

.sectiontitle:first-child {
  margin-top: 0;
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

.unit {
  display: inline-block;
  min-width: 45px;
  margin-left: 8px;
  color: #ffffff;
  font-weight: 700;
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
