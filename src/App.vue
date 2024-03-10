<script setup>
import NavComponent from "./components/NavComponent.vue";
import ItemsComponent from "./components/ItemsComponent.vue";
import MusicPlayerComponent from "./components/MusicPlayerComponent.vue";
import AlbumComponent from "./components/AlbumComponent.vue";
import { ref } from "vue";

const statePage = ref(0);
const stateAlbum = ref(0);
const statePlayer = ref(0);
const nameAlbum = ref(0);
const editStatePlayer = (value) => {
  statePlayer.value = value;
};
const editStatePage = (value) => {
  statePage.value = value;
  stateAlbum.value = 0;
};
const editStateAlbum = (value) => {
  stateAlbum.value = value;
};
const editNameAlbum = (value) => {
  nameAlbum.value = value;
};
</script>
<template>
  <div class="">
    <div class="flex">
      <NavComponent :statePage="statePage" :editStatePage="editStatePage" />
      <ItemsComponent
        :editStateAlbum="editStateAlbum"
        :editIdAlbum="editIdAlbum"
        :editNameAlbum="editNameAlbum"
        v-if="stateAlbum == 0"
      />
      <AlbumComponent
        v-else
        :stateAlbum="stateAlbum"
        :editStatePlayer="editStatePlayer"
        :nameAlbum="nameAlbum"
      />
    </div>
    <MusicPlayerComponent :statePlayer="statePlayer" v-if="statePlayer != 0" />
  </div>
</template>
