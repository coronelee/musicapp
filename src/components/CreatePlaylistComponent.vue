<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const searchedTracks = ref();
const props = defineProps({
  editStatePlayer: Function,
  loginUser: String,
});

const newPLaylist = ref([]);
const searchTracks = (name) => {
  axios
    .get("https://f97a390b40b51192.mokky.dev/musics?name=*" + name + "*")
    .then((response) => {
      if (response.data.length == 0) {
        axios
          .get(
            "https://f97a390b40b51192.mokky.dev/musics?artist=*" + name + "*"
          )
          .then((response) => {
            searchedTracks.value = response.data;
          });
      } else {
        searchedTracks.value = response.data;
      }
    });
};

const addMusic = (music) => {
  newPLaylist.value.push(music.id);

  console.log(String(newPLaylist.value));
};
const create = () => {
  axios.post("https://f97a390b40b51192.mokky.dev/playlistUsers", {
    loginUser: props.loginUser,
    namePlaylist: document.getElementById("namePL").value,
    idMusics: String(newPLaylist.value),
  });
};
</script>
<template>
  <div
    class="bg-[#181818] w-5/6 pb-[200px] py-12 flex flex-col px-8 gap-2 absolute right-0 top-0 text-white text-3xl font-exo"
  >
    <span class="max-[560px]:text-xl">Create playlist</span>

    <div class="flex w-full gap-4 flex-col">
      <input
        type="text"
        class="w-full h-12 bg-slate-700/10 border-b outline-none px-4 py-2"
        placeholder="name playlist"
        id="namePL"
      />
      <input
        type="text"
        class="w-full h-12 bg-slate-700/10 border-b outline-none px-4 py-2"
        placeholder="search"
        @input="searchTracks($event.target.value)"
      />
      <button @click="create()">create</button>
    </div>
    <span
      v-for="music in searchedTracks"
      :key="music"
      class="text-white max-[850px]:border-none border border-black text-3xl font-exo cursor-pointer flex rounded-xl overflow-hidden h-auto min-h-[70px] max-[1660px]:w-2/3 max-[1250px]:w-full w-1/2 items-center justify-between"
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
          src="/plus.svg"
          alt=""
          class="max-[730px]:w-[80px] max-[730px]:h-[80px] max-[550px]:w-[50px] max-[550px]:h-[50px]"
          @click="addMusic(music)"
        />
      </div>
    </span>
  </div>
</template>
