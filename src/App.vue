<template>
  <div id="app">
    <MySidebar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import MySidebar from "./components/MySidebar.vue";

export default {
  name: "App",
  components: {
    MySidebar,
  },
};
</script>

<style>

/* Stylowanie całego layoutu */
#app {
  display: flex;
  height: 100vh;
  width: 100vw;
}

/* Sidebar zajmuje 250px */
.sidebar {
  width: 250px;
  flex-shrink: 0;
}

/* Główna zawartość zajmuje resztę miejsca */
.content {
  flex-grow: 1;
  height: 100vh;
  overflow-y: auto; /* Tylko pionowy pasek przewijania */
  overflow-x: hidden; /* Ukrycie poziomego paska przewijania */
}
</style>
