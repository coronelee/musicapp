<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
const login = ref();
const error = ref();
const props = defineProps({
  editLoginUser: Function,
  authed: Function,
  auth: Boolean,
  editStatePage: Function,
});
onMounted(() => {});
const event = ref("reg");
const createNewUser = () => {
  if (event.value == "reg") {
    axios
      .get(
        "https://f97a390b40b51192.mokky.dev/users?login=" +
          document.getElementById("login").value
      )
      .then((response) => {
        if (response.data.length > 0) {
          error.value = "There is a user with this login";
        } else {
          axios.post("https://f97a390b40b51192.mokky.dev/users", {
            login: document.getElementById("login").value,
            password: document.getElementById("password").value,
          });
          error.value = "";
          props.editLoginUser(document.getElementById("login").value);
          props.authed(true);
        }
      });
  } else if (event.value == "sign") {
    axios
      .get(
        "https://f97a390b40b51192.mokky.dev/users?login=" +
          document.getElementById("login").value +
          "&password=" +
          document.getElementById("password").value
      )
      .then((response) => {
        if (response.data.length == 0) {
          error.value = "Incorrect login or password";
        } else {
          props.editLoginUser(document.getElementById("login").value);
          props.authed(true);
          props.editStatePage(0);
        }
      });
  }
};
</script>
<template>
  <div
    class="bg-[#181818] h-full w-5/6 pb-[200px] gap-4 pl-8 pr-4 absolute right-0 top-0 text-white text-3xl flex justify-center items-center font-exo max-[850px]:w-11/12"
  >
    <div v-if="!props.auth" class="flex flex-col gap-4">
      <div class="flex justify-between px-4">
        <span
          class="max-[560px]:text-xl max-w-[500px]"
          :style="event == 'reg' ? 'color: white' : 'color: #B3B3B3'"
          @click="event = 'reg'"
          >Registration</span
        >
        <span
          class="max-[560px]:text-xl max-w-[500px]"
          :style="event == 'sign' ? 'color: white' : 'color: #B3B3B3'"
          @click="event = 'sign'"
          >Sign In</span
        >
      </div>

      <div
        class="flex flex-col justify-center items center w-full gap-2 text-xl [&>input]:bg-slate-700/10 [&>input]:max-w-[500px] [&>input:focus]:bg-slate-700/30 [&>input]:border-b [&>input]:outline-none [&>input]:px-4 [&>input]:py-2"
      >
        <input type="text" placeholder="login" id="login" /><input
          type="text"
          placeholder="password"
          id="password"
        />
        <button
          class="border py-2 hover:bg-slate-700/10 bg-slate-700/5 max-w-[500px]"
          @click="createNewUser()"
        >
          <span v-if="event == 'reg'"> Sign up</span>
          <span v-else> Sign in</span>
        </button>
        <span class="text-red-500 text-center">{{ error }}</span>
      </div>
    </div>
    <div v-else class="flex flex-col gap-8">
      <span class="max-[560px]:text-xl max-w-[500px]"
        >Log out of your account?</span
      >
      <button
        class="py-2 hover:bg-slate-700/10 bg-slate-700/5 max-w-[500px] max-[560px]:text-xl"
        @click="authed(false)"
      >
        Yeah
      </button>
    </div>
  </div>
</template>
