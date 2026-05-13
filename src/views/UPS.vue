<template>
  <div class="page">
    <h1>UPS EVER Alarm</h1>
    <div class="sub">Widok z danymi z Node-RED / flow.ups</div>

    <div v-if="!hasData" class="card">
      <div class="empty">Brak danych UPS w flow.ups</div>
    </div>

    <template v-else>
      <div class="banner" :class="banner.cls">
        <div class="banner-title">{{ banner.title }}</div>
        <div class="banner-sub">{{ banner.sub }}</div>
      </div>

      <div class="grid">

        <!-- STATUS -->
        <div class="card">
          <h2>Status</h2>

          <div class="rows">
            <div class="row">
              <div class="label">Model</div>
              <div class="value">{{ ups.model || "---" }}</div>
            </div>

            <div class="row">
              <div class="label">Tryb pracy</div>
              <div class="value">
                <span class="pill" :class="modeClass">
                  {{ ups.mode || "nieznany" }}
                </span>
              </div>
            </div>

            <div class="row">
              <div class="label">Odczyt</div>
              <div class="value">{{ ups.timestamp || "---" }}</div>
            </div>

            <div class="row">
              <div class="label">Adres UPS</div>
              <div class="value">{{ ups.ip_device || "---" }}</div>
            </div>
          </div>
        </div>

        <!-- BATERIA -->
        <div class="card">
          <h2>Bateria i autonomia</h2>

          <div class="rows">
            <div class="row">
              <div class="label">Poziom baterii</div>
              <div class="value">
                {{ ups.battery_percent ?? "---" }} %
              </div>
            </div>

            <div class="row">
              <div class="label">Autonomia</div>
              <div class="value">
                {{ ups.autonomy_minutes ?? "---" }} min
                ({{ ups.autonomy_seconds ?? "---" }} s)
              </div>
            </div>
          </div>

          <div class="meter-wrap">
            <div class="meter-label">
              <span>Bateria</span>
              <span>{{ ups.battery_percent ?? "---" }}%</span>
            </div>

            <div class="meter">
              <div
                class="meter-bar"
                :class="{ low: Number(ups.battery_percent) <= 20 }"
                :style="{ width: pct(ups.battery_percent) + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <!-- WEJŚCIE -->
        <div class="card">
          <h2>Parametry wejściowe</h2>

          <div class="rows">
            <div class="row">
              <div class="label">Napięcie wejściowe</div>
              <div class="value">
                {{ ups.input_voltage_v ?? "---" }} V
              </div>
            </div>

            <div class="row">
              <div class="label">Częstotliwość wejściowa</div>
              <div class="value">
                {{ ups.input_frequency_hz ?? "---" }} Hz
              </div>
            </div>
          </div>
        </div>

        <!-- WYJŚCIE -->
        <div class="card">
          <h2>Parametry wyjściowe</h2>

          <div class="rows">

            <div class="row">
              <div class="label">Napięcie wyjściowe</div>
              <div class="value">
                {{ ups.output_voltage_v ?? "---" }} V
              </div>
            </div>

            <div class="row">
              <div class="label">Prąd wyjściowy</div>
              <div class="value">
                {{ ups.output_current_a ?? "---" }} A
              </div>
            </div>

            <div class="row">
              <div class="label">Częstotliwość wyjściowa</div>
              <div class="value">
                {{ ups.output_frequency_hz ?? "---" }} Hz
              </div>
            </div>

            <div class="row">
              <div class="label">Moc czynna</div>
              <div class="value">
                {{ ups.output_active_power_w ?? "---" }} W
              </div>
            </div>

            <div class="row">
              <div class="label">Moc pozorna</div>
              <div class="value">
                {{ ups.output_apparent_power_va ?? "---" }} VA
              </div>
            </div>

            <div class="row">
              <div class="label">Power factor</div>
              <div class="value">
                {{ ups.output_power_factor ?? "---" }}
              </div>
            </div>

            <div class="row">
              <div class="label">Obciążenie</div>
              <div class="value">
                {{ ups.load_percent ?? "---" }} %
              </div>
            </div>
          </div>

          <div class="meter-wrap">
            <div class="meter-label">
              <span>Obciążenie</span>
              <span>{{ ups.load_percent ?? "---" }}%</span>
            </div>

            <div class="meter">
              <div
                class="meter-bar load"
                :style="{ width: pct(ups.load_percent) + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <!-- KOMUNIKATY -->
        <div class="card">
          <h2>Komunikaty</h2>

          <ul
            v-if="ups.messages && ups.messages.length"
            class="list"
          >
            <li
              v-for="m in ups.messages"
              :key="m"
            >
              {{ m }}
            </li>
          </ul>

          <div v-else class="empty">
            Brak
          </div>
        </div>

        <!-- ALARMY -->
        <div class="card">
          <h2>Alarmy</h2>

          <ul
            v-if="ups.alarms && ups.alarms.length"
            class="list"
          >
            <li
              v-for="a in ups.alarms"
              :key="a"
            >
              {{ a }}
            </li>
          </ul>

          <div v-else class="empty">
            Brak
          </div>
        </div>

      </div>

      <div class="footer-note">
        Pomarańczowy baner oznacza pracę z baterii.
        Czerwony oznacza niski poziom baterii lub alarm krytyczny.
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UPS",

  data() {
    return {
      api: "http://192.168.1.155:1880/api/ups",
      ups: {},
      timer: null
    };
  },

  computed: {
    hasData() {
      return this.ups && Object.keys(this.ups).length > 0;
    },

    banner() {
      const d = this.ups;

      const mode = String(d.mode || "").toLowerCase();

      const batt = Number(d.battery_percent ?? 0);

      const hasAlarms =
        Array.isArray(d.alarms) &&
        d.alarms.length > 0;

      const hasLowBatt =
        Array.isArray(d.messages) &&
        d.messages.some(x =>
          String(x)
            .toLowerCase()
            .includes("niski poziom baterii")
        );

      if (hasAlarms || batt <= 20 || hasLowBatt) {
        return {
          cls: "banner-danger",
          title: "Alarm krytyczny UPS",
          sub:
            "Niski poziom baterii lub aktywne alarmy."
        };
      }

      if (
        mode.includes("rezerwowy") ||
        mode.includes("awaryjny") ||
        mode.includes("battery")
      ) {
        return {
          cls: "banner-warn",
          title: "Brak zasilania sieciowego",
          sub:
            "UPS pracuje z baterii."
        };
      }

      if (
        mode.includes("sieciowy") ||
        mode.includes("normal")
      ) {
        return {
          cls: "banner-ok",
          title: "Zasilanie prawidłowe",
          sub:
            "UPS pracuje normalnie w trybie sieciowym."
        };
      }

      return {
        cls: "banner-danger",
        title: "Nieznany stan UPS",
        sub:
          "Sprawdź komunikację i dane urządzenia."
      };
    },

    modeClass() {
      const mode = String(this.ups.mode || "").toLowerCase();

      const batt = Number(this.ups.battery_percent ?? 0);

      const hasAlarms =
        Array.isArray(this.ups.alarms) &&
        this.ups.alarms.length > 0;

      if (hasAlarms || batt <= 20) {
        return "pill-danger";
      }

      if (
        mode.includes("rezerwowy") ||
        mode.includes("awaryjny") ||
        mode.includes("battery")
      ) {
        return "pill-warn";
      }

      if (
        mode.includes("sieciowy") ||
        mode.includes("normal")
      ) {
        return "pill-ok";
      }

      return "pill-danger";
    }
  },

  mounted() {
    this.load();

    this.timer = setInterval(() => {
      this.load();
    }, 5000);
  },

  beforeUnmount() {
    clearInterval(this.timer);
  },

  methods: {
    async load() {
      try {
        const res = await axios.get(this.api);

        this.ups = res.data || {};

        console.log(this.ups);
      }
      catch (e) {
        console.error(e);

        this.ups = {};
      }
    },

    pct(v) {
      const n = Number(v ?? 0);

      if (!Number.isFinite(n)) {
        return 0;
      }

      return Math.max(
        0,
        Math.min(100, n)
      );
    }
  }
};
</script>

