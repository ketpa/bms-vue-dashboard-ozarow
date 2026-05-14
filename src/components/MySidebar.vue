<template>
  <nav class="sidebar">
    <div class="logo">📊 BMS</div>

    <div v-if="currentUser" class="user-box">
      <div><b>Zalogowany:</b> {{ currentUser.username }}</div>
      <div><b>Poziom:</b> {{ levelName(currentUser.level) }}</div>
      <button @click="logout">Wyloguj</button>
    </div>

    <ul>
      <li v-for="item in menuItems" :key="item.id + '-' + item.name">
<!-- LINK ZEWNĘTRZNY -->
<a
  v-if="item.external"
  :href="item.link"
  target="_blank"
  rel="noopener"
  class="menu-item"
>
  <span class="icon">{{ item.icon }}</span>
  <span class="text">{{ item.name }}</span>
</a>

<!-- NORMALNY ROUTER -->
<router-link
  v-else
  :to="item.link"
  class="menu-item"
  @click.prevent="toggleSubMenu(item.id, item.name)"
>
  <span class="icon">{{ item.icon }}</span>
  <span class="text">{{ item.name }}</span>

  <span
    v-if="item.subMenuItems && item.subMenuItems.length"
    class="arrow"
    :class="{ open: item.showSubMenu }"
  >
    ▼
  </span>
