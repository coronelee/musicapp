<script setup>
import axios from "axios";

import { onMounted, ref } from "vue";
const props = defineProps({
  playlistId: String,
  editStatePlayer: Function,
  playlistName: Function,
});

const list = ref();
const musics = ref([]);
onMounted(() => {
  list.value = props.playlistId;

  let arr = list.value.split(",");

  for (let i = 0; i < arr.length; i++) {
    axios
      .get("https://f97a390b40b51192.mokky.dev/musics?id=" + arr[i])
      .then((response) => {
        musics.value.push(response.data);
      });
  }
});
</script>
<template>
  <div
    class="bg-[#181818] h-full w-4/5 gap-4 pl-8 absolute pt-8 right-0 top-0 text-white text-3xl flex flex-col justify-start items-center font-exo"
  >
    <span class="max-[560px]:text-xl">{{ playlistName }}</span>
    <span
      v-for="music in musics"
      :key="music"
      class="text-white max-[850px]:border-none w-3/5 border border-black text-3xl font-exo cursor-pointer flex rounded-xl overflow-hidden h-auto min-h-[70px] max-[1660px]:w-2/3 max-[1250px]:w-full items-center justify-between"
      @click="props.editStatePlayer(music[0].id)"
    >
      <img
        :src="music[0].img"
        class="w-[120px] h-[120px] max-[730px]:w-[80px] max-[730px]:h-[80px] max-[550px]:w-[50px] max-[550px]:h-[50px]"
      />
      <span
        class="text-left ml-4 w-full flex flex-col max-[730px]:text-xl max-[550px]:text-lg max-[470px]:text-sm"
        ><span class="text-white w-full">{{ music[0].name }}</span>
        <span
          class="text-[#B3B3B3] text-xl max-[730px]:text-sm max-[550px]:text-xs"
          >{{ music[0].artist }}</span
        >
      </span>
      <div class="h-full [&>img]:w-8 pr-4 flex justify-center items-center">
        <img
          src="/play.svg"
          alt=""
          class="max-[730px]:w-[80px] max-[730px]:h-[80px] max-[550px]:w-[50px] max-[550px]:h-[50px]"
        />
      </div>
    </span>
  </div>
</template>
