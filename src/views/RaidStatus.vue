
<template>
  <div class="page">

    <h1>RAID Monitor</h1>

    <div class="sub">
      Monitoring macierzy RAID Linux mdadm
    </div>

    <div v-if="!hasData" class="card">
      <div class="empty">
        Brak danych RAID
      </div>
    </div>

    <template v-else>

      <div class="banner" :class="banner.cls">

        <div class="banner-title">
          {{ banner.title }}
        </div>

        <div class="banner-sub">
          {{ banner.sub }}
        </div>

      </div>

      <div class="grid">

        <!-- STATUS -->

        <div class="card">

          <h2>Status macierzy</h2>

          <div class="rows">

            <div class="row">
              <div class="label">RAID Level</div>

              <div class="value">
                {{ raid.level || "---" }}
              </div>
            </div>

            <div class="row">
              <div class="label">Stan</div>

              <div class="value">
                <span class="pill" :class="pillClass">
                  {{ raid.state || "---" }}
                </span>
              </div>
            </div>

            <div class="row">
              <div class="label">Rozmiar</div>

              <div class="value">
                {{ raid.size || "---" }}
              </div>
            </div>

            <div class="row">
              <div class="label">Odczyt</div>

              <div class="value">
                {{ raid.time || "---" }}
              </div>
            </div>

          </div>

        </div>

        <!-- DYSKI -->

        <div class="card">

          <h2>Dyski</h2>

          <div class="rows">

            <div
              class="row"
              v-for="disk in raid.disks"
              :key="disk"
            >
              <div class="label">
                {{ disk }}
              </div>

              <div class="value">
                <span class="pill pill-ok">
                  ONLINE
                </span>
              </div>
            </div>

          </div>

        </div>

        <!-- URZĄDZENIA -->

        <div class="card">

          <h2>Urządzenia RAID</h2>

          <div class="rows">

            <div class="row">
              <div class="label">Active Devices</div>

              <div class="value">
                {{ raid.active || "---" }}
              </div>
            </div>

            <div class="row">
              <div class="label">Working Devices</div>

              <div class="value">
                {{ raid.working || "---" }}
              </div>
            </div>

            <div class="row">
              <div class="label">Failed Devices</div>

              <div class="value">
                <span
                  class="pill"
                  :class="Number(raid.failed) > 0
                    ? 'pill-danger'
                    : 'pill-ok'"
                >
                  {{ raid.failed || "0" }}
                </span>
              </div>
            </div>

          </div>

        </div>

        <!-- RAW -->

        <div class="card raw-card">

          <h2>RAW mdadm</h2>

          <pre class="raw">
{{ raid.raw }}
          </pre>

        </div>

      </div>

    </template>

  </div>
</template>

<script>
import axios from "axios";

export default {

  name: "RaidStatus",

  data() {

    return {

      api: "http://192.168.1.155:1880/api/raid",

      raid: {},

      timer: null
    };
  },

  computed: {

    hasData() {

      return this.raid &&
        Object.keys(this.raid).length > 0;
    },

    banner() {

      const failed =
        Number(this.raid.failed || 0);

      const state =
        String(this.raid.state || "")
          .toLowerCase();

      if (
        failed > 0 ||
        state.includes("degraded")
      ) {

        return {
          cls: "banner-danger",

          title: "RAID DEGRADED",

          sub:
            "Uszkodzony dysk lub problem synchronizacji."
        };
      }

      if (
        state.includes("recover") ||
        state.includes("rebuild")
      ) {

        return {
          cls: "banner-warn",

          title: "RAID REBUILDING",

          sub:
            "Trwa odbudowa macierzy RAID."
        };
      }

      return {

        cls: "banner-ok",

        title: "RAID OK",

        sub:
          "Macierz działa prawidłowo."
      };
    },

    pillClass() {

      const failed =
        Number(this.raid.failed || 0);

      const state =
        String(this.raid.state || "")
          .toLowerCase();

      if (
        failed > 0 ||
        state.includes("degraded")
      ) {
        return "pill-danger";
      }

      if (
        state.includes("recover") ||
        state.includes("rebuild")
      ) {
        return "pill-warn";
      }

      return "pill-ok";
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

        const r = await axios.get(this.api);

        this.raid = r.data || {};

      }
      catch (e) {

        console.error(e);

        this.raid = {};
      }
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
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
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

.empty {
  color: #6b7280;
  font-style: italic;
}

.raw-card {
  grid-column: 1 / -1;
}

.raw {
  background: #111827;
  color: #4ade80;
  padding: 14px;
  border-radius: 10px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
}
</style>

