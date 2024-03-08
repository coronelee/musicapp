<script setup>
const props = defineProps({
  statePlayer: Number,
});

import axios from "axios";
import { ref, onMounted, watch } from "vue";
const playingSong = ref(true);
const music = ref({
  id: "",
  img: "",
  album: "",
  artist: "",
  name: "",
  src: "",
});
const durationSong = ref();
const maxRange = ref(0);
const currentTimeSong = ref();
const stateMusic = ref(props.statePlayer);
const editMusic = (id) => {
  axios
    .get("https://f97a390b40b51192.mokky.dev/musics?id=" + id)
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
});
watch(
  () => props.statePlayer,
  (newValue) => {
    stateMusic.value = newValue;
  }
);
watch(
  () => stateMusic.value,
  (newValue) => {
    editMusic(newValue);
  }
);
watch(
  () => music.value.src,
  (newValue) => {
    editSrcAudio(newValue);
  }
);

const editSrcAudio = (newValue) => {
  audio.src = newValue;

  document.getElementById("player").classList.remove("hidden");

  audio.play();

  audio.onloadedmetadata = function () {
    setInterval(() => {
      let min = String(
        Number(String(this.currentTime).split(".")[0]) / 60
      ).split(".")[0];
      let sec = Number(String(this.currentTime).split(".")[0]) % 60;
      if (sec < 10) {
        sec = "0" + sec;
        currentTimeSong.value = min + ":" + sec;
      } else currentTimeSong.value = min + ":" + sec;

      document.getElementById("timeline").value = this.currentTime;
      if (this.currentTime == this.duration) {
        nextPrevMusic(+1);
      }
    }, 1000);
    durationSong.value =
      String(Number(String(this.duration).split(".")[0]) / 60).split(".")[0] +
      ":" +
      (Number(String(this.duration).split(".")[0]) % 60);
    maxRange.value = this.duration;
  };
};

watch(
  () => props.statePlayer,
  (newValue) => {
    editMusic(newValue);
    audio.play();
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
const nextPrevMusic = (action) => {
  if (stateMusic.value < 7 && action > 0) {
    editMusic((stateMusic.value += action));
  }
  // else editMusic(1);
  if (stateMusic.value != 1 && action < 0) {
    editMusic((stateMusic.value += action));
  }
  // else editMusic(7);
};
</script>

<template>
  <div
    class="bg-[#282828] z-20 w-full h-[150px] fixed bottom-0 flex font-exo justify-between items-center [&>div]:w-1/3 gap-4 p-4 animate-[openPlayer_0.5s_linear] max-[850px]:[&>div]:w-full max-[850px]:flex-col"
    id="player"
  >
    <div class="flex h-full justify-between max-[850px]:hidden">
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
    <div
      class="flex flex-col justify-center items-center gap-2"
      id="musicContainer"
    >
      <div
        class="flex w-full h-1/2 justify-center items-center [&>img]:w-8 [&>img]:cursor-pointer gap-4"
      >
        <img src="/prev.svg" alt="" @click="nextPrevMusic(-1)" />
        <img
          src="/play.svg"
          alt="play"
          @click="pauseSong()"
          v-if="!playingSong"
        />
        <img src="/pause.svg" alt="pause" @click="pauseSong()" v-else />
        <img src="/next.svg" alt="" @click="nextPrevMusic(+1)" />
      </div>
      <div
        class="w-full h-1/2 flex flex-col text-white font-exo_italic justify-between items-center"
      >
        <input
          class="w-full h-[10px] bg-transparent"
          type="range"
          :max="maxRange"
          defaultValue="0"
          id="timeline"
          @input="audio.currentTime = $event.target.value"
        />
        <div class="w-full flex justify-between">
          <span class="w-1/5">{{ currentTimeSong }}</span
          ><span class="w-1/5 text-right">{{ durationSong }}</span>
        </div>
      </div>
    </div>
    <div
      class="flex justify-end items-center px-8 gap-8 [&>img]:w-8 [&>img]:cursor-pointer max-[850px]:justify-center max-[850px]:mt-[-20px]"
    >
      <img
        src="/mute.svg"
        alt="mute"
        @click="audio.muted = !audio.muted"
        v-if="!audio.muted && audio.volume != 0"
      />
      <img
        src="/unmute.svg"
        alt="mute"
        @click="audio.muted = !audio.muted"
        v-else
      />
      <div id="volume">
        <input
          class="w-[100px] h-[10px] bg-transparent"
          type="range"
          @input="audio.volume = $event.target.value / 100"
        />
      </div>

      <img src="/hide.svg" alt="hide" @click="hidePlayer()" />
    </div>
  </div>
</template>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
}
/* GOOGLE CHROME */
#volume > input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 12px;
  width: 6px;
  background: rgb(255, 255, 255);
  margin-top: -3px;
}
#volume > input[type="range"]::-webkit-slider-runnable-track {
  height: 50%;
  background: #585858;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 50%;
  background: #c5c5c5;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 16px;
  width: 10px;
  background: rgb(255, 255, 255);
  margin-top: -4px;
}
/* MOZILLA FIREFOX */
#volume > input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  border: none;
  height: 12px;
  width: 6px;
  background: rgb(255, 255, 255);
  margin-top: -3px;
}
#volume > input[type="range"]::-moz-range-track {
  height: 50%;
  background: #585858;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  border: none;
  border-radius: 1px;
  height: 16px;
  width: 10px;
  background: rgb(255, 255, 255);
  margin-top: -4px;
}

input[type="range"]::-moz-range-track {
  height: 50%;
  background: #c5c5c5;
}

/* IE */

input[type="range"]::-ms-thumb {
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
</style>
