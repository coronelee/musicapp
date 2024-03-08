<script setup>
defineProps({
  statePage: Number,
  editStatePage: Function,
});
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
</script>
<template>
  <div
    class="bg-black w-1/6 h-[calc(100vh-150px)] fixed top-0 left-0 flex flex-col gap-4 text-[#B3B3B3] [&>div>button>img]:w-6 [&div]:flex [&>div>button]:flex [&>div>button]:gap-4 [&>div>button]:py-2 [&>div>button]:px-4 font-exo"
  >
    <div class="w-full h-1/6 bg-slate-100/5">logo</div>
    <div>
      <button
        v-for="item in navigation"
        :key="item.name"
        :style="item.name == 'Create Playlist' ? 'margin-top: 50px' : ''"
        @click="editStatePage(item.id)"
      >
        <img :src="item.img" :alt="item.name" /><span
          :style="statePage == item.id ? 'color: white' : ''"
          >{{ item.name }}</span
        >
      </button>
    </div>
  </div>
</template>
