<script setup>
import { onMounted, ref } from "vue";

defineProps({
  statePage: Number,
  editStatePage: Function,
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
  {
    name: "Liked Song",
    img: "/like.svg",
    id: 4,
  },
  {
    name: "Your Episodes",
    img: "/fav.svg",
    id: 5,
  },
];

// onMounted(() => {
//   if (window.innerWidth < 1090) {
//     hideNav.value = true;
//   }
// });
</script>
<template>
  <nav
    id="nav"
    class="bg-black z-10 overflow-x-hidden w-auto h-full fixed top-0 left-0 flex flex-col gap-4 text-[#B3B3B3] [&>div>button>img]:w-6 [&div]:flex [&>div>button]:flex [&>div>button]:gap-4 [&>div>button]:py-2 [&>div>button]:px-4 font-exo"
  >
    <div class="w-full h-1/6 bg-slate-100/5">logo</div>
    <div>
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
          :style="statePage == item.id ? 'brightness(150)' : ''"
        />
        <span
          class="max-[1090px]:hidden"
          :style="statePage == item.id ? 'color: white' : ''"
          >{{ item.name }}</span
        >
      </button>
    </div>
  </nav>
</template>