</router-link>

        <ul v-if="item.showSubMenu" class="submenu">
          <li v-for="subItem in item.subMenuItems" :key="subItem.id + '-' + subItem.name">
            <router-link :to="subItem.link" class="submenu-item">
              {{ subItem.name }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "MySidebar",

  data() {
    return {
      currentUser: null,

      menuItems: [
        {
          id: 1,
          name: "Home",
          icon: "🏠",
          link: "/",
          showSubMenu: false,
          subMenuItems: []
        },
        {
          id: 2,
          name: "CT",
          icon: "🔥",
          link: "/C0",
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: "Rysunek", link: "/C0" },
            { id: 22, name: "Tabela", link: "/PomiarCT" },
            { id: 24, name: "Alarmy", link: "/AwarieCT" },
            { id: 23, name: "Wymuszenia", link: "/WymuszeniaCT" },
           
          ]
        },
        {
          id: 3,
          name: "NW1",
          icon: "🌀",
          link: "/C1",
          showSubMenu: false,
          subMenuItems: [
            { id: 31, name: "Rysunek", link: "/C1" },
            { id: 32, name: "Tabela", link: "/PomiarNW1" },
            { id: 33, name: "Wyjscia", link: "/WyjsciaNW1" },
            { id: 34, name: "Zadane", link: "/ZadaneNW1" },
            { id: 35, name: "Wymuszenia", link: "/WymuszeniaNW1" },
            { id: 36, name: "Alarmy", link: "/AlarmyNW1/1" }
          ]
        },
        {
          id: 4,
          name: "NW2",
          icon: "🌀",
          link: "/C2",
          showSubMenu: false,
          subMenuItems: [
            { id: 41, name: "Rysunek", link: "/C2" },
            { id: 42, name: "Tabela", link: "/PomiarNW2" },
            { id: 43, name: "Wyjscia", link: "/WyjsciaNW2" },
            { id: 44, name: "Zadane", link: "/ZadaneNW2" },
            { id: 45, name: "Wymuszenia", link: "/WymuszeniaNW2" },
            { id: 50, name: "Alarmy", link: "/AlarmyNW2" },
          ]
        },
        {
          id: 5,
          name: "NW3",
          icon: "🌀",
          link: "/C3",
          showSubMenu: false,
          subMenuItems: [
            { id: 51, name: "Rysunek", link: "/C3" },
            { id: 52, name: "Tabela", link: "/PomiarNW3" },
            { id: 53, name: "Zadane", link: "/ZadaneNW3W4" },
            { id: 54, name: "Wymuszenia", link: "/WymuszeniaNW3W4" },
            { id: 301, name: "Alarmy", link: "/AlarmyNW3" },
          ]
        },
        {
          id: 6,
          name: "W4",
          icon: "🌀",
          link: "/C4",
          showSubMenu: false,
          subMenuItems: [
            { id: 61, name: "Rysunek", link: "/C4" },
            { id: 62, name: "Tabela", link: "/PomiarW4" },
            { id: 63, name: "Wymuszenia", link: "/WymuszeniaW4" },
            { id: 301, name: "Alarmy", link: "/AlarmyW4" },
          ]
        },
        {
          id: 7,
          name: "P013",
          icon: "🏢",
          link: "/C13",
          showSubMenu: false,
          subMenuItems: [
            { id: 71, name: "Rysunek", link: "/C13" },
            { id: 72, name: "Pomieszczenie", link: "/NW1/P013" },
            { id: 73, name: "Zadane", link: "/NW1/P013/zadane" },
            { id: 49, name: "Alarmy", link: "/AlarmyNW1/013" },
          ]
        },
        {
          id: 8,
          name: "P015",
          icon: "🏢",
          link: "/C15",
          showSubMenu: false,
          subMenuItems: [
            { id: 81, name: "Rysunek", link: "/C15" },
            { id: 82, name: "Pomieszczenie", link: "/NW1/P015" },
            { id: 83, name: "Zadane", link: "/NW1/P015/zadane" },
            { id: 48, name: "Alarmy", link: "/AlarmyNW1/015" },
          ]
        },
        {
          id: 9,
          name: "P016",
          icon: "🏢",
          link: "/C16",
          showSubMenu: false,
          subMenuItems: [
            { id: 91, name: "Rysunek", link: "/C16" },
            { id: 92, name: "Pomieszczenie", link: "/NW1/P016" },
            { id: 93, name: "Zadane", link: "/NW1/P016/zadane" },
            { id: 130, name: "Wymuszenia", link: "/NW1/P016/wymuszenia" },
            { id: 42, name: "Alarmy", link: "/AlarmyNW1/016" },
          ]
        },
        {
          id: 10,
          name: "P017",
          icon: "🏢",
          link: "/C17",
          showSubMenu: false,
          subMenuItems: [
            { id: 101, name: "Rysunek", link: "/C17" },
            { id: 102, name: "Pomieszczenie", link: "/NW1/P017" },
            { id: 103, name: "Zadane", link: "/NW1/P017/zadane" },
            { id: 47, name: "Alarmy 017", link: "/AlarmyNW1/017" },
          ]
        },
        {
          id: 11,
          name: "P018",
          icon: "🏢",
          link: "/C18",
          showSubMenu: false,
          subMenuItems: [
            { id: 111, name: "Rysunek", link: "/C18" },
            { id: 112, name: "Pomieszczenie", link: "/NW1/P018" },
            { id: 113, name: "Zadane", link: "/NW1/P018/zadane" },
            { id: 46, name: "Alarmy", link: "/AlarmyNW1/018" },
          ]
        },
        {
          id: 12,
          name: "P019",
          icon: "🏢",
          link: "/C19",
          showSubMenu: false,
          subMenuItems: [
            { id: 121, name: "Rysunek", link: "/C19" },
            { id: 122, name: "Pomieszczenie", link: "/NW1/P019" },
            { id: 123, name: "Zadane", link: "/NW1/P019/zadane" },
            { id: 124, name: "Wymuszenia", link: "/NW1/P019/wymuszenia" },
            { id: 37, name: "Alarmy", link: "/AlarmyNW1/019" },
          ]
        },
        {
          id: 13,
          name: "P020",
          icon: "🏢",
          link: "/C20",
          showSubMenu: false,
          subMenuItems: [
            { id: 131, name: "Rysunek", link: "/C20" },
            { id: 132, name: "Pomieszczenie", link: "/NW1/P020" },
            { id: 133, name: "Zadane", link: "/NW1/P020/zadane" },
            { id: 124, name: "Wymuszenia", link: "/NW1/P020/wymuszenia" },
            { id: 38, name: "Alarmy", link: "/AlarmyNW1/020" },
          ]
        },
        {
          id: 14,
          name: "P021",
          icon: "🏢",
          link: "/C21",
          showSubMenu: false,
          subMenuItems: [
            { id: 141, name: "Rysunek", link: "/C21" },
            { id: 142, name: "Pomieszczenie", link: "/NW1/P021" },
            { id: 143, name: "Zadane", link: "/NW1/P021/zadane" },
            { id: 126, name: "Wymuszenia", link: "/NW1/P021/wymuszenia" },
            { id: 40, name: "Alarmy", link: "/AlarmyNW1/021" },
          ]
        },
        {
          id: 15,
          name: "P022a",
          icon: "🏢",
          link: "/C22a",
          showSubMenu: false,
          subMenuItems: [
            { id: 151, name: "Rysunek", link: "/C22a" },
            { id: 162, name: "Zadane", link: "/Zadane22a" },
          ]
        },
        {
          id: 16,
          name: "P023/2",
          icon: "🏢",
          link: "/C23",
          showSubMenu: false,
          subMenuItems: [
            { id: 161, name: "Rysunek", link: "/C23" },
            { id: 162, name: "Pomieszczenie", link: "/Pomieszczenie023_2" },
            { id: 163, name: "Zadane", link: "/Zadane23" }
          ]
        },
        {
          id: 17,
          name: "P024",
          icon: "🏢",
          link: "/C24",
          showSubMenu: false,
          subMenuItems: [
            { id: 171, name: "Rysunek", link: "/C24" },
            { id: 172, name: "Pomieszczenie", link: "/NW1/P024" },
            { id: 173, name: "Zadane", link: "/NW1/P024/zadane" },
            { id: 128, name: "Wymuszenia", link: "/NW1/P024/wymuszenia" },
            { id: 41, name: "Alarmy", link: "/AlarmyNW1/024" },
          ]
        },
        {
          id: 18,
          name: "P03",
          icon: "🏢",
          link: "/C03",
          showSubMenu: false,
          subMenuItems: [
            { id: 181, name: "Rysunek", link: "/C03" },
            { id: 182, name: "Pomieszczenie", link: "/NW1/P03" },
            { id: 183, name: "Zadane", link: "/NW1/P03/zadane" },
            { id: 125, name: "Wymuszenia",  link: "/NW1/P03/wymuszenia" },
            { id: 39, name: "Alarmy", link: "/AlarmyNW1/03" },
          ]
        },
        {
          id: 19,
          name: "P04",
          icon: "🏢",
          link: "/C04",
          showSubMenu: false,
          subMenuItems: [
            { id: 191, name: "Rysunek", link: "/C04" },
            { id: 192, name: "Pomieszczenie", link: "/NW1/P04" },
            { id: 193, name: "Zadane", link: "/NW1/P04/zadane" },
            { id: 129, name: "Wymuszenia",  link: "/NW1/P04/wymuszenia" },
            { id: 44, name: "Alarmy", link: "/AlarmyNW1/04" },
          ]
        },
        {
          id: 20,
          name: "P06",
          icon: "🏢",
          link: "/C06",
          showSubMenu: false,
          subMenuItems: [
            { id: 201, name: "Rysunek", link: "/C06" },
            { id: 202, name: "Pomieszczenie", link: "/NW1/P06" },
            { id: 203, name: "Zadane", link: "/NW1/P06/zadane" },
            { id: 127, name: "Wymuszenia",  link: "/NW1/P06/wymuszenia" },
            { id: 43, name: "Alarmy", link: "/AlarmyNW1/06" },
          ]
        },
        {
          id: 21,
          name: "P07",
          icon: "🏢",
          link: "/C07",
          showSubMenu: false,
          subMenuItems: [
            { id: 211, name: "Rysunek", link: "/C07" },
            { id: 212, name: "Pomieszczenie", link: "/NW1/P07" },
            { id: 213, name: "Zadane", link: "/NW1/P07/zadane" },
            { id: 131, name: "Wymuszenia",  link: "/NW1/P07/wymuszenia" },
            { id: 45, name: "Alarmy", link: "/AlarmyNW1/07" },
          ]
        },
        {
          id: 22,
          name: "P1_6",
          icon: "🏢",
          link: "/C1_6",
          showSubMenu: false,
          subMenuItems: [
            { id: 221, name: "Rysunek", link: "/C1_6" },
            { id: 222, name: "Wentylatornia", link: "/Wentylatornia" },
            { id: 222, name: "SAK1", link: "/SAK1" },
            
          ]
        },
        {
          id: 23,
          name: "CH1",
          icon: "🏢",
          link: "/CH1",
          showSubMenu: false,
          subMenuItems: [
            { id: 231, name: "Rysunek", link: "/CH1" },
            { id: 232, name: "Tabela", link: "/TabelkaCH1" },
            { id: 233, name: "Wymuszenia", link: "/WymuszeniaChiller" }
          ]
        },
        {
          id: 24,
          name: "CH2",
          icon: "🏢",
          link: "/CH2",
          showSubMenu: false,
          subMenuItems: [
            { id: 241, name: "Rysunek", link: "/CH2" },
            { id: 242, name: "Tabela", link: "/TabelkaCH2" }
          ]
        },
        {
          id: 25,
          name: "Alarmy",
          icon: "🚨",
          link: "/Alarmy",
          showSubMenu: false,
          subMenuItems: [
            { id: 251, name: "Tabela", link: "/Alarmy" },
           
          ]
        },
        {
          id: 26,
          name: "Grafana",
          icon: "📈",
          link: "http://192.168.1.155:3000",
          external: true,
          showSubMenu: false,
          subMenuItems: []
        },
        {
          id: 28,
          name: "UPS",
          icon: "🔋",
          link: "/UPS",
          showSubMenu: false,
          subMenuItems: [
            { id: 261, name: "UPS", link: "UPS" },
            { id: 262, name: "UPSWhutDown", link: "/UpsShutdown" },
            
          ]
        },
         {
          id: 30,
          name: "RaidStatus",
          icon: "💽",
          link: "/RaidStatus",
          showSubMenu: false,
          subMenuItems: [
            { id: 265, name: "RaidStatus", link: "/RaidStatus" },
            
            
          ]
        },
             {
          id: 27,
          name: "Users",
          icon: "👥",
          link: "/users",
          showSubMenu: false,
          subMenuItems: [
            { id: 271, name: "Tabela", link: "/users" },
            { id: 271, name: "HistoriaZmian", link: "/HistoriaZmian" }

          ]
        },
        {
          id: 999,
          name: "Pomoc PDF",
          icon: "ℹ️",
          link: "/BMS_help.pdf",
          external: true
        }
      ]
    };
  },

  mounted() {
    this.loadUser();
  },

  watch: {
    $route() {
      this.loadUser();
    }
  },

  methods: {
    loadUser() {
      try {
        const saved = localStorage.getItem("user");
        this.currentUser = saved ? JSON.parse(saved) : null;
      } catch (e) {
        this.currentUser = null;
      }
    },

    levelName(level) {
      const l = Number(level);

      if (l === 1) return "Użytkownik";
      if (l === 2) return "Operator";
      if (l === 3) return "Admin";

      return level;
    },

    toggleSubMenu(id, name) {
      this.menuItems.forEach(item => {
        if (item.id === id && item.name === name) {
          item.showSubMenu = !item.showSubMenu;
        } else {
          item.showSubMenu = false;
        }
      });
    },

    logout() {
      localStorage.removeItem("user");
      this.currentUser = null;
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: #464646;
  color: #fff;
  height: 100vh;
  padding: 20px;
  border-right: 1px solid #2a2d3a;
  display: flex;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
  overflow-y: auto;
}

.sidebar ul {
  background: #464646;
  padding-bottom: 20px;
}

.sidebar::-webkit-scrollbar {
  width: 8px;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 14px;
}

.user-box {
  background: #2f3033;
  border: 1px solid #666;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 16px;
  font-size: 13px;
  line-height: 1.5;
}

.user-box button {
  margin-top: 8px;
  width: 100%;
  padding: 7px;
  border: none;
  border-radius: 5px;
  background: #c0392b;
  color: white;
  cursor: pointer;
}

.user-box button:hover {
  background: #e74c3c;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 15px;
  border-radius: 6px;
  transition: background 0.3s;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #555;
}

.icon {
  margin-right: 10px;
  font-size: 18px;
}

.arrow {
  margin-left: auto;
  transition: transform 0.3s;
}

.arrow.open {
  transform: rotate(180deg);
}

.submenu {
  background: rgba(255, 255, 255, 0.05);
  margin: 5px 0;
  border-radius: 6px;
  padding: 5px 0;
}

.submenu-item {
  display: block;
  text-decoration: none;
  color: #d1d1d1;
  font-size: 14px;
  padding: 10px 20px;
  transition: background 0.3s;
}

.submenu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
