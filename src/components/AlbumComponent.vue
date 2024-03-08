<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
defineProps({
  stateAlbum: Number,
});
const album = ref([]);
onMounted(() => {
  axios.get("https://f97a390b40b51192.mokky.dev/music").then((response) => {
    if (respone.albums.id == stateAlbum) {
      album.value = response.data;
    }
  });
});
</script>

<template>
  <div
    class="bg-[#181818] w-5/6 h-full py-12 absolute right-0 top-0 overflow-y-scroll"
  >
    <!-- <audio controls>
      <source :src="music.src" type="audio/mpeg" />
    </audio> -->
  </div>
</template>
