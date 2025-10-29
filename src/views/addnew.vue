<template>
  <div class="min-h-screen bg-[#FFFD8F] flex flex-col items-center p-6 relative">
    <!-- Tombol Kembali di pojok kanan atas -->
    <button
      @click="goBack"
      class="absolute left-6 top-6 bg-white border-1 border-black px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition shadow-sm"
    >
      <span class="text-lg">←</span>
    </button>

    <!-- Header -->
    <div class="w-full max-w-4xl text-left mb-6 mt-16">
      <h1 class="font-bold text-xl sm:text-2xl text-black text-center">Good Movement</h1>
    </div>

    <!-- Card Form -->
    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <h2 class="font-semibold text-xl mb-6 text-black">Request Barang</h2>
      <input type="date" disabled v-model="selectedDate" />
      <!-- Pilih Gudang -->
      <div class="mb-8">
        <label class="block font-medium text-black mb-2">Pilih Gudang</label>
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <select
            class="w-full sm:w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4C763B] focus:outline-none"
          >
            <option>Gudang A</option>
            <option>Gudang B</option>
            <option>Gudang C</option>
          </select>
          <span class="text-2xl text-black hidden sm:block">→</span>
          <select
            class="w-full sm:w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4C763B] focus:outline-none"
          >
            <option>Gudang A</option>
            <option>Gudang B</option>
            <option>Gudang C</option>
          </select>
        </div>
      </div>

      <!-- Add Material -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <label class="font-medium text-gray-700 text-base">Add Material</label>
          <button
            @click="showModal = true"
            class="bg-[#E8F5E9] text-black rounded-full p-2 hover:bg-[#DDEEDC] transition text-lg"
          >
            +
          </button>
        </div>

        <!-- List Material -->
        <div v-for="(item, index) in materials" :key="index" class="mb-4">
          <div
            class="bg-[#F7F9FC] border border-gray-200 rounded-xl p-5 flex items-center justify-between shadow-sm"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold"
                :style="{ backgroundColor: item.color }"
              >
                {{ item.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="font-semibold text-black text-base">
                  {{ item.name }}
                </p>
                <div class="flex items-center gap-1">
                  <input
                    v-model="item.amount"
                    type="number"
                    placeholder="0"
                    class="w-28 border-b border-gray-300 focus:outline-none focus:border-[#4C763B] text-black text-sm"
                  />
                  <span class="text-sm text-black">Kg</span>
                </div>
              </div>
            </div>

            <!-- Delete Material -->
            <button
              @click="removeMaterial(index)"
              class="text-red-500 hover:text-red-700 transition text-xl"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      <!-- Submit -->
      <div class="mt-8">
        <button
          @click="submitForm"
          class="w-full bg-[#4C763B] hover:bg-[#3b5e2e] text-white font-semibold py-3 rounded-lg transition text-base"
        >
          Submit
        </button>
      </div>
    </div>

    <!-- Modal Pilih Barang -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative mx-4">
        <button
          @click="showModal = false"
          class="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h3 class="font-bold text-lg mb-4 text-center">Pilih Barang</h3>

        <!-- Search bar -->
        <div class="relative mb-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari barang..."
            class="w-full border rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#4C763B]"
          />
          <span class="absolute left-3 top-2.5 text-gray-400 text-lg material-icons"> 🔍 </span>
        </div>

        <!-- List Barang -->
        <div class="max-h-80 overflow-y-auto border border-gray-200 rounded-xl p-3 space-y-3">
          <div
            v-for="(item, index) in filteredItems"
            :key="index"
            @click="selectItem(item)"
            class="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold"
                :style="{ backgroundColor: item.color }"
              >
                {{ item.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="font-semibold">{{ item.name }}</p>
                <p class="text-sm text-gray-600">Available Stock : {{ item.stock }} kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const selectedDate = ref('')

// Fungsi untuk format tanggal ke YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Saat halaman pertama kali dimuat, isi otomatis tanggal hari ini
onMounted(() => {
  selectedDate.value = formatDate(new Date())
})

const showModal = ref(false)
const searchQuery = ref('')

// Data warehouse
const fromWarehouse = ref('')
const toWarehouse = ref('')

// List material yang ada di form
const materials = ref([
  { name: 'Semen', amount: '', color: '#CDB4DB' },
  { name: 'Pupuk', amount: '', color: '#BDE0FE' },
])

// Data stok material (popup)
const availableItems = ref([
  { name: 'Semen', stock: 1000, color: '#CDB4DB' },
  { name: 'Pupuk', stock: 500, color: '#BDE0FE' },
  { name: 'Pasir', stock: 2000, color: '#FFC8DD' },
  { name: 'Batu Bata', stock: 750, color: '#A2D2FF' },
])

// Filter barang berdasarkan pencarian
const filteredItems = computed(() => {
  return availableItems.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// Ketika memilih barang dari modal
const selectItem = (item) => {
  materials.value.push({
    name: item.name,
    amount: '',
    color: item.color,
  })
  showModal.value = false
}

// Hapus material
const removeMaterial = (index) => {
  materials.value.splice(index, 1)
}

// Submit form
const submitForm = () => {
  alert('Form Submitted!')
}

// Kembali
const goBack = () => {
  window.history.back()
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #4c763b;
  border-radius: 10px;
}
</style>
