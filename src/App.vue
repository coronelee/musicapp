<script setup>
import NavComponent from "./components/NavComponent.vue";
import ItemsComponent from "./components/ItemsComponent.vue";
import MusicPlayerComponent from "./components/MusicPlayerComponent.vue";
import AlbumComponent from "./components/AlbumComponent.vue";
import { ref } from "vue";

const statePage = ref(0);
const stateAlbum = ref(0);

const editStatePage = (value) => {
  statePage.value = value;
  stateAlbum.value = 0;
};
const editStateAlbum = (value) => {
  stateAlbum.value = value;
  console.log(stateAlbum.value);
};
</script>
<template>
  <div class="w-screen h-screen">
    <div class="flex">
      <NavComponent :statePage="statePage" :editStatePage="editStatePage" />
      <ItemsComponent
        :editStateAlbum="editStateAlbum"
        :editIdAlbum="editIdAlbum"
        v-if="stateAlbum == 0"
      />
      <AlbumComponent v-else :stateAlbum="stateAlbum" />
    </div>
    <MusicPlayerComponent />
  </div>
</template>
