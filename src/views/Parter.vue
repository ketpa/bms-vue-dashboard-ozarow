<template>
  <div class="parter-wrapper">
    <div class="parter-content">
      <div
        v-for="item in displayPoints"
        :id="item.id"
        :key="item.id"
        class="pointBox"
      >
        {{ getValue(item) }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ParterView",

  data() {
    return {
      points: {},
      intervalId: null,

      displayPoints: [
        { id: "A03THE2T", point: "POMIAR_03THE1_T", aliases: ["t09073"], unit: "°C" },
        { id: "A03THE2H", point: "POMIAR_03THE1_H", aliases: ["t09074"], unit: "%" },
        

        { id: "A04THE2T", point: "POMIAR_04THE1_T", aliases: ["t09085"], unit: "°C" },
        { id: "A04THE2H", point: "POMIAR_04THE1_H", aliases: ["t09086"], unit: "%" },
        

        { id: "A06THE2T", point: "POMIAR_06THE1_T", aliases: ["t09079"], unit: "°C" },
        { id: "A06THE2H", point: "POMIAR_06THE1_H", aliases: ["t09080"], unit: "%" },
        

        { id: "A07THE2T", point: "POMIAR_07THE1_T", aliases: ["t09091"], unit: "°C" },
        { id: "A07THE2H", point: "POMIAR_07THE1_H", aliases: ["t09092"], unit: "%" },
        

        { id: "A016THE2T", point: "POMIAR_016THE1_T", aliases: ["t09087"], unit: "°C" },
        { id: "A016THE2H", point: "POMIAR_016THE1_H", aliases: ["t09088"], unit: "%" },
        

        { id: "A019THE2T", point: "POMIAR_019THE1_T", aliases: ["t09067"], unit: "°C" },
        { id: "A019THE2H", point: "POMIAR_019THE1_H", aliases: ["t09068"], unit: "%" },
        

        { id: "A020THE2T", point: "POMIAR_020THE1_T", aliases: ["t09069"], unit: "°C" },
        { id: "A020THE2H", point: "POMIAR_020THE1_H", aliases: ["t09070"], unit: "%" },
       

        { id: "A021THE2T", point: "POMIAR_021THE1_T", aliases: ["t09075"], unit: "°C" },
        { id: "A021THE2H", point: "POMIAR_021THE1_H", aliases: ["t09076"], unit: "%" },
        

        { id: "A024THE2T", point: "POMIAR_024THE1_T", aliases: ["t09081"], unit: "°C" },
        { id: "A024THE2H", point: "POMIAR_024THE1_H", aliases: ["t09082"], unit: "%" },

        { id: "A023THE2T", point: "POMIAR_023_2THE1_T", unit: "°C" },
        { id: "A023THE2H", point: "POMIAR_023_2THE1_H", unit: "%" },
        

        /*
        Brak pozycji CSS na obrazku dla:
        POMIAR_SAK1TE1 / t09089
        POMIAR_16TE1 / t09095

        Brak mapowania w podanej liście dla:
        A22a, A023, A018, A017, A015, A013, A013a
        */
      ]
    };
  },

  mounted() {
    this.fetchData();
    this.startAutoRefresh();
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  },

  beforeUnmount() {
    this.stopAutoRefresh();
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  },

  methods: {
    async fetchData() {
  try {
    const [c1Response, c2Response] = await Promise.all([
      axios.get("http://192.168.1.155:1880/C1.json"),
      axios.get("http://192.168.1.155:1880/C2.json")
    ]);

    const newPoints = {};

    // C1
    c1Response.data.forEach(item => {
      newPoints[item.Name] = item.Value;
    });

    // C2 tylko dla 023
    c2Response.data.forEach(item => {
      if (
        item.Name === "POMIAR_023_2THE1_T" ||
        item.Name === "POMIAR_023_2THE1_H"
      ) {
        newPoints[item.Name] = item.Value;
      }
    });

    this.points = newPoints;

  } catch (error) {
    console.error("Error fetching data:", error);
  }
},

    getValue(item) {
      const keys = [item.point, ...(item.aliases || [])];

      for (const key of keys) {
        if (
          this.points[key] !== undefined &&
          this.points[key] !== null &&
          this.points[key] !== ""
        ) {
          return `${this.points[key]}${item.unit || ""}`;
        }
      }

      return "";
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
.parter-wrapper {
  background-image: url("@/assets/img/Parter.png");
  background-repeat: no-repeat;
  background-position: left top;
  background-size: 1091px 944px;

  position: relative;

  width: 1091px;
  height: 944px;

  margin: 0 auto;

  overflow: hidden;
  background-color: #333;
  z-index: 0;
}

.parter-content {
  position: relative;

  width: 1091px;
  height: 944px;

  z-index: 2;

  transform: translate(0px, 0px);
}

.pointBox {
  background-image: url("@/assets/img/tabliczka.png");
  background-repeat: no-repeat;
  background-size: contain;

  position: absolute;

  width: 80px;
  height: 30px;

  text-align: center;
  line-height: 25px;

  color: black;
  font-size: 14px;
  font-weight: bold;

  z-index: 3;
  padding-top: 15px;
   transform: translateY(-19px);
}

/* ---------- POZYCJE ---------- */

#A22aTHE2T { left: 189px; top: 198px; }
#A22aTHE2H { left: 189px; top: 171px; }
#A22aPE2 { left: 189px; top: 143px; }

#A023THE2T { left: 166px; top: 397px; }
#A023THE2H { left: 166px; top: 369px; }
#A023PE2 { left: 166px; top: 425px; }

#A019THE2T { left: 656px; top: 75px; }
#A019THE2H { left: 575px; top: 75px; }
#A019PE2 { left: 494px; top: 74px; }

#A018THE2T { left: 524px; top: 218px; }
#A018THE2H { left: 524px; top: 191px; }
#A018PE2 { left: 524px; top: 164px; }

#A017THE2T { left: 741px; top: 214px; }
#A017THE2H { left: 741px; top: 187px; }
#A017PE2 { left: 741px; top: 160px; }

#A020THE2T { left: 410px; top: 388px; }
#A020THE2H { left: 410px; top: 359px; }
#A020PE2 { left: 410px; top: 332px; }

#A03THE2T { left: 408px; top: 598px; }
#A03THE2H { left: 408px; top: 570px; }
#A03PE2 { left: 408px; top: 542px; }

#A021THE2T { left: 747px; top: 544px; }
#A021THE2H { left: 667px; top: 544px; }
#A021PE2 { left: 586px; top: 543px; }

#A06THE2T { left: 525px; top: 407px; }
#A06THE2H { left: 525px; top: 379px; }
#A06PE2 { left: 525px; top: 351px; }

#A024THE2T { left: 708px; top: 417px; }
#A024THE2H { left: 708px; top: 390px; }
#A024PE2 { left: 708px; top: 362px; }

#A04THE2T { left: 503px; top: 689px; }
#A04THE2H { left: 502px; top: 663px; }
#A04PE2 { left: 501px; top: 637px; }

#A016THE2T { left: 654px; top: 684px; }
#A016THE2H { left: 654px; top: 657px; }
#A016PE2 { left: 654px; top: 630px; }

#A07THE2T { left: 870px; top: 628px; }
#A07THE2H { left: 869px; top: 599px; }
#A07PE2 { left: 868px; top: 571px; }

#A015THE2T { left: 926px; top: 494px; }
#A015THE2H { left: 926px; top: 466px; }
#A015PE2 { left: 926px; top: 439px; }

#A013THE2T { left: 943px; top: 353px; }
#A013THE2H { left: 943px; top: 324px; }
#A013PE2 { left: 943px; top: 297px; }

#A013aTHE2T { left: 985px; top: 252px; }
#A013aTHE2H { left: 985px; top: 225px; }
#A013aPE2 { left: 985px; top: 198px; }
</style>