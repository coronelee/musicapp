<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
const props = defineProps({
  auth: Boolean,
  editStatePage: Function,
  loginUser: String,
  editPlaylistId: Function,
  editPlaylistName: Function,
  editPlaylistNum: Function,
});
const playlists = ref();
const idMusics = ref("");
onMounted(() => {
  axios
    .get(
      "https://f97a390b40b51192.mokky.dev/playlistUsers?loginUser=" +
        props.loginUser
    )
    .then((response) => {
      playlists.value = response.data;
    });
});
</script>
<template>
  <div
    class="bg-[#181818] h-full w-4/5 pb-[200px] gap-4 pl-8 absolute right-0 top-0 text-white text-3xl flex justify-center items-center font-exo"
  >
    <span v-if="!auth"
      ><b
        class="underline decoration-2 cursor-pointer"
        @click="editStatePage('signin')"
        >login</b
      >
      to your account</span
    >
    <div v-else class="flex flex-col gap-4 w-full h-full pt-24">
      <span class="max-[560px]:text-xl">Your library</span>
      <div
        v-if="playlists == 0"
        class="border flex justify-center items-center w-[200px] h-[200px] text-white rounded-xl"
        @click="editStatePage(3)"
      >
        +
      </div>
      <div v-else class="flex flex-wrap gap-4">
        <div
          v-for="lists in playlists"
          :key="lists"
          class="w-[200px] h-[200px] flex justify-center items-center border rounded-xl bg-white/5"
          @click="
            editStatePage('playlist'),
              editPlaylistId(lists.idMusics),
              editPlaylistName(lists.namePlaylist),
              editPlaylistNum(lists.id)
          "
        >
          <div>{{ lists.namePlaylist }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