<style scoped>
.page {
  padding: 20px;
  font-family: Arial, sans-serif;
  background: #f4f7fb;
  color: #1f2937;
  min-height: 100vh;
}

h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
}

.sub {
  color: #6b7280;
  margin-bottom: 16px;
  font-size: 14px;
}

.banner {
  border-radius: 14px;
  padding: 16px 18px;
  margin-bottom: 18px;
  border: 1px solid transparent;
}

.banner-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 6px;
}

.banner-sub {
  font-size: 14px;
}

.banner-ok {
  background: #dcfce7;
  border-color: #86efac;
  color: #166534;
}

.banner-warn {
  background: #ffedd5;
  border-color: #fdba74;
  color: #9a3412;
}

.banner-danger {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #991b1b;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
}

.card {
  background: #ffffff;
  border: 1px solid #d8e0ea;
  border-radius: 12px;
  padding: 16px;
}

.card h2 {
  margin: 0 0 14px 0;
  font-size: 18px;
}

.rows {
  display: grid;
  gap: 10px;
}

.row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
  border-bottom: 1px solid #eef2f7;
  padding-bottom: 8px;
}

.row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.label {
  color: #6b7280;
  font-size: 14px;
}

.value {
  font-weight: 700;
  text-align: right;
}

.pill {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
}

.pill-ok {
  background: #dcfce7;
  color: #166534;
}

.pill-warn {
  background: #ffedd5;
  color: #9a3412;
}

.pill-danger {
  background: #fee2e2;
  color: #991b1b;
}

.list {
  margin: 0;
  padding-left: 18px;
}

.list li {
  margin: 6px 0;
}

.empty {
  color: #6b7280;
  font-style: italic;
}

.meter-wrap {
  margin-top: 8px;
}

.meter-label {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
}

.meter {
  width: 100%;
  height: 14px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.meter-bar {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
}

.meter-bar.load {
  background: linear-gradient(90deg, #60a5fa, #2563eb);
}

.meter-bar.low {
  background: linear-gradient(90deg, #fb7185, #dc2626);
}

.footer-note {
  margin-top: 16px;
  color: #6b7280;
  font-size: 13px;
}
</style>