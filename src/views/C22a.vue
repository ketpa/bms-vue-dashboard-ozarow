<template>
  <div
    id="wrapper"
    class="wrapper"
    :style="{ backgroundImage: `url(${require('@/assets/img/022a.png')})` }"
  >
    <div id="content">
      <ul></ul>
      <div id="punkty"></div>

      <div id="WYJ_AO_022A_NV1" style="top:220px; left:120px;">
        <span class="lowered">
          {{ getValue('WYJ_AO_022A_NV1') }} {{ getUnit('WYJ_AO_022A_NV1') }}
        </span>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ConfigurationSystemC22',

  data() {
    return {
      points: {},
      intervalId: null
    };
  },

  mounted() {
    this.fetchData();
    this.startAutoRefresh();
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  },

  beforeUnmount() {
    this.stopAutoRefresh();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },

  methods: {
    fetchData() {
      axios.get('http://192.168.1.155:1880/C1.json')
        .then(response => {
          const updatedPoints = {};

          response.data.forEach(item => {
            updatedPoints[item.Name] = {
              Value: item.Value,
              Um: item.Um
            };
          });

          this.points = updatedPoints;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },

    getValue(name) {
      return this.points[name]?.Value ?? '--';
    },

    getUnit(name) {
      return this.points[name]?.Um ?? '';
    },

    startAutoRefresh() {
      if (this.intervalId) return;

      this.intervalId = setInterval(() => {
        if (!document.hidden) {
          this.fetchData();
        }
      }, 10000);
    },

    stopAutoRefresh() {
      if (!this.intervalId) return;

      clearInterval(this.intervalId);
      this.intervalId = null;
    },

    handleVisibilityChange() {
      if (document.hidden) {
        this.stopAutoRefresh();
      } else {
        this.fetchData();
        this.startAutoRefresh();
      }
    }
  }
};
</script>

<style scoped>
@import url('@/assets/css/mainC19.css');

.lowered {
  display: inline-block;
  transform: translateY(15px);
  font-size: 0.9em;
}

#wrapper {
  top: 100px;
  position: relative;
}

#content {
  min-width: 100%;
  min-height: 100%;
  position: relative;
}
</style>