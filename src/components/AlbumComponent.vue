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
    class="bg-[#181818] w-5/6 pb-[200px] py-12 pr-2 flex flex-col px-8 gap-2 absolute right-0 top-0 text-white text-3xl font-exo max-[850px]:w-11/12"
  >
    <span class="max-[560px]:text-xl">{{ props.nameAlbum }}</span>
    <span
      v-for="music in album"
      :key="music"
      class="text-white max-[850px]:border-none border border-black text-3xl font-exo cursor-pointer flex rounded-xl overflow-hidden h-auto min-h-[70px] max-[1660px]:w-2/3 max-[1250px]:w-full w-1/2 items-center justify-between"
      @click="props.editStatePlayer(music.id)"
    >
      <img
        :src="music.img"
        class="w-[120px] h-[120px] max-[730px]:w-[80px] max-[730px]:h-[80px] max-[550px]:w-[50px] max-[550px]:h-[50px]"
      />
      <span
        class="text-left ml-4 w-full flex flex-col max-[730px]:text-xl max-[550px]:text-lg max-[470px]:text-sm"
        ><span class="text-white w-full">{{ music.name }}</span>
        <span
          class="text-[#B3B3B3] text-xl max-[730px]:text-sm max-[550px]:text-xs"
          >{{ music.artist }}</span
        >
      </span>
      <div class="h-full [&>img]:w-8 pr-4">
        <img
          src="/play.svg"
          alt=""
          class="max-[730px]:w-[80px] max-[730px]:h-[80px] max-[550px]:w-[50px] max-[550px]:h-[50px]"
        />
      </div>
    </span>
  </div>
</template>
