<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
const props = defineProps({
  stateAlbum: String,
  editStatePlayer: Function,
});
const album = ref([]);
onMounted(() => {
  if (props.stateAlbum != 0) {
    axios
      .get(
        "https://f97a390b40b51192.mokky.dev/musics?album=" + props.stateAlbum
      )
      .then((response) => {
        album.value = response.data;
      });
  }
});
</script>

<template>
  <div
    class="bg-[#181818] w-5/6 pb-[200px] py-12 flex flex-col px-8 gap-4 absolute right-0 top-0 overflow-y-scroll text-white text-3xl font-exo"
  >
    <span
      v-for="music in album"
      :key="music"
      class="text-white text-3xl font-exo cursor-pointer flex rounded-xl overflow-hidden h-[120px] w-1/2 bg-[#282828] items-center justify-between"
      @click="props.editStatePlayer(music.id)"
    >
      <span class="w-[120px] h-full bg-slate-100">{{ music.id }}</span>
      <br />
      <span class="ml-4 text-left w-[calc(100%-220px)]">{{ music.name }}</span>
      <div class="w-[100px] h-full [&>img]:w-8 flex gap-2">
        <img src="/play.svg" alt="" />
        <img src="/like.svg" alt="" />
      </div>
    </span>
  </div>
</template>
