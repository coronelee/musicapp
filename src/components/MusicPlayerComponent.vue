<script setup>
const props = defineProps({
  statePlayer: Number,
  type: String,
});

import axios from "axios";
import { ref, onMounted, watch } from "vue";
import analyze from "rgbaster";

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
const fullPlayer = ref(false);
const colorsGradient = ref([]);
const valueAlbum = ref(0);
const editMusic = (id) => {
  if (props.type == "single") {
    axios
      .get("https://f97a390b40b51192.mokky.dev/" + "singles" + "?id=" + id)
      .then((response) => {
        music.value = response.data[0];
      });
  } else {
    axios
      .get("https://f97a390b40b51192.mokky.dev/" + "musics" + "?id=" + id)
      .then((response) => {
        music.value = response.data[0];
      });
  }
};
const getColorImage = async (img) => {
  const colorIMG = await analyze(img);
  colorsGradient.value = [colorIMG[0].color, colorIMG[1].color];
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
    getColorImage(music.value.img);
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

    let minDur = String(Number(String(this.duration).split(".")[0]) / 60).split(
      "."
    )[0];
    let secDur = Number(String(this.duration).split(".")[0]) % 60;
    if (secDur < 10) {
      secDur = "0" + secDur;
      durationSong.value = minDur + ":" + secDur;
    } else durationSong.value = minDur + ":" + secDur;

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
  axios
    .get("https://f97a390b40b51192.mokky.dev/musics?album=" + music.value.album)
    .then((response) => {
      valueAlbum.value = response.data.length;
    });

  if (action > 0) {
    axios
      .get(
        "https://f97a390b40b51192.mokky.dev/musics?album=" + music.value.album
      )
      .then((response) => {
        if (music.value.id == response.data[response.data.length - 1].id) {
          axios
            .get(
              "https://f97a390b40b51192.mokky.dev/musics?album=" +
                music.value.album
            )
            .then((response) => {
              music.value = response.data[0];
            });
        } else {
          let nextId = music.value.id + 1;
          axios
            .get("https://f97a390b40b51192.mokky.dev/musics?id=" + nextId)
            .then((response) => {
              music.value = response.data[0];
            });
        }
      });
  } else if (action < 0) {
    axios
      .get(
        "https://f97a390b40b51192.mokky.dev/musics?album=" + music.value.album
      )
      .then((response) => {
        if (music.value.id == response.data[0].id) {
          axios
            .get(
              "https://f97a390b40b51192.mokky.dev/musics?album=" +
                music.value.album
            )
            .then((response) => {
              music.value = response.data[response.data.length - 1];
            });
        } else {
          let prevId = music.value.id - 1;
          axios
            .get("https://f97a390b40b51192.mokky.dev/musics?id=" + prevId)
            .then((response) => {
              music.value = response.data[0];
            });
        }
      });
  }
};
let fl = 0;
let oldTouch = 0;
const showFullPlayer = (event) => {
  if (window.screen.width > 850) {
    if (event == "pause" || event == "play") {
      pauseSong();
      fl = 1;
    }
  } else {
    if (event == "pause" || event == "play") {
      pauseSong();
      fl = 1;
    } else if (event == "hide") {
      fullPlayer.value = false;

      fl = 1;
    } else if (event == "showFull") {
      if (fullPlayer.value) {
      } else {
        if (fl == 0) {
          fullPlayer.value = !fullPlayer.value;
          document.getElementById("player").classList.remove("max-[850px]:m-2");
          document
            .getElementById("player")
            .classList.remove("max-[850px]:w-[calc(100%-20px)]");
          setTimeout(() => {
            document
              .getElementById("fullPlayer")
              .addEventListener("touchstart", touchstart);
            function touchstart(event) {
              oldTouch = event.changedTouches.item(0).clientY;
              document
                .getElementById("fullPlayer")
                .addEventListener("touchmove", touchend);
            }
          }, 150);
        }

        fl = 0;
      }
    }
  }
};

