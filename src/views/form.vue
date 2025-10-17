<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// State reaktif untuk menampung semua bagian form (kartu hijau)
// Dimulai dengan satu bagian form secara default
const formSections = ref([
  {
    id: Date.now(), // ID unik untuk key pada v-for
    activity: '',
    coa: '',
    materials: [{ materialName: '', qty: '' }], // Setiap bagian punya daftar material sendiri
    workers: [{ workerName: '', qty: '' }], // Setiap bagian punya daftar tenaga kerja sendiri
  },
])

// Fungsi untuk menambah bagian form baru (kartu hijau baru)
function addFormSection() {
  formSections.value.push({
    id: Date.now(),
    activity: '',
    coa: '',
    materials: [{ materialName: '', qty: '' }],
    workers: [{ workerName: '', qty: '' }],
  })
}

// Fungsi untuk menghapus bagian form berdasarkan index
function removeFormSection(index) {
  formSections.value.splice(index, 1)
}

// Fungsi untuk menambah baris tenaga kerja
function addWorkerRow(sectionIndex) {
  formSections.value[sectionIndex].workers.push({ workerName: '', qty: '' })
}

// Fungsi untuk menghapus baris tenaga kerja
function removeWorkerRow(sectionIndex, workerIndex) {
  formSections.value[sectionIndex].workers.splice(workerIndex, 1)
}

// Fungsi untuk submit seluruh form
function submitForm() {
  // Anda bisa melihat semua data di console
  console.log('Data Form:', JSON.parse(JSON.stringify(formSections.value)))
  // Di sini Anda bisa mengirim data ke server
}
</script>

<template>
  <div class="min-h-screen bg-[#FFFCA9] flex flex-col items-center px-4 py-6 relative">
    <!-- Header -->
    <div class="flex justify-start w-full">
      <router-link
        to="/report"
        class="text-black text-xl hover:text-gray-700 transition"
        title="Back"
      >
        <i class="fa-solid fa-arrow-left"></i>
      </router-link>
    </div>
    <div class="w-full max-w-3xl mb-6">
      <h1 class="text-3xl sm:text-4xl font-bold text-center text-black">Form</h1>
    </div>

    <!-- Date Picker -->
    <div class="w-full max-w-3xl mb-4">
      <div class="flex items-center gap-3 bg-white border border-black rounded-lg px-3 py-2 w-fit">
        <i class="fa-solid fa-calendar text-lg"></i>
        <span class="font-medium">17/10/2025</span>
      </div>
    </div>

    <!-- Lokasi & Batch -->
    <div class="w-full max-w-3xl flex flex-col sm:flex-row gap-4 mb-4">
      <select
        class="w-full sm:w-1/2 px-4 py-2 border border-black rounded-lg bg-white text-gray-700 focus:outline-none"
      >
        <option selected>Lokasi</option>
      </select>
      <select
        class="w-44 sm:w-1/2 px-4 py-2 border border-black rounded-lg bg-white text-gray-700 focus:outline-none"
      >
        <option>-Batch-</option>
        <option>Batch 1</option>
        <option>Batch 2</option>
      </select>
    </div>

    <!-- Container untuk semua Green Cards -->
    <div class="w-full max-w-3xl space-y-4">
      <!-- Loop melalui setiap bagian form menggunakan v-for -->
      <div
        v-for="(section, index) in formSections"
        :key="section.id"
        class="w-full bg-[#4D734D] p-6 rounded-2xl shadow-md space-y-4 relative"
      >
        <!-- Tombol Hapus Bagian -->
        <button
          @click="removeFormSection(index)"
          v-if="formSections.length > 1"
          class="absolute top-3 right-3 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-600 transition"
          title="Hapus Bagian Ini"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>

        <!-- Activity -->
        <select
          v-model="section.activity"
          class="w-full px-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none"
        >
          <option value="" disabled>Pilih Activity</option>
          <option>Pekerjaan A</option>
          <option>Pekerjaan B</option>
        </select>

        <!-- CoA -->
        <input
          v-model="section.coa"
          type="text"
          placeholder="CoA"
          class="w-44 sm:min-w-xs px-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none"
        />

        <!-- Material Section -->
        <div class="space-y-2">
          <!-- Loop untuk setiap baris material -->
          <div
            v-for="(material, matIndex) in section.materials"
            :key="matIndex"
            class="flex flex-col sm:flex-row gap-4 items-center"
          >
            <select
              v-model="material.materialName"
              class="flex-1 w-full px-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none"
            >
              <option value="" disabled>-Pilih Material-</option>
              <option>Semen</option>
              <option>Pasir</option>
              <option>Besi</option>
            </select>
            <input
              v-model="material.qty"
              type="number"
              placeholder="Qty"
              class="w-full sm:w-1/4 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        <!-- Tombol Tambah Bagian Baru -->
        <button
          @click="addFormSection"
          class="w-44 sm:min-w-xs bg-[#A1C77D] text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          + Tambah Material
        </button>

        <!-- Tenaga Kerja Section -->
        <div class="space-y-2">
          <!-- Loop untuk setiap baris tenaga kerja -->
          <div
            v-for="(worker, workerIndex) in section.workers"
            :key="workerIndex"
            class="flex flex-col sm:flex-row gap-4 items-center"
          >
            <input
              type="text"
              v-model="worker.workerName"
              placeholder="Tenaga Kerja"
              class="flex-1 w-full px-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none"
            />
            <input
              type="number"
              v-model="worker.qty"
              placeholder="Qty"
              class="w-full sm:w-1/4 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
            <button
              @click="removeWorkerRow(index, workerIndex)"
              v-if="section.workers.length > 1"
              class="text-white hover:text-red-300 transition"
              title="Hapus Tenaga Kerja"
            >
              <i class="fa-solid fa-circle-minus text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div class="w-full max-w-3xl sm:mt-10 mt-20 flex justify-center">
      <button
        @click="submitForm"
        class="w-full sm:w-1/2 bg-[#4D734D] hover:bg-[#3C5C3B] text-white font-semibold py-3 rounded-lg border border-[#3A5737] transition-all shadow-sm"
      >
        Submit
      </button>
    </div>

    <button
      @click="addFormSection"
      class="fixed bottom-26 right-6 sm:bottom-20 sm:right-64 bg-[#B5D78D] hover:bg-[#A1C77D] text-black font-bold w-10 h-10 rounded-lg border border-[#4D734D] flex items-center justify-center text-2xl shadow-lg transition"
      title="Tambah Bagian Form"
    >
      +
    </button>
  </div>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>
