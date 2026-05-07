<template>
  <div class="page">
    <div class="menubottom">NW1 &gt; Pomieszczenie {{ room }} &gt; Wymuszenia</div>
    <p class="title">Wymuszenia pomieszczenia {{ room }}</p>

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

const autoManualOptions = [
  { value: "0", label: "Auto" },
  { value: "1", label: "Wymuszenie" }
];

const roomForces = {
  "019": [
    {
      title: "Nagrzewnica pomieszczeniowa",
      items: [
        {
          point: "s09216",
          label: "Załączenie wymuszenia 019NE1",
          type: "select",
          unit: "",
          options: autoManualOptions
        },
        {
          point: "t09232",
          label: "Wartość wymuszenia 019NE1",
          unit: "%"
        }
      ]
    }
  ],

  "020": [
    {
      title: "Nagrzewnica pomieszczeniowa",
      items: [
        {
          point: "s09217",
          label: "Załączenie wymuszenia 020NE1",
          type: "select",
          unit: "",
          options: autoManualOptions
        },
        {
          point: "t09233",
          label: "Wartość wymuszenia 020NE1",
          unit: "%"
        }
      ]
    }
  ],

  "03": [
    {
      title: "Nagrzewnica pomieszczeniowa",
      items: [
        {
          point: "s09218",
          label: "Załączenie wymuszenia 03NE1",
          type: "select",
          unit: "",
          options: autoManualOptions
        },
        {
          point: "t09234",
          label: "Wartość wymuszenia 03NE1",
          unit: "%"
        }
      ]
    }
  ],

  "021": [
    {
      title: "Nagrzewnica pomieszczeniowa",
      items: [
        {
          point: "s09219",
          label: "Załączenie wymuszenia 021NE1",
          type: "select",
          unit: "",
          options: autoManualOptions
        },
        {
          point: "t09235",
          label: "Wartość wymuszenia 021NE1",
          unit: "%"
        }
      ]
    }
  ],

  "06": [
    {
      title: "Nagrzewnica pomieszczeniowa",
      items: [
        {
          point: "s09220",
          label: "Załączenie wymuszenia 06NE1",
          type: "select",
          unit: "",
          options: autoManualOptions
        },
        {
          point: "t09236",
          label: "Wartość wymuszenia 06NE1",
          unit: "%"
        }
      ]
    }
  ],

  "024": [
    {
      title: "Nagrzewnica pomieszczeniowa",
      items: [
        {
          point: "s09221",
          label: "Załączenie wymuszenia 024NE1",
          type: "select",
          unit: "",
          options: autoManualOptions
        },
        {
          point: "t09237",
          label: "Wartość wymuszenia 024NE1",
          unit: "%"
        }
      ]
    }
  ],

  "04": [
    {
      title: "Nagrzewnica pomieszczeniowa",
      items: [
        {
          point: "s09222",
          label: "Załączenie wymuszenia 04NE1",
          type: "select",
          unit: "",
          options: autoManualOptions
        },
        {
          point: "t09238",
          label: "Wartość wymuszenia 04NE1",
          unit: "%"
        }
      ]
    }
  ],

  "016": [
    {
      title: "Nagrzewnica pomieszczeniowa",
      items: [
        {
          point: "s09223",
          label: "Załączenie wymuszenia 016NE1",
          type: "select",
          unit: "",
          options: autoManualOptions
        },
        {
          point: "t09239",
          label: "Wartość wymuszenia 016NE1",
          unit: "%"
        }
      ]
    }
  ],

  "07": [
    {
      title: "Nagrzewnica pomieszczeniowa",
      items: [
        {
          point: "s09224",
          label: "Załączenie wymuszenia 07NE1",
          type: "select",
          unit: "",
          options: autoManualOptions
        },
        {
          point: "t09240",
          label: "Wartość wymuszenia 07NE1",
          unit: "%"
        }
      ]
    }
  ]
};

export default {
  name: "RoomNW1Wymuszenia",

  data() {
    return {
      api: "http://192.168.1.155:1880",
      status: "",
      f: {}
    };
  },

  computed: {
    room() {
      return this.$route.params.room;
    },

    sections() {
      return roomForces[this.room] || [];
    }
  },

  mounted() {
    this.load();
  },

  methods: {
    async load() {
      try {
        const r = await axios.get(this.api + "/api/nw1-force-values");

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
        
      };

      try {
        await axios.post(this.api + "/api/nw1-force-setpoint", payload);

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
  text-align: center;
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
  width: 70%;
  font-weight: 700;
  font-size: 16px;
}

.table td:nth-child(2) {
  width: 30%;
  white-space: nowrap;
}

.value {
  display: inline-block;
  min-width: 120px;
  padding: 8px 10px;
  background: #f5f6fa;
  color: #111;
  border-radius: 6px;
  border: 1px solid #aaa;
  font-size: 15px;
  box-sizing: border-box;
  text-align: right;
  font-weight: 700;
}

.unit {
  margin-left: 8px;
  color: #ffffff;
  font-weight: 700;
}

.bottom-bar {
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid #555;
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

.status {
  margin-left: 14px;
  font-weight: bold;
  font-size: 17px;
  color: #36d156;
}
</style>
