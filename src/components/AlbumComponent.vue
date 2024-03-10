<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
const props = defineProps({
  stateAlbum: String,
  editStatePlayer: Function,
  nameAlbum: String,
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
    class="bg-[#181818] w-5/6 pb-[200px] py-12 flex flex-col px-8 gap-4 absolute right-0 top-0 text-white text-3xl font-exo"
  >
    <span>{{ props.nameAlbum }}</span>
    <span
      v-for="music in album"
      :key="music"
      class="text-white text-3xl font-exo cursor-pointer flex rounded-xl overflow-hidden h-auto min-h-[70px] max-[1660px]:w-2/3 max-[1250px]:w-full w-1/2 bg-slate-700 items-center justify-between"
      @click="props.editStatePlayer(music.id)"
    >
      <img
        :src="music.img"
        class="w-[120px] h-[120px] max-[360px] max-[850px]:hidden"
      />
      <span class="text-left ml-4 w-full max-[630px]:text-xl">{{
        music.name
      }}</span>
      <div class="w-[100px] h-full [&>img]:w-8 flex gap-2">
        <img src="/play.svg" alt="" />
      </div>
    </span>
  </div>
</template>
