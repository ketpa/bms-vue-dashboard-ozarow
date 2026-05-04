<template>
  <div class="counter-panel">
    <h2>Vue 3 - Reactive State & Computed</h2>

    <section class="counter-section">
      <h3>Licznik</h3>
      <p>Wartość: <strong>{{ count }}</strong></p>
      <p class="info">Czy parzysty? {{ isEven ? 'Tak ✅' : 'Nie ❌' }}</p>
      <p class="info">Podwojona wartość: {{ doubled }}</p>
      <div class="buttons">
        <button @click="increment">+1</button>
        <button @click="decrement">-1</button>
        <button @click="reset">Reset</button>
      </div>
    </section>

    <section class="text-section">
      <h3>Filtry tekstowe</h3>
      <input v-model="message" placeholder="Wpisz coś..." />
      <p>Długość: {{ length }}</p>
      <p>Odwrotność: {{ reversed }}</p>
      <p>WIELKIE LITERY: {{ uppercased }}</p>
    </section>

    <section class="user-section">
      <h3>Dane użytkownika (reactive object)</h3>
      <p>Imię: {{ user.firstName }}</p>
      <p>Nazwisko: {{ user.lastName }}</p>
      <p>Pełne imię: {{ fullName }}</p>
      <p>Powitanie: {{ greeting }}</p>
      <button @click="changeUser">Zmień użytkownika</button>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// ---- Reactive state z ref ----
const count = ref(0)
const message = ref('')

// ---- Reactive state z reactive ----
const user = reactive({
  firstName: 'Jan',
  lastName: 'Kowalski',
})

// ---- Computed properties ----
const isEven = computed(() => count.value % 2 === 0)

const doubled = computed(() => count.value * 2)

const length = computed(() => message.value.length)

const reversed = computed(() => message.value.split('').reverse().join(''))

const uppercased = computed(() => message.value.toUpperCase())

const fullName = computed(() => `${user.firstName} ${user.lastName}`)

const greeting = computed(() => `Witaj, ${user.firstName}!`)

// ---- Metody ----
function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}

function changeUser() {
  const names = [
    { firstName: 'Anna', lastName: 'Nowak' },
    { firstName: 'Piotr', lastName: 'Wiśniewski' },
    { firstName: 'Maria', lastName: 'Zielińska' },
  ]
  const random = names[Math.floor(Math.random() * names.length)]
  user.firstName = random.firstName
  user.lastName = random.lastName
}
</script>

<style scoped>
.counter-panel {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem;
  font-family: sans-serif;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}

section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

section:last-child {
  border-bottom: none;
}

h2 {
  margin-bottom: 1rem;
  color: #42b883;
}

h3 {
  margin-bottom: 0.5rem;
}

.buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

button {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #42b883;
  color: #fff;
  font-size: 0.95rem;
}

button:hover {
  background: #369970;
}

input {
  padding: 0.4rem;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.info {
  color: #555;
  margin: 0.25rem 0;
}
</style>
