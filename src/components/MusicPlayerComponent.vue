<script setup>
const props = defineProps({
  statePlayer: Number,
});

import axios from "axios";
import { ref, onMounted, watch } from "vue";
const playingSong = ref(false);
const music = ref({
  id: "",
  img: "",
  album: "",
  artist: "",
  name: "",
  src: "",
});
const durationSong = ref();
const currentTimeSong = ref();
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
    });
};
let audio = new Audio();

onMounted(() => {
  editMusic(props.statePlayer);
  audio.src = music.value.src;
});
watch(
  () => props.statePlayer,
  (newValue) => {
    editMusic(newValue);
  }
);
watch(
  () => music.value.src,
  (newValue) => {
    audio.src = newValue;

    document.getElementById("player").classList.remove("hidden");

    // audio.play();

    audio.onloadedmetadata = function () {
      audio.addEventListener("play", function (e) {
        setInterval(() => {
          currentTimeSong.value = this.currentTime;
        }, 200);
      });
      durationSong.value = this.duration;
    };
  }
);

watch(
  () => props.statePlayer,
  (newValue) => {
    editMusic(newValue);
  }
);

const hidePlayer = () => {
  document.getElementById("player").classList.add("hidden");
};
const pauseSong = () => {
  if (audio.paused) {
    audio.play();
    playingSong.value = true;
  } else {
    audio.pause();
    playingSong.value = false;
  }
};
</script>

<template>
  <div
    class="bg-[#282828] w-full h-[150px] fixed bottom-0 flex font-exo justify-between [&>div]:w-1/3 gap-4 p-4"
    id="player"
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
    <div id="aud" class="hidden"></div>
    <div class="flex flex-col justify-center items-center" id="musicContainer">
      <div class="flex w-full h-1/2 justify-center items-center [&>img]:w-8">
        <img
          src="/play.svg"
          alt="play"
          @click="pauseSong()"
          v-if="playingSong"
        />
        <img src="/pause.svg" alt="play" @click="pauseSong()" v-else />
      </div>
      <div class="w-full h-1/2 flex text-white font-exo_italic">
        <span>{{ currentTimeSong }}</span>

        <input
          class="w-full"
          type="range"
          :max="durationSong"
          :value="currentTimeSong"
          defaultValue="0"
          id="timeline"
          @change="audio.currentTime = $event.target.value"
        />
        <span>{{ durationSong }}</span>
      </div>
    </div>
    <div class="flex justify-end items-center px-8">
      <img src="/hide.svg" alt="hide" class="w-8" @click="hidePlayer()" />
    </div>
  </div>
</template>

<style scoped></style>
