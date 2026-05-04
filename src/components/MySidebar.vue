<template>
  <nav class="sidebar">
    <div class="logo">📊 MyDashboard</div>
    <ul>
      <li v-for="item in menuItems" :key="item.id">
        <router-link 
          :to="item.link" 
          class="menu-item" 
          @click.prevent="toggleSubMenu(item.id)"
        >
          <span class="icon">{{ item.icon }}</span>
          <span class="text">{{ item.name }}</span>
          <span class="arrow" :class="{ open: item.showSubMenu }">▼</span>
        </router-link>

        <!-- Submenu -->
        <ul v-if="item.showSubMenu" class="submenu">
          <li v-for="subItem in item.subMenuItems" :key="subItem.id">
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
  name: 'MySidebar',
  data() {
    return {
      menuItems: [
        {
          id: 1,
          name: 'Home',
          icon: '🏠',
          link: '/'
        },
        {
          id: 2,
          name: 'CT',
          icon: '🔥',
          link: '/C0',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C0' },
            { id: 22, name: 'Tabela', link: '/C0' }
          ]
        },
                {
          id: 3,
          name: 'NW1',
          icon: '🌀',
          link: '/C1',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C1' },
            { id: 22, name: 'Tabela', link: '/PomiarNW1' },
            { id: 23, name: 'Wyjscia', link: '/WyjsciaNW1' },
            { id: 24, name: 'Zadane', link: '/ZadaneNW1' },
            { id: 25, name: 'Wymuszenia', link: '/WymuszeniaNW1' }
          ]
        },
                {
          id: 4,
          name: 'NW2',
          icon: '🌀',
          link: '/C2',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C2' },
            { id: 22, name: 'Tabela', link: '/PomiarNW2' },
            { id: 23, name: 'Wyjscia', link: '/WyjsciaNW2' },
            { id: 24, name: 'Zadane', link: '/ZadaneNW2' },
            { id: 25, name: 'Wymuszenia', link: '/WymuszeniaNW2' }
          ]
        },
                {
          id: 5,
          name: 'NW3',
          icon: '🌀',
          link: '/C3',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C3' },
            { id: 22, name: 'Tabela', link: '/C1' },
            { id: 23, name: 'Zadane', link: '/ZadaneNW3W4' },
            { id: 24, name: 'Wymuszenia', link: '/WymuszeniaNW3W4' }
          ]
        },
                {
          id: 6,
          name: 'W4',
          icon: '🌀',
          link: '/C4',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C4' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 7,
          name: 'P013',
          icon: '🏢',
          link: '/C13',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C13' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 8,
          name: 'P015',
          icon: '🏢',
          link: '/C15',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C15' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 9,
          name: 'P016',
          icon: '🏢',
          link: '/C16',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C16' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 10,
          name: 'P017',
          icon: '🏢',
          link: '/C17',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C17' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 11,
          name: 'P018',
          icon: '🏢',
          link: '/C18',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C18' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 12,
          name: 'P019',
          icon: '🏢',
          link: '/C19',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C19' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 13,
          name: 'P020',
          icon: '🏢',
          link: '/C20',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C20' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 14,
          name: 'P021',
          icon: '🏢',
          link: '/C21',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C21' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 15,
          name: 'P022a',
          icon: '🏢',
          link: '/C22a',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C22a' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 16,
          name: 'P023/2',
          icon: '🏢',
          link: '/C23',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C23' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 17,
          name: 'P024',
          icon: '🏢',
          link: '/C24',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C24' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 18,
          name: 'P03',
          icon: '🏢',
          link: '/C03',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C03' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 19,
          name: 'P04',
          icon: '🏢',
          link: '/C04',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C04' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 20,
          name: 'P06',
          icon: '🏢',
          link: '/C06',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C06' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 21,
          name: 'P07',
          icon: '🏢',
          link: '/C07',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C07' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 7,
          name: 'P1_6',
          icon: '🏢',
          link: '/C1_6',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/C1_6' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 7,
          name: 'CH1',
          icon: '🏢',
          link: 'CH1',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/CH1' },
            { id: 22, name: 'Tabela', link: '/C1' },
            { id: 24, name: 'Wymuszenia', link: '/WymuszeniaChiller' }
          ]
        },
                {
          id: 7,
          name: 'CH2',
          icon: '🏢',
          link: 'CH2',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/CH2' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 7,
          name: 'Alarmy',
          icon: '🚨',
          link: '/ct',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/ct/rysunek' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 7,
          name: 'Grafana',
          icon: '📈',
          link: '/ct',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/ct/rysunek' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        },
                {
          id: 7,
          name: 'Users',
          icon: '👥',
          link: '/ct',
          showSubMenu: false,
          subMenuItems: [
            { id: 21, name: 'Rysunek', link: '/ct/rysunek' },
            { id: 22, name: 'Tabela', link: '/C1' }
          ]
        }
      ]
    };
  },
  methods: {
    toggleSubMenu(id) {
      this.menuItems.forEach(item => {
        if (item.id === id) {
          item.showSubMenu = !item.showSubMenu;
        } else {
          item.showSubMenu = false;
        }
      });
    }
  }
};
</script>


<style scoped>
/* Sidebar - Grafana Style */
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
  overflow-y: auto; /* Dodane przewijanie */
}

/* Dodane, aby upewnić się, że tło obejmuje całe menu */
.sidebar ul {
  background: #464646;
  padding-bottom: 20px; /* Zapobiega ścinaniu elementów na dole */
}

/* Styl paska przewijania dla lepszego wyglądu */
.sidebar::-webkit-scrollbar {
  width: 8px;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

/* Logo */
.logo {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

/* Menu - Style */
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

/* Główne pozycje menu */
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
  background-color: #464646;
}

/* Ikony */
.icon {
  margin-right: 10px;
  font-size: 18px;
}

/* Strzałka submenu */
.arrow {
  margin-left: auto;
  transition: transform 0.3s;
}

.arrow.open {
  transform: rotate(180deg);
}

/* Submenu - Style */
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
