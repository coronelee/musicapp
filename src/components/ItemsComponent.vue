<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
defineProps({
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
    class="bg-[#181818] w-5/6 h-auto py-12 absolute right-0 top-0 overflow-y-scroll"
  >
    <div class="flex flex-col px-8 h-full gap-12">
      <div>
        <span class="text-white text-3xl font-exo">Good afternoon</span>
        <div class="grid grid-cols-3 gap-4 mt-8 [&>div]:bg-[#282828] h-[400px]">
          <div
            v-for="albums in albums"
            :key="albums"
            @click="editStateAlbum(albums.id)"
          >
            <div class="w-2/5 h-full bg-slate-100">img</div>
            {{ albums.id }}
          </div>
        </div>
      </div>
      <div>
        <span class="text-white text-3xl font-exo">Episodes for you</span>
        <div class="grid grid-cols-3 gap-4 mt-8 [&>div]:bg-[#282828] h-[400px]">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div>
        <span class="text-white text-3xl font-exo">Good afternoon</span>
        <div class="grid grid-cols-3 gap-4 mt-8 [&>div]:bg-[#282828] h-[400px]">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
