<template>
  <div class="login-page">
    <div class="login-box">
      <h2>Logowanie</h2>

      <input v-model="username" placeholder="Login" />
      <input v-model="password" type="password" placeholder="Hasło" />

      <button @click="login">Zaloguj</button>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",

  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },

  methods: {
    async login() {
      this.error = "";

      try {
        const res = await axios.post("http://192.168.1.155:1880/login", {
          username: this.username,
          password: this.password
        });

        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          this.$router.push("/");
        } else {
          this.error = "Błędny login lub hasło";
        }
      } catch (e) {
        this.error = "Błąd połączenia z Node-RED";
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #202225;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box {
  width: 320px;
  background: #3a3d42;
  padding: 25px;
  border-radius: 10px;
  color: white;
}

input {
  width: 100%;
  margin-bottom: 12px;
  padding: 8px;
}

button {
  width: 100%;
  padding: 8px;
  background: #2d8cff;
  color: white;
  border: none;
  border-radius: 6px;
}

.error {
  color: #ff6969;
}
</style>