<template>
  <div class="min-h-screen bg-[#FFFD8F] flex flex-col items-center px-4 sm:px-6 md:px-10 py-6 relative">
    <!-- Tombol Back di kiri (responsive) -->
    <button
      @click="goBack"
      class="absolute left-4 sm:left-6 top-4 sm:top-6 flex items-center gap-2 bg-white border border-[#4C763B] text-[#4C763B] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm hover:bg-[#E7F1E3] transition text-sm sm:text-base"
    >
      <span class="text-lg">←</span>
    </button>

    <!-- Header -->
    <div
      class="w-full max-w-6xl flex flex-wrap justify-between items-center mb-6 mt-16 sm:mt-20 gap-3"
    >
      <h1 class="font-bold text-lg sm:text-xl text-black">Good Movement</h1>
      <router-link to="/addnew"
        class="bg-[#4C763B] text-white px-4 sm:px-6 py-2 rounded-lg shadow hover:bg-[#3b5e2e] transition text-sm sm:text-base"
      >
        + Add New
      </router-link>
    </div>

    <!-- Card List -->
    <div class="w-full max-w-6xl space-y-5">
      <!-- Card 1: Draft -->
      <div
      class="bg-white rounded-xl p-4 sm:p-6 shadow border-2 border-black hover:shadow-md transition"
      >
      <router-link to="/detailmovement">
        <div class="flex justify-between items-start">
          <div>
            <p class="font-bold text-sm sm:text-base">No-Ref : GR/20251025/001</p>
            <p class="text-xs sm:text-sm text-gray-600">Requester : Mamad</p>
          </div>
          <div class="text-black cursor-pointer text-lg"><label>On Review</label></div>
        </div>
        <div class="mt-3 text-xs sm:text-sm text-gray-700">
          <p><span class="font-semibold">Tanggal :</span> 25 Okt 2025 10:05</p>
          <p><span class="font-semibold">Lokasi :</span> Main Warehouse to Warehouse A</p>
        </div>
    </router-link>
      </div>
      <!-- Card 2: Approved -->
      <div
        class="bg-[#72B657] rounded-xl p-4 sm:p-6 shadow border-2 border-[#4C763B] hover:shadow-md transition"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="font-bold text-sm sm:text-base text-white">No-Ref : GR/20251025/002</p>
            <p class="text-xs sm:text-sm text-white">Requester : Mamad</p>
          </div>
          <div class="text-white cursor-pointer text-lg"><label>Approved</label></div>
        </div>
        <div class="mt-3 text-xs sm:text-sm text-white">
          <p><span class="font-semibold text-white">Tanggal :</span> 25 Okt 2025 10:05</p>
          <p><span class="font-semibold text-white">Lokasi :</span> Main Warehouse to Warehouse A</p>
        </div>
      </div>

      <!-- Card 3: Rejected -->
      <div
        class="bg-[#F23A3A] rounded-xl p-4 sm:p-6 shadow border-2 border-[#9B0F0F] hover:shadow-md transition"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="font-bold text-white text-sm sm:text-base">
              No-Ref : GR/20251025/003
            </p>
            <p class="text-xs sm:text-sm text-white">Requester : Mamad</p>
          </div>
          <div class="text-white cursor-pointer text-lg"><label>Rejected</label></div>
        </div>
        <div class="mt-3 text-xs sm:text-sm text-white">
          <p><span class="font-semibold text-white">Tanggal :</span> 25 Okt 2025 10:05</p>
          <p><span class="font-semibold text-white">Lokasi :</span> Main Warehouse to Warehouse A</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #4c763b;
  border-radius: 10px;
}
</style>
