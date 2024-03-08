<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const props = defineProps({
  editStateAlbum: Function,
});
const albums = ref([]);
onMounted(() => {
  axios.get("https://f97a390b40b51192.mokky.dev/ablums").then((response) => {
    for (let i = 0; i < response.data.length; i++) {
      albums.value.push(response.data[i]);
    }
  });
});
</script>

<template>
  <div
    class="bg-[#181818] w-5/6 pb-[200px] py-12 flex flex-col px-8 gap-4 absolute right-0 top-0 text-white text-3xl font-exo"
  >
    <div class="flex flex-col w-full px-8 h-full gap-12">
      <div class="overflow-x-hidden">
        <span class="text-white text-3xl font-exo">Good afternoon</span>
        <div class="grid grid-cols-3 gap-4 mt-8 [&>div]:bg-[#282828]">
          <div
            v-for="albums in albums"
            :key="albums"
            @click="editStateAlbum(albums.id)"
            class="text-white text-2xl font-exo cursor-pointer flex rounded-xl h-[120px] overflow-hidden"
          >
            <div class="w-[120px] h-full bg-slate-100">img</div>
            <div class="flex justify-center items-center w-[calc(100%-120px)]">
              {{ albums.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-x-hidden">
        <span class="text-white text-3xl font-exo">Good afternoon</span>
        <div class="grid grid-cols-3 gap-4 mt-8 [&>div]:bg-[#282828]">
          <div
            v-for="albums in albums"
            :key="albums"
            @click="editStateAlbum(albums.id)"
            class="text-white text-2xl font-exo cursor-pointer flex rounded-xl h-[120px] overflow-hidden"
          >
            <div class="w-[120px] h-full bg-slate-100">img</div>
            <div class="flex justify-center items-center w-[calc(100%-120px)]">
              {{ albums.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-x-hidden">
        <span class="text-white text-3xl font-exo">Good afternoon</span>
        <div class="grid grid-cols-3 gap-4 mt-8 [&>div]:bg-[#282828]">
          <div
            v-for="albums in albums"
            :key="albums"
            @click="editStateAlbum(albums.id)"
            class="text-white text-2xl font-exo cursor-pointer flex rounded-xl h-[120px] overflow-hidden"
          >
            <div class="w-[120px] h-full bg-slate-100">img</div>
            <div class="flex justify-center items-center w-[calc(100%-120px)]">
              {{ albums.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
