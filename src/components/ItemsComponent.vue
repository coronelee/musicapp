<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const props = defineProps({
  editStateAlbum: Function,
  editNameAlbum: Function,
  editStatePage: Function,
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
    <div class="flex flex-col w-full h-full gap-12">
      <div class="overflow-x-hidden">
        <span class="text-white text-3xl font-exo">Albums</span>
        <div class="flex flex-wrap gap-4 mt-8 [&>div]:bg-[#1e1e1e]">
          <div
            v-for="albums in albums"
            :key="albums"
            @click="
              editStateAlbum(albums.id),
                editNameAlbum(albums.name),
                editStatePage('album')
            "
            class="text-white flex flex-col justify-center items-center font-exo cursor-pointer rounded-xl pb-4"
          >
            <img
              :src="albums.img"
              class="w-[175px] h-[175px] m-4 rounded-xl shadow-2xl"
            />
            <div
              class="flex flex-col text-center text-wrap justify-center items-center w-full text-xl w-[175px]"
            >
              <span class="text-white w-full">{{ albums.name }}</span>
              <span class="text-[#B3B3B3]">{{ albums.artist }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
