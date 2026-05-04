<template>
  <div class="submenu-container">
    <h2>Submenu One</h2>
    <p>To jest zawartość Submenu One. Możesz tutaj dodać więcej treści.</p>
  </div>
</template>

<script>
export default {
  name: "SubmenuOne",
};
</script>

<style scoped>
/* Submenu zajmuje całą dostępną przestrzeń obok sidebaru */
.submenu-container {
  width: 100%;
  height: 100vh;
  background-color: #f4f4f4; /* Tło dopasowane do sidebaru */
  padding: 20px;
  box-sizing: border-box; /* Zapewnia poprawne obliczanie paddingu */
  overflow: auto; /* Zapewnia przewijanie, jeśli treść jest długa */
}
</style>
