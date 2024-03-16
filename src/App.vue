<script setup>
import NavComponent from "./components/NavComponent.vue";
import ItemsComponent from "./components/ItemsComponent.vue";
import MusicPlayerComponent from "./components/MusicPlayerComponent.vue";
import AlbumComponent from "./components/AlbumComponent.vue";
import SearchComponent from "./components/SearchComponent.vue";
import CreatePlaylistComponent from "./components/CreatePlaylistComponent.vue";
import PlaylistsComponent from "./components/PlaylistsComponent.vue";
import SignInComponent from "./components/SignInComponent.vue";
import PlaylistComponent from "./components/PlaylistComponent.vue";
import { ref } from "vue";

const statePage = ref(0);
const stateAlbum = ref(0);
const statePlayer = ref(0);
const nameAlbum = ref(0);
const loginUser = ref();
const playlistId = ref();
const playlistName = ref();
const auth = ref(false);
const playlistNum = ref();
let type = "";
const editPlaylistNum = (value) => {
  playlistNum.value = value;
};
const authed = (value) => {
  if (value == false) {
    loginUser.value = "";
  }
  auth.value = value;
};
const editStatePlayer = (value, typeC) => {
  type = typeC;
  statePlayer.value = value;
};
const editPlaylistName = (value) => {
  playlistName.value = value;
};
const editPlaylistId = (value) => {
  playlistId.value = value;
};
const editStatePage = (value) => {
  statePage.value = value;
};
const editStateAlbum = (value) => {
  stateAlbum.value = value;
};
const editNameAlbum = (value) => {
  nameAlbum.value = value;
};
const editLoginUser = (value) => {
  loginUser.value = value;
};
</script>
<template>
  <div id="app">
    <div class="flex">
      <NavComponent
        :statePage="statePage"
        :editStatePage="editStatePage"
        :loginUser="loginUser"
        :auth="auth"
      />
      <ItemsComponent
        :editStateAlbum="editStateAlbum"
        :editIdAlbum="editIdAlbum"
        :editNameAlbum="editNameAlbum"
        :editStatePage="editStatePage"
        :editStatePlayer="editStatePlayer"
        v-if="statePage == 0"
      />
      <AlbumComponent
        v-if="statePage == 'album'"
        :stateAlbum="stateAlbum"
        :editStatePlayer="editStatePlayer"
        :nameAlbum="nameAlbum"
      />
      <SearchComponent
        v-if="statePage == 1"
        :editStatePlayer="editStatePlayer"
      />
      <PlaylistsComponent
        v-if="statePage == 2"
        :auth="auth"
        :editStatePage="editStatePage"
        :loginUser="loginUser"
        :editPlaylistId="editPlaylistId"
        :editPlaylistName="editPlaylistName"
        :editPlaylistNum="editPlaylistNum"
      />
      <CreatePlaylistComponent
        v-if="statePage == 3"
        :auth="auth"
        :editStatePage="editStatePage"
        :loginUser="loginUser"
      />
      <SignInComponent
        v-if="statePage == 'signin'"
        :editLoginUser="editLoginUser"
        :authed="authed"
        :auth="auth"
        :editStatePage="editStatePage"
      />
      <PlaylistComponent
        v-if="statePage == 'playlist'"
        :playlistId="playlistId"
        :editStatePlayer="editStatePlayer"
        :playlistName="playlistName"
        :playlistNum="playlistNum"
        :editStatePage="editStatePage"
      />
    </div>

    <MusicPlayerComponent
      :statePlayer="statePlayer"
      :type="type"
      v-if="statePlayer != 0"
    />
  </div>
</template>
