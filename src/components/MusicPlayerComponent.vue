<script setup>
const props = defineProps({
  statePlayer: Number,
});

import axios from "axios";
import { ref, onMounted, watch } from "vue";

const music = ref({
  id: "",
  img: "",
  album: "",
  artist: "",
  name: "",
  src: "",
});

const editMusic = (id) => {
  axios
    .get("https://f97a390b40b51192.mokky.dev/musics?id=" + props.statePlayer)
    .then((response) => {
      music.value.id = response.data[0].id;
      music.value.img = response.data[0].img;
      music.value.album = response.data[0].album;
      music.value.artist = response.data[0].artist;
      music.value.name = response.data[0].name;
      music.value.src = response.data[0].src;
      console.log(music.value);
    });
};
watch(
  () => props.statePlayer,
  (newValue) => {
    editMusic(newValue);
  }
);
watch(
  () => music.value.src,
  (newValue) => {
    document.getElementById("musicContainer").innerHTML =
      "<audio controls> <source src=" + newValue + "></audio>";
  }
);
</script>

<template>
  <div
    class="bg-[#282828] w-full h-[150px] fixed bottom-0 flex font-exo justify-between [&>div]:w-1/3 gap-4 p-4"
  >
    <div class="flex h-full justify-between">
      <div class="h-full w-[118px] bg-slate-500"></div>
      <div class="flex gap-2 px-6 h-full w-2/3">
        <div class="flex flex-col gap-2 px-6 justify-center w-full">
          <span class="text-white">{{ music.name }}</span>
          <span class="text-[#B3B3B3]">{{ music.artist }}</span>
        </div>
      </div>
      <img src="/like.svg" alt="like" class="w-8" />
    </div>
    <div id="musicContainer">
      <!-- {{ music.src }} -->
    </div>
    <div></div>
  </div>
</template>
