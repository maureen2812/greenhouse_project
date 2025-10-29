<template>
  <div class="min-h-screen bg-[#FFF9A9] flex flex-col items-center p-6 relative">
    <!-- Tombol Kembali -->
    <button
      @click="goBack"
      class="absolute left-6 top-6 border-2 border-black px-4 py-2 rounded-lg bg-white transition"
    >
      ←
    </button>

    <!-- Card Form -->
    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 mt-16">
      <h1 class="text-2xl font-bold text-[#2C4A3F] mb-6 text-center">Good Movement</h1>

      <h2 class="font-semibold text-lg mb-6">Request Barang</h2>
      <input type="date" disabled v-model="selectedDate" />
      <!-- Pilih Gudang -->
      <div class="mb-8">
        <label class="block font-medium text-gray-700 mb-2">Pilih Gudang</label>
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <input
            v-model="fromWarehouse"
            type="text"
            placeholder="From"
            class="w-full sm:w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4C763B] focus:outline-none"
          />
          <span class="text-2xl text-gray-600 hidden sm:block">→</span>
          <input
            v-model="toWarehouse"
            type="text"
            placeholder="To"
            class="w-full sm:w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4C763B] focus:outline-none"
          />
        </div>
      </div>

      <!-- Add Material -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <label class="font-medium text-gray-700 text-base">Material</label>
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
                <p class="font-semibold text-gray-800 text-base">{{ item.name }}</p>
                <div class="flex items-center gap-1">
                  <input
                    v-model="item.amount"
                    type="number"
                    placeholder="0"
                    class="w-28 border-b border-gray-300 focus:outline-none focus:border-[#4C763B] text-gray-600 text-sm"
                  />
                  <span class="text-sm text-gray-500">Kg</span>
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

      <!-- Tombol Action -->
      <div class="flex justify-center gap-4 mt-10">
        <button
          @click="submitForm('Rejected')"
          class="w-40 bg-[#F23A3A] border-3 border-[#9B0F0F] hover:bg-[#9B0F0F] text-white py-2 rounded-lg transition font-medium"
        >
          Rejected
        </button>
        <button
          @click="submitForm('Approved')"
          class="w-40 bg-[#72B657] border-3 border-[#4C763B] hover:bg-[#4C763B] text-white py-2 rounded-lg transition font-medium"
        >
          Approved
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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


const fromWarehouse = ref('')
const toWarehouse = ref('')
const materials = ref([
  { name: 'Semen', amount: 0, color: '#CDB4DB' },
  { name: 'Pupuk', amount: 0, color: '#BDE0FE' },
])

// Fungsi menambah item material baru
const addMaterial = () => {
  materials.value.push({
    name: 'Material Baru',
    amount: 0,
    color: '#C8E6C9',
  })
}

// Hapus material
const removeMaterial = (index) => {
  materials.value.splice(index, 1)
}

// Fungsi untuk menyimpan dan arahkan ke detail
const submitForm = (status) => {
  const newMovement = {
    from: fromWarehouse.value,
    to: toWarehouse.value,
    materials: materials.value,
    date: new Date().toLocaleString('id-ID'),
    status: status, // nilai Approved / Rejected
  }

  store.addMovement(newMovement)
  router.push(`/detail/${store.movements.length}`) // redirect ke detail
}

// Kembali ke halaman sebelumnya
const goBack = () => router.back()
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
