<script setup>
import { onMounted, ref } from "vue";

defineProps({
  statePage: Number,
  editStatePage: Function,
  loginUser: String,
  auth: Boolean,
});
const hideNav = ref(false);
const navigation = [
  {
    name: "Home",
    img: "/Home.svg",
    id: 0,
  },
  {
    name: "Search",
    img: "/search.svg",
    id: 1,
  },
  {
    name: "Your library",
    img: "/lib.svg",
    id: 2,
  },

  {
    name: "Create Playlist",
    img: "/plus.svg",
    id: 3,
  },
];

const reloadPage = () => {
  document.location.reload();
};
</script>
<template>
  <nav
    id="nav"
    class="bg-black z-10 overflow-x-hidden w-auto h-full fixed top-0 left-0 flex flex-col gap-4 text-[#B3B3B3] [&>div>button>img]:w-6 [&div]:flex [&>div>button]:flex [&>div>button]:gap-4 [&>div>button]:py-2 [&>div>button]:px-4 font-exo"
  >
    <div class="w-full h-1/6 flex justify-center items-center flex-col">
      <div class="flex gap-4">
        <img src="/logo.svg" alt="logo" class="w-14" /><img
          class="w-6 cursor-pointer"
          src="/refresh.svg"
          alt=""
          @click="reloadPage"
        />
      </div>
      <button class="hover:cursor-default">
        <img
          src="/sign.svg"
          class="w-8 hover:cursor-pointer"
          alt=""
          v-if="!auth"
          @click="editStatePage('signin')"
        />
        <img src="/profile.svg" class="w-8" alt="" v-else />
      </button>
      <button @click="editStatePage('signin')" class="underline decoration-2">
        {{ loginUser }}
      </button>
    </div>
    <div class="flex flex-col justify-center items-start">
      <button
        v-for="item in navigation"
        :key="item.name"
        :style="item.name == 'Create Playlist' ? 'margin-top: 50px' : ''"
        @click="editStatePage(item.id)"
        class="flex gap-4 py-2 px-4 cursor-pointer justify-center items-center"
      >
        <img
          :src="item.img"
          :alt="item.name"
          class="w-10"
          :style="statePage == item.id ? 'filter: brightness(150)' : ''"
        />
        <span
          class="max-[1090px]:hidden"
          :style="statePage == item.id ? 'color: white' : ''"
          >{{ item.name }}</span
        >
      </button>
      <a
        href="/downloadapp/setup.exe"
        download
        class="flex gap-4 py-2 px-4 cursor-pointer justify-center items-center"
        ><img src="/download.svg" alt="download" class="w-8" />
        <span class="max-[1090px]:hidden">Download</span></a
      >
    </div>
  </nav>
</template>
