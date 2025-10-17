<template>
  <div class="min-h-screen bg-[#FFFCA9] flex flex-col items-center px-4 py-6 relative">
    <!-- Header -->
     <div class="flex justify-start w-full">
       <router-link to="/report" class="text-black text-xl hover:text-gray-700 transition" title="Back">
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
    <div class="w-full max-w-3xl flex flex-col sm:flex-row gap-20 mb-4">
      <select
        class="w-full sm:w-1/2 px-4 py-2 border border-black rounded-lg bg-white text-gray-700 focus:outline-none"
      >
        <option selected>Lokasi</option>
      </select>
      <select
        class="w-full sm:w-1/2 px-4 py-2 border border-black rounded-lg bg-white text-gray-700 focus:outline-none"
      >
        <option selected>-Batch-</option>
        <option selected>Batch 1</option>
        <option selected>Batch 2</option>
      </select>
    </div>

    <!-- Green Card -->
    <div class="w-full max-w-3xl bg-[#4D734D] p-6 rounded-2xl shadow-md space-y-4">
      <!-- Activity -->
      <select
        class="w-full px-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none"
      >
        <option selected>Activity</option>
      </select>

      <!-- CoA -->
      <input
        type="text"
        placeholder="CoA"
        class="min-w-xs px-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none"
      />

      <!-- Material -->
      <div class="flex flex-col sm:flex-row gap-4">
        <select
          type="text"
          placeholder="Material"
          class="flex-1 px-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none"
        >
        <option>-Material-</option>
          <option>Semen</option>
          <option>Pasir</option>
          <option>Besi</option>
        </select>
        
        <input
          type="number"
          placeholder="Qty"
          class="w-full sm:w-1/4 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
        />
      </div>

      <!-- Add Material -->
      <button
        @click="addMaterial"
        class="min-w-xs bg-white text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        + Tambah Material
      </button>

      <!-- Tenaga Kerja -->
      <div class="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Tenaga Kerja"
          class="flex-1 px-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Qty"
          class="w-full sm:w-1/4 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
        />
      </div>
    </div>

    <!-- Submit -->
    <div class="w-full max-w-3xl flex justify-center mt-8">
      <button
        @click="submitForm"
        class="w-full sm:w-1/2 bg-[#4D734D] hover:bg-[#3C5C3B] text-white font-semibold py-3 rounded-lg border border-[#3A5737] transition-all shadow-sm"
      >
        Submit
      </button>
    </div>

    <!-- Floating Add Button -->
    <button
      @click="addMaterial"
      class=" bg-[#B5D78D] hover:bg-[#A1C77D] text-black font-bold w-10 h-10 rounded-lg border border-[#4D734D] flex items-center justify-center text-xl shadow-md transition"
      title="Tambah Material"
    >
      +
    </button>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
</style>