function touchend(event) {
  let difference = oldTouch - event.changedTouches.item(0).clientY;

  if (difference < -100) {
    fullPlayer.value = false;
    document.getElementById("player").classList.add("max-[850px]:m-2");
    document
      .getElementById("player")
      .classList.add("max-[850px]:w-[calc(100%-20px)]");
  }
}
</script>
<template>
  <div
    class="player max-[850px] overflow-hidden h-auto max-[850px]:rounded-xl max-[850px]:m-2 z-20 w-full max-[850px]:w-[calc(100%-20px)] h-[150px] fixed bottom-0 font-exo"
    id="player"
    @click="showFullPlayer('showFull')"
    :style="[
      fullPlayer ? 'border-radius: 0' : '',
      {
        backgroundImage:
          'linear-gradient(' +
          colorsGradient[0] +
          ', ' +
          colorsGradient[1] +
          ')',
      },
    ]"
  >
    <div
      class="w-full h-full max-[850px]:[&>div]:w-full [&>div]:w-1/3 justify-between max-[850px]:flex-row flex items-center gap-4 p-4"
      v-if="!fullPlayer"
    >
      <div
        class="flex h-full justify-between gap-4 max-[850px]:justify-start max-[850px]:h-[50px]"
        id="info"
      >
        <img
          :src="music.img"
          class="h-[80px] w-[80px] bg-slate-500 max-[850px]:h-[50px] max-[850px]:w-[50px] drop-shadow-2xl"
        />
        <div class="flex gap-2 w-[300px]">
          <div class="flex flex-col justify-center items-start w-full">
            <span class="text-white w-full">{{ music.name }}</span>
            <span class="text-[#B3B3B3]">{{ music.artist }}</span>
          </div>
        </div>
        <img
          src="/like.svg"
          alt="like"
          class="w-8 cursor-pointer max-[850px]:hidden"
        />
      </div>

      <div
        class="flex flex-col justify-center items-center gap-2"
        id="musicContainer"
      >
        <div
          class="flex w-full h-1/2 justify-center items-center [&>img]:w-8 [&>img]:cursor-pointer gap-4 z-50"
        >
          <img
            src="/prev.svg"
            alt=""
            @click="nextPrevMusic(-1)"
            class="max-[850px]:hidden"
          />
          <div
            class="[&>img]:w-8 [&>img]:cursor-pointer max-[850px]:absolute right-12 top-2/6 max-[550px]:right-6 max-[400px]:right-2"
            id="button"
          >
            <img
              src="/play.svg"
              alt="play"
              @click="showFullPlayer('play')"
              id="play"
              v-if="!playingSong"
            />
            <img
              src="/pause.svg"
              alt="pause"
              @click="showFullPlayer('pause')"
              id="pause"
              v-else
            />
          </div>

          <img
            src="/next.svg"
            alt=""
            @click="nextPrevMusic(+1)"
            class="max-[850px]:hidden"
          />
        </div>
        <div
          class="w-full h-1/2 flex flex-col text-white font-exo_italic justify-between items-center max-[850px]:absolute max-[850px]:bottom-[-30px] max-[850px]:left-0 max-[850px]:w-full"
        >
          <input
            class="w-full h-[10px] bg-transparent"
            type="range"
            :max="maxRange"
            defaultValue="0"
            id="timeline"
            @input="audio.currentTime = $event.target.value"
          />
          <div class="w-full flex justify-between max-[850px]:hidden">
            <span class="w-1/5">{{ currentTimeSong }}</span
            ><span class="w-1/5 text-right">{{ durationSong }}</span>
          </div>
        </div>
      </div>
      <div
        class="flex justify-end items-center px-8 gap-8 [&>img]:w-8 [&>img]:cursor-pointer max-[850px]:hidden max-[850px]:mt-[-20px]"
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
    <div
      v-else
      class="w-screen h-screen p-4 flex flex-col justify-between items-center overflow-hidden"
      id="fullPlayer"
      :style="{
        backgroundImage:
          'linear-gradient(' +
          colorsGradient[0] +
          ', ' +
          colorsGradient[1] +
          ')',
      }"
    >
      <div class="w-full flex">
        <img src=" " alt="" class="w-8" />
      </div>
      <img
        :src="music.img"
        alt=""
        class="w-full rounded-xl max-w-[300px] drop-shadow-2xl animate-[pulseImage_5s_ease-in-out_infinite]"
      />
      <div class="w-full flex flex-col gap-2">
        <div class="w-full flex justify-between">
          <div class="flex flex-col text-white font-exo">
            <span class="font-bold">{{ music.name }}</span
            ><span class="text-[#d9baaf]">{{ music.artist }}</span>
          </div>
          <img src="/like.svg" class="w-8" alt="" />
        </div>
        <div
          class="w-full flex flex-col text-white font-exo_italic justify-between items-center max-[850px]:w-full"
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
        <div
          class="flex w-full h-1/2 justify-center items-center [&>img]:w-8 [&>img]:cursor-pointer gap-4 z-50"
        >
          <img src="/prev.svg" alt="" @click="nextPrevMusic(-1)" />
          <div
            class="[&>img]:w-8 [&>img]:cursor-pointer right-12 top-2/6"
            id="button"
          >
            <img
              src="/play.svg"
              alt="play"
              @click="showFullPlayer($event.target.id)"
              id="play"
              v-if="!playingSong"
            />
            <img
              src="/pause.svg"
              alt="pause"
              @click="showFullPlayer($event.target.id)"
              id="pause"
              v-else
            />
          </div>

          <img src="/next.svg" alt="" @click="nextPrevMusic(+1)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
}
/* GOOGLE CHROME */
@media (max-width: 850px) {
  #volume > input[type="range"]::-webkit-slider-thumb {
    width: 1px;
  }
  #volume > input[type="range"]::-moz-range-thumb {
    width: 1px;
  }
}
#volume > input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 5px;
  width: 6px;
  background: rgb(255, 255, 255);
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
  height: 5px;
  width: 10px;
  background: rgb(255, 255, 255);
}
/* MOZILLA FIREFOX */
#volume > input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  border: none;
  height: 5px;
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
  height: 5px;
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
