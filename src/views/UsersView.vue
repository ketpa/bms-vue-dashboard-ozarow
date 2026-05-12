<template>
  <div class="page">
    <div class="menubottom">
      <div class="title">Panel Użytkowników</div>

      <div class="message error" v-if="error">{{ error }}</div>
      <div class="message success" v-if="success">{{ success }}</div>

      <div class="pagebody">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nazwa użytkownika</th>
              <th>Poziom</th>
              <th>Nowe hasło</th>
              <th>Akcje</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ levelName(user.level) }}</td>
              <td>
                <input v-model="passwords[user.id]" type="password" placeholder="Nowe hasło" />
              </td>
              <td>
                <button @click="changePassword(user.id)">Zmień hasło</button>
                <button class="danger" @click="removeUser(user.id)">Usuń</button>
              </td>
            </tr>

            <tr v-if="users.length === 0">
              <td colspan="5">Brak użytkowników</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="add-user-box">
        <h3>Dodaj nowego użytkownika</h3>

        <div class="add-user-form">
          <input v-model="newUser.username" placeholder="Nazwa użytkownika" />
          <input v-model="newUser.password" type="password" placeholder="Hasło" />

          <select v-model="newUser.level">
          
            <option value="1">Użytkownik</option>
            <option value="2">Operator</option>
            <option value="3">Admin</option>
          </select>

          <button @click="addUser">Dodaj użytkownika</button>
          <button @click="getUsers">Odśwież</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UsersView",

  data() {
    return {
      api: "http://192.168.1.155:1880",
      users: [],
      passwords: {},
      newUser: {
        username: "",
        password: "",
        level: "2"
      },
      error: "",
      success: ""
    };
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    clearMessages() {
      this.error = "";
      this.success = "";
    },

    levelName(level) {
      const l = Number(level);
      if (l === 1) return "Użytkownik";
      if (l === 2) return "Operator";
      if (l === 3) return "Admin";
      return level;
    },

    async getUsers() {
      this.clearMessages();

      try {
        const res = await axios.get(`${this.api}/users`);
        this.users = Array.isArray(res.data) ? res.data : [];
      } catch (e) {
        this.error = "Nie udało się pobrać użytkowników";
      }
    },

    async addUser() {
      this.clearMessages();

      const username = this.newUser.username.trim();
      const password = this.newUser.password.trim();
      const level = Number(this.newUser.level);

      if (!username || !password) {
        this.error = "Podaj nazwę użytkownika i hasło";
        return;
      }

      try {
        await axios.post(`${this.api}/users`, {
          username,
          password,
          level
        });

        this.success = "Dodano użytkownika";

        this.newUser = {
          username: "",
          password: "",
          level: "2"
        };

        await this.getUsers();
      } catch (e) {
        this.error =
          e.response?.data?.error ||
          "Nie udało się dodać użytkownika";
      }
    },

    async removeUser(userId) {
      this.clearMessages();

      if (!confirm("Na pewno usunąć tego użytkownika?")) return;

      try {
        await axios.delete(`${this.api}/users/${userId}`);
        this.success = "Usunięto użytkownika";
        await this.getUsers();
      } catch (e) {
        this.error = "Nie udało się usunąć użytkownika";
      }
    },

    async changePassword(userId) {
      this.clearMessages();

      const password = String(this.passwords[userId] || "").trim();

      if (!password) {
        this.error = "Wpisz nowe hasło dla użytkownika";
        return;
      }

      try {
        await axios.put(`${this.api}/users/${userId}/password`, {
          password
        });

        this.success = "Hasło zostało zmienione";
        this.passwords[userId] = "";

        await this.getUsers();
      } catch (e) {
        this.error = "Nie udało się zmienić hasła";
      }
    }
  }
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #202225;
  display: flex;
  flex-direction: column;
  color: white;
}

.menubottom {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.title {
  margin-top: 20px;
  font-size: 28px;
  color: white;
}

.message {
  margin-top: 20px;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: bold;
}

.error {
  background: #3a1f1f;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
}

.success {
  background: #1f3a28;
  color: #7dff9b;
  border: 1px solid #7dff9b;
}

.pagebody {
  width: 95%;
  border: solid 1px #888;
  border-radius: 6px;
  margin: 30px 0 20px 0;
  overflow: hidden;
  background: white;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.pagebody tr {
  background: #eee;
  color: #222;
}

.pagebody th,
.pagebody td {
  border: solid 1px #ddd;
  padding: 12px;
  text-align: left;
}

.pagebody th {
  background-color: #202225;
  color: white;
}

input,
select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #aaa;
}

button {
  padding: 8px 12px;
  margin: 2px;
  background: #2d8cff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  opacity: 0.85;
}

button.danger {
  background: #c0392b;
}

.add-user-box {
  width: 95%;
  background: #151719;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.add-user-box h3 {
  margin: 0 0 12px 0;
}

.add-user-form {
  display: flex;
  gap: 10px;
}

.add-user-form input,
.add-user-form select {
  flex: 1;
}

.add-user-form button {
  min-width: 140px;
}
</style>